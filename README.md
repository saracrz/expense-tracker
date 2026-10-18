# Expenses Tracker

Personal monthly expense tracker. Shows how much you've spent this month and lets you add expenses quickly. Each month gets its own accent color.

Built with React 19, TypeScript, Vite, Tailwind CSS v4 and shadcn/ui. Data is stored in Firebase Firestore (to be replaced).

## Getting started

Requires Node 24 (see `.nvmrc`).

```sh
nvm use
npm install
npm run dev
```

Open http://localhost:5173.

Create a `.env` file with your Firebase project config:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Scripts

| Command           | What it does                         |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the dev server                 |
| `npm run build`   | Type-check and build for production  |
| `npm run preview` | Serve the production build locally   |
| `npm run lint`    | Run ESLint (fails on any warning)    |

## Troubleshooting

`504 (Outdated Optimize Dep)` in the browser console after installing or upgrading packages: stop the dev server, then run

```sh
rm -rf node_modules/.vite
npm run dev -- --force
```

and hard-reload the page.
