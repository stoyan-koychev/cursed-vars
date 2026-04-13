# cursed-vars

> Because naming variables is the hardest problem in computer science. This API does it for you — badly.

A zero-dependency API deployed on Cloudflare Workers that returns a random funny/cursed variable name on every request.

## Usage

```bash
curl https://cursedvars.com/
```

**Response:**

```json
{
  "name": "thisWorksButIDontKnowWhy",
  "category": "temporary"
}
```

That's it. One endpoint. One random variable name. No auth, no database, no regrets.

### Categories

Your variable name will come from one of these cursed categories:

| Category             | Vibe                                           |
| -------------------- | ---------------------------------------------- |
| `temporary`          | "I'll fix it later" names that never get fixed |
| `emotional`          | Feelings expressed through code                |
| `passive_aggressive` | Blame and resentment in camelCase              |
| `honest`             | Uncomfortable truths about the codebase        |
| `3am`                | Written while sleep-deprived                   |
| `enterprise`         | Java-flavored corporate naming trauma          |
| `unhinged`           | Names that raise questions during code review  |
| `overconfident`      | Names that aged poorly                         |
| `intern`             | First week on the job energy                   |

## Self-Hosting

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- A [Cloudflare](https://cloudflare.com) account (for deployment)

### Local Development

```bash
git clone https://github.com/stoyan-koychev/cursed-vars.git
cd cursed-vars
npm install
npx wrangler dev
```

The API will be running at `http://localhost:8787`.

### Deploy to Production

```bash
npx wrangler login
npx wrangler deploy
```

Done. Your API is live on Cloudflare's edge network.

## Project Structure

```
cursed-vars/
├── src/
│   └── index.js          # Worker entry point
├── data/
│   ├── 3am.json
│   ├── emotional.json
│   ├── enterprise.json
│   ├── honest.json
│   ├── intern.json
│   ├── overconfident.json
│   ├── passive_aggressive.json
│   ├── temporary.json
│   └── unhinged.json
├── wrangler.jsonc         # Cloudflare Workers config
├── package.json
├── LICENSE
└── README.md
```

## Contributing

Want to add more cursed variable names? Great.

1. Fork this repo
2. Add your entry to the relevant file in `data/` (e.g. `data/emotional.json`):
   ```json
   "yourCursedName"
   ```
3. Open a PR

Please keep entries funny, SFW, and categorized correctly.

## License

[MIT](LICENSE)
