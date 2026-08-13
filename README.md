# Interview App

A small movie browsing app used for frontend interview practice: a "random
movie" page and a movie search page, both backed by a self-hosted API instead
of a third-party one (so it works regardless of firewall rules).

The frontend is deliberately left unpolished — both pages call `fetch` with a
hardcoded absolute URL, duplicated, with no debounce on search and no shared
data-fetching hook or API client. That's intentional starter code: candidates
are expected to notice the duplication and the un-debounced network-per-
keystroke search, then refactor/fix it themselves.

## Structure

- `client/` — React + Vite + TypeScript frontend.
- `server/` — Fastify + TypeScript backend. Serves a bundled, deterministic
  synthetic movie dataset (not real movie data) over a small REST API, and
  deliberately simulates network latency and occasional errors on the data
  endpoints so the frontend has real debounce/error-handling exercises to
  work through. CORS is open (`origin: true`) since the client calls it
  cross-origin with full absolute URLs rather than through a dev proxy.

`client/` and `server/` are independent npm packages, not npm workspaces.

## Setup

First-time setup installs three separate dependency trees:

```
npm install
npm --prefix client install
npm --prefix server install
```

## Development

```
npm run dev
```

Runs both the Vite dev server (`http://localhost:5173`) and the Fastify API
(`http://localhost:3001`) together. The frontend calls the backend directly at
`http://localhost:3001` — if you change the backend's port, update the
hardcoded URLs in `client/src/pages/*.tsx` too.

To run them separately: `npm run dev:web` and `npm run dev:api`.

## Backend simulation settings

The backend's artificial latency/error injection is configurable via env vars
(see `server/src/config.ts` for defaults): `SIM_ENABLED`, `SIM_LATENCY_MIN_MS`,
`SIM_LATENCY_MAX_MS`, `SIM_LATENCY_OUTLIER_CHANCE`, `SIM_LATENCY_OUTLIER_MIN_MS`,
`SIM_LATENCY_OUTLIER_MAX_MS`, `SIM_ERROR_RATE`. Set `SIM_ENABLED=false` to get
fast, always-successful responses.

## Build

```
npm run build
```

Builds `client/` (Vite) and `server/` (`tsc`) in sequence.
