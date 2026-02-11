# Static Site Hello World

This repository is a minimal static site used to validate Forge static site deploys.

## Build

```bash
npm install
npm run build
```

The build outputs to `dist/` by copying the contents of `public/`.

## Notes

- The Forge worker uses `installCommand` and `buildCommand` from the service settings.
- The built site is synced to MinIO and served via the static nginx gateway.
