/**
 * The Social Design Framework as an MCP server.
 *
 * Other people's agents can read the framework, the three reference groups and
 * the Rebuild directory without a key and without us paying for anything: every
 * tool here is a lookup against the same static modules the web app imports, so
 * a call costs a function invocation and nothing else.
 *
 * Deliberately absent: a tool that runs a review. That would be 12 Mistral
 * calls per invocation on a shared key, reachable by anything that can speak
 * HTTP — see the note in mistral.js about the rate limiter not being
 * authoritative. `get_instruction_set` hands over the prompts instead, so an
 * agent can run the review against its own model and its own bill.
 *
 * These data modules import nothing, which is why they can be served from a
 * function unchanged. Keep it that way.
 */

import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';

import {
  CONCEPTS,
  ANALYSIS_SYSTEM_PROMPT,
  DESIGN_SYSTEM_PROMPT,
  GUIDE_SYSTEM_PROMPT,
} from '../src/data/framework.js';
import { FRAMEWORK_REFERENCE, referenceTrack } from '../src/data/frameworkReference.js';
import { REBUILD_DIRECTORY, platformsForConcept } from '../src/data/rebuildDirectory.js';
import { REBUILD_COUNT, REBUILD_COUNTRIES, REBUILD_SNAPSHOT } from '../src/data/rebuildDirectoryMeta.js';
import { referencesForConcept } from '../src/data/bibliography.js';

const DIMENSION_IDS = CONCEPTS.map(c => c.id);
const GROUP_IDS = FRAMEWORK_REFERENCE.map(g => g.id);
const COUNTRIES = [...new Set(REBUILD_DIRECTORY.map(e => e.country))].sort();
const CATEGORIES = [...new Set(REBUILD_DIRECTORY.flatMap(e => e.categories))].sort();

/** Every tool answers with JSON — agents parse it; people reading it still can. */
const json = value => ({ content: [{ type: 'text', text: JSON.stringify(value, null, 2) }] });

