# ProBooks

Next.js prototype for **ProBooks** — workflow software for small Canadian CPA firms. Frontend only, in-memory sample data, two clickable happy paths.

## Run

```
npm install
npm run dev
```

Open http://localhost:3000.

## Happy paths

**Accountant** — `/login` → MFA → inbox → workspace → resolve a flag → approve period → done

**Client** — `/p/<token>` → service picker → bookkeeping → respond to a flag → upload → tax intake → done

## Design system

Four palettes are wired to `data-palette="A|B|C|D"` on `<html>`. Default is **D · Sage Neutral**. Toggle live with the swatch switcher in the top-right of any page (persisted via `localStorage`).

- **A** — Editorial Cream + deep forest
- **B** — Bone + Oxblood
- **C** — Ink + Electric indigo
- **D** — Sage Neutral *(default)*
