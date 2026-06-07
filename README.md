# Alemu Sisay Nigru — Personal Portfolio

Academic portfolio site (React + Node.js) with blog, publications, AI assistant, and admin CMS.

## What is deployed (source of truth)

| Layer | Path | Hosting |
|-------|------|---------|
| **Frontend** | `client/` | GitHub Pages → [alexsisay.github.io/alemu-portfolio](https://alexsisay.github.io/alemu-portfolio/) |
| **Backend** | `alemu-portfolio-backend/` (git submodule) | Render |

**Legacy folders (`src/`, `server/` at repo root) are not deployed.** Edit `client/` and `alemu-portfolio-backend/` only to avoid drift.

## Local development

```bash
# Frontend
cd client && npm install && npm start

# Backend (separate terminal)
cd alemu-portfolio-backend && npm install && npm run dev
```

Frontend proxies API calls to `http://localhost:5000` in development.

## Environment variables

**Frontend** (`client/.env.local`):

```env
REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Backend** (`alemu-portfolio-backend/.env`):

```env
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=...
AI_PROVIDER=gemini
GEMINI_API_KEY=...
CORS_ORIGIN=https://alexsisay.github.io
```

GitHub Actions uses repository variable `REACT_APP_GA_MEASUREMENT_ID` at build time.

## CMS site profile

Editable from Dashboard → Profile tab. Data is stored in MongoDB via `/api/site-profile`.

Seed or refresh defaults (e.g. after graduation copy updates):

```bash
cd alemu-portfolio-backend
MONGODB_URI="..." npm run seed:profile
```

## SEO build step

Production build runs `client/scripts/generate-seo.js` after CRA build to:

- Regenerate `sitemap.xml` (static routes + blog posts from API)
- Write crawler-friendly HTML shells under `build/blog/:id/`

## Deploy

- **Frontend:** push to `main` → GitHub Actions (`.github/workflows/deploy.yml`)
- **Backend:** push `alemu-portfolio-backend` submodule → Render auto-deploy

After backend deploy, run `npm run seed:profile` on Render (or locally) if MongoDB still has stale profile text.

## API overview

See `alemu-portfolio-backend/README.md` for full endpoint list (`/api/profile`, `/api/blog`, `/api/site-profile`, `/api/ai-chat`, etc.).
