# Mem-D Site

The marketing and product site for **Mem-D** — governance for long-term AI memory.

Mem-D detects memory debt, produces recommendations, simulation, and workflow plans, and builds safer governed context for agents. This repository contains only the website. The Mem-D engine and CLI live in their own repository: [github.com/2Cloud-S/mem-d](https://github.com/2Cloud-S/mem-d).

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [lucide-react](https://lucide.dev) for icons
- TypeScript

## Getting started

```bash
npm install
npm run dev
```

The site runs at [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                |
| --------------- | -------------------------- |
| `npm run dev`   | Start the local dev server |
| `npm run build` | Create a production build  |
| `npm run start` | Serve the production build |
| `npm run lint`  | Run ESLint                 |

## Project structure

```
app/                 App Router entry (layout, page, global styles)
components/          Page sections and UI primitives
  ui/                Reusable primitives (pill, copy button, counters, headings)
lib/                 Shared helpers and demo scenario data
```

The homepage is composed in `app/page.tsx` from focused section components, leading with an interactive demo of raw vs. governed agent memory.

## Deployment

The site deploys to [Vercel](https://vercel.com). Pushes to the connected branch trigger a deployment automatically.

## License

MIT — see [LICENSE](LICENSE).
