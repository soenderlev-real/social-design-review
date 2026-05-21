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
| **Mistral** | European provider, fast |
| **Groq** | Ultra-fast inference, excellent value |
| **Together.ai** | Open-source models, flexible |

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

## License

Built for the Rebuild.net sprint. Open for adaptation by participating teams.