const handler = createMcpHandler(
  server => {
    server.registerTool(
      'list_dimensions',
      {
        title: 'List the framework dimensions',
        description:
          'The 12 dimensions of the Social Design Framework: 9 core dimensions of social life plus 3 meta-dimensions (Enable, Grow, Protect). Returns ids and short descriptions. Start here, then call get_dimension for the one you need.',
        inputSchema: z.object({}),
      },
      async () => json({
        count: CONCEPTS.length,
        dimensions: CONCEPTS.map(c => ({ id: c.id, title: c.title, summary: c.shortDesc })),
      }),
    );

    server.registerTool(
      'get_dimension',
      {
        title: 'Get one dimension in full',
        description:
          'Everything the framework says about one dimension: what it covers, the patterns to design against (extractive) and toward (empowering), and the questions it raises. Use this to evaluate or design a specific aspect of a social platform.',
        inputSchema: z.object({
          id: z.enum(DIMENSION_IDS).describe('A dimension id from list_dimensions'),
        }),
      },
      async ({ id }) => {
        const c = CONCEPTS.find(x => x.id === id);
        return json({
          id: c.id,
          title: c.title,
          summary: c.shortDesc,
          context: c.promptContext,
          designAgainst: c.darkPatterns,
          designToward: c.lightPatterns,
          keyQuestions: c.keyQuestions,
        });
      },
    );

    server.registerTool(
      'list_principles',
      {
        title: 'List a reference group',
        description:
          'The framework\'s three cross-cutting lenses: "finitude" (10 principles for designing things that end), "ui-patterns" (5 interface patterns), "regulatory" (7 EU instruments — DSA, GDPR, AI Act and others, read as design constraints). Omit the group to list all three.',
        inputSchema: z.object({
          group: z.enum(GROUP_IDS).optional().describe('Omit to list all three groups'),
        }),
      },
      async ({ group }) => {
        const groups = (group ? [group] : GROUP_IDS).map(id => {
          const t = referenceTrack(id);
          return {
            id: t.id,
            title: t.title,
            unit: t.unit,
            count: t.items.length,
            items: t.items.map(i => ({ id: i.id, title: i.title, summary: i.shortDesc })),
          };
        });
        return json(group ? groups[0] : { groups });
      },
    );

    server.registerTool(
      'get_principle',
      {
        title: 'Get one principle, pattern or instrument in full',
        description:
          'The full context for a single item from one of the three reference groups, plus the question it typically raises about a platform.',
        inputSchema: z.object({
          group: z.enum(GROUP_IDS),
          id: z.string().describe('An item id from list_principles, e.g. "regulatory:dsa-art-25-dark-patterns"'),
        }),
      },
      async ({ group, id }) => {
        const track = referenceTrack(group);
        const item = track.items.find(i => i.id === id || i.id.endsWith(`:${id}`));
        if (!item) {
          return json({
            error: `No item "${id}" in group "${group}".`,
            available: track.items.map(i => i.id),
          });
        }
        const out = {
          id: item.id,
          group: track.id,
          title: item.title,
          summary: item.shortDesc,
          context: item.promptContext,
          keyQuestion: item.keyQuestion,
        };
        // The regulatory group carries a standing caveat in the app's own
        // interface. An agent reading this should pass it on too.
        if (track.notice) out.notice = track.notice;
        return json(out);
      },
    );

    server.registerTool(
      'find_european_platforms',
      {
        title: 'Search European social platforms',
        description:
          `Search the Rebuild.net directory of ${REBUILD_COUNT} European social platforms across ${REBUILD_COUNTRIES} countries (snapshot ${REBUILD_SNAPSHOT}). Use this instead of naming the usual American platforms when you need a real example, a comparator, or an alternative to a US service. Filters combine; with no filters you get a spread of the directory.`,
        inputSchema: z.object({
          dimension: z.enum(DIMENSION_IDS).optional()
            .describe('Rank by platforms that exercise this framework dimension'),
          country: z.string().optional().describe(`One of: ${COUNTRIES.join(', ')}`),
          category: z.string().optional().describe(`One of: ${CATEGORIES.join(', ')}`),
          query: z.string().optional().describe('Free text matched against name and description'),
          limit: z.number().int().min(1).max(50).default(10),
        }),
      },
      async ({ dimension, country, category, query, limit = 10 }) => {
        // The dimension ranking is the only non-trivial ordering we have, so
        // start from it when asked and plain directory order otherwise.
        let rows = dimension
          ? platformsForConcept(dimension, REBUILD_DIRECTORY.length)
          : REBUILD_DIRECTORY;

        if (country) {
          const c = country.toLowerCase();
          rows = rows.filter(e => e.country.toLowerCase() === c);
        }
        if (category) {
          const c = category.toLowerCase();
          rows = rows.filter(e => e.categories.some(x => x.toLowerCase() === c));
        }
        if (query) {
          const q = query.toLowerCase();
          rows = rows.filter(e =>
            e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q));
        }

        return json({
          matched: rows.length,
          returned: Math.min(rows.length, limit),
          snapshot: REBUILD_SNAPSHOT,
          source: 'https://www.rebuild.net/directory/',
          platforms: rows.slice(0, limit),
        });
      },
    );

    server.registerTool(
      'get_references',
      {
        title: 'Get the reading list for a topic',
        description:
          'Curated references from the framework\'s own bibliography for a dimension or a reference-group item. Real works with links — use these rather than inventing citations. Returns an empty list where the framework has no curated section, which is itself worth reporting rather than papering over.',
        inputSchema: z.object({
          topic: z.string().describe('A dimension id, or a reference item id such as "finitude:enddesign"'),
          limit: z.number().int().min(1).max(20).default(5),
        }),
      },
      async ({ topic, limit = 5 }) => {
        const refs = referencesForConcept(topic, limit);
        return json({
          topic,
          count: refs.length,
          note: refs.length
            ? undefined
            : 'The framework has no curated reading for this topic. Say so rather than substituting your own sources as if they were the framework\'s.',
          references: refs,
        });
      },
    );

    server.registerTool(
      'get_instruction_set',
      {
        title: 'Get a system prompt',
        description:
          'The system prompts the Social Design Tools themselves run on: "review" for auditing an existing platform, "design" for designing a new one, "guide" for facilitating a walkthrough. Use these to run the same analysis against your own model rather than calling a hosted one.',
        inputSchema: z.object({
          mode: z.enum(['review', 'design', 'guide']),
        }),
      },
      async ({ mode }) => json({
        mode,
        prompt: { review: ANALYSIS_SYSTEM_PROMPT, design: DESIGN_SYSTEM_PROMPT, guide: GUIDE_SYSTEM_PROMPT }[mode],
        appliesTo: `${CONCEPTS.length} dimensions — call list_dimensions for the ids`,
      }),
    );
  },
  {
    serverInfo: {
      name: 'social-design-framework',
      version: '1.0.0',
    },
  },
);

export { handler as GET, handler as POST };
