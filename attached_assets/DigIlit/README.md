# Diglit Monorepo

This monorepo contains the Diglit web app, shared packages, backend, and a Python API client/CLI.

- apps/web: Next.js app
- backend/supabase: Edge functions and migrations
- packages/*: Shared libraries (ui, env, tailwind-config, types, utils)
- python: Python package `diglit-api` (client + CLI)

## Commands

- pnpm dev — run all apps in dev
- pnpm build — build all packages and apps
- pnpm lint — lint all workspaces
- pnpm typecheck — run TypeScript across workspaces
- pnpm test — run unit tests

## Python API

```bash
cd python
python -m venv .venv && source .venv/bin/activate
pip install -e .[dev]
ruff check . && pytest -q
```
