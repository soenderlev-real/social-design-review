# Social Design Review

AI-powered tool for auditing and designing social platforms using the [Social Design Framework](https://rebuild.net) — built for the Rebuild.net European social platforms sprint.

**Live:** https://social-design-review.vercel.app

---

## What it does

Two modes:

### Review Mode
Enter a social platform URL and an LLM API key. The tool analyses the platform across **13 dimensions** of the Social Design Framework and produces:
- A **score (1–5)** per dimension — from Harmful to Exemplary
- **Strengths**, **dark patterns detected**, and **recommendations**
- A **European perspective** on each dimension
- A **radar chart** overview of the full framework
- An **AI chat panel** to dig deeper into the results

### Design Workshop Mode
Describe a platform idea (or upload concept docs, pitch decks, wireframes). The tool maps your concept across the same 13 dimensions and returns:
- **Design considerations** — open questions to resolve before coding
- **Suggestions** — concrete patterns to implement
- **Watch out for** — anti-patterns and risks to avoid
- **European perspective** — alignment with participation, commons, and democratic values

### Agent .md Export (both modes)
Export results as a coding agent instruction file ready to drop into:
- **Claude Code** → save as `CLAUDE.md`
- **Cursor** → save as `.cursorrules`
- **Windsurf** → save as `.windsurfrules`
- **Lovable** → paste into Knowledge → Project Instructions

The file contains a Core Constitution, Default States table, per-dimension ALWAYS/NEVER directives, and a Hard Refusals list — not just prose, but binary instructions an agent can act on.

---

## The 13 Framework Dimensions

| # | Dimension | Category |
|---|-----------|----------|
| 1 | Social Object | Core |
| 2 | Platform Intent | Enable |
| 3 | Identity | Enable |
| 4 | Conversations | Enable |
| 5 | Sharing | Enable |
| 6 | Presence | Enable |
| 7 | Relationships | Grow |
| 8 | Reputation | Grow |
| 9 | Groups | Grow |
| 10 | Agency | Protect |
| 11 | Enable | Protect |
| 12 | Grow | Protect |
| 13 | Protect | Protect |

---

## Quick start

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build
```

---

## Supported LLM providers

### Cloud (bring your own API key)
| Provider | Notes |
|----------|-------|
| **Anthropic** | Claude — best for nuance and reasoning |
| **OpenAI** | GPT-4o — widely trusted, very capable |
| **Google** | Gemini 2.5 Pro — strong multimodal reasoning |
| **Mistral** | European provider, fast |
| **Groq** | Ultra-fast inference, excellent value |
| **Together.ai** | Open-source models, flexible |
| **LLMBase** | EU-hosted, GDPR-compliant — 40+ models incl. GPT, Claude, Gemini |

### Local & private
| Provider | Notes |
|----------|-------|
| **Ollama** | Free, fully local, no API costs. Download from [ollama.ai](https://ollama.ai) |

**API keys never leave your browser.** The tool calls your chosen provider directly via `fetch()` — no backend, no key storage, no proxying.

---

## File uploads

Both modes support uploading context files:
- **Images** — screenshots, wireframes, mood boards (sent to vision-capable models)
- **PDFs** — concept docs, pitch decks, policies (text extracted in-browser via pdfjs-dist)

Everything is processed client-side. Files are never uploaded to any server.

---

## Using Ollama (fully local, free)

1. Install Ollama from [ollama.ai](https://ollama.ai)
2. Pull a model:
   ```bash
   ollama pull mistral      # recommended
   ollama pull llama3
   ```
3. Select **Ollama (Local)** in the app, enter `http://localhost:11434`, pick your model
4. Analysis runs entirely on your machine

---

## Tech stack

- React 18 + Vite
- Tailwind CSS (Space Mono, custom Rebuild.net palette)
- Lucide React icons
- Multi-provider LLM abstraction (`src/providers/`)
- Client-side PDF parsing via `pdfjs-dist`
- No backend — pure browser app

---

## Customising

| What | Where |
|------|-------|
| Framework dimensions & prompts | `src/data/framework.js` |
| Analysis system prompt | `src/data/framework.js` → `ANALYSIS_SYSTEM_PROMPT` |
| Design workshop prompt | `src/data/framework.js` → `DESIGN_SYSTEM_PROMPT` |
| Add a new LLM provider | `src/providers/` — extend `BaseProvider` |
| Styling & colours | `tailwind.config.js` |

---

## Deploying your own instance

The app is a static Vite build — deploy anywhere that serves static files.

**Vercel (recommended):**
```bash
npx vercel --prod
```

**Other platforms:** run `npm run build` and serve the `dist/` folder.

---

## MCP server (for other agents)

The framework is also exposed over the [Model Context Protocol](https://modelcontextprotocol.io),
so other people's agents can read it directly:

```
https://socialdesignframework.eu/api/mcp
```

Streamable HTTP, no key, no authentication. Point any MCP client at it:

```json
{
  "mcpServers": {
    "social-design-framework": {
      "url": "https://socialdesignframework.eu/api/mcp"
    }
  }
}
```

Seven tools, all plain lookups against the same static data this app uses:

| Tool | What it gives you |
| --- | --- |
| `list_dimensions` | the 12 dimensions, with summaries |
| `get_dimension` | one dimension in full, with its dark and light patterns |
| `list_principles` | the finitude, UI-pattern and regulatory groups |
| `get_principle` | one principle, pattern or EU instrument in full |
| `find_european_platforms` | search the Rebuild directory by dimension, country, category or text |
| `get_references` | the framework's own reading list for a topic |
| `get_instruction_set` | the review, design and walkthrough system prompts |

There is deliberately no tool that runs a review. That would be twelve model
calls per invocation on a shared key, reachable by anything that can speak
HTTP. `get_instruction_set` hands over the prompts instead, so an agent runs
the analysis on its own model and its own bill.

A project-scoped [`.mcp.json`](.mcp.json) is committed at the repo root, so
anyone who clones this and opens it in Claude Code or Cursor gets the server
without configuring anything. Claude Code asks you to approve a project-scoped
server the first time.

Claude Desktop is the exception: it only reads stdio servers from
`claude_desktop_config.json`, so add this one under Settings → Connectors → Add
custom connector instead. Note that Claude Desktop reaches custom connectors
from Anthropic's cloud rather than from your machine, which is fine here but
will not work for anything on localhost.

The server lives in [`api/mcp.js`](api/mcp.js) as a single Vercel function. The
data modules it imports have no dependencies of their own, which is what lets
them be served unchanged — worth preserving if you edit them.

## License

Built for the Rebuild.net sprint. Open for adaptation by participating teams.
