# Vencer Fitness Club

React and Vite website for Vencer Fitness Club.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Local development

```sh
npm ci
npm run dev
```

## Production build

```sh
npm ci
npm run build
npm run preview
```

The static production site is written to `dist/`. Deploy the contents of this
folder to any static hosting provider. Set the build command to `npm run build`
and the publish directory to `dist`.

The MP4 files in the project root are the hero and contact background videos.
Vite bundles these assets into the production build.

Membership prices are demo placeholders and must be replaced with confirmed
club pricing before the site is published.
