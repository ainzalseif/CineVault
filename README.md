# Film Max

A Nuxt 4 and Vuetify 4 movie catalog with Google sign-in, a protected dashboard, and a local watchlist.

## Project pages

- `/login` — Google sign-in.
- `/` — protected dashboard.
- `/discover` — movie discovery page.
- `/watch/big-buck-bunny` — Video.js library demo featuring the openly licensed Big Buck Bunny short film.
- `/watch/sintel` — Sintel, an openly licensed Blender Foundation short film streamed from Internet Archive through Video.js.
- `/watch/tears-of-steel` — Tears of Steel, a Blender Institute short film streamed from Internet Archive through Video.js.
- `/watch/the-general` — public-domain feature film streamed from Internet Archive through Video.js.

**Chosen third-party library:** [Video.js](https://videojs.com/).

**Live URL:** Deployed through Vercel; add the production URL from the Vercel project domains.

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and set your Google OAuth client ID:

   ```env
   NUXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
   ```

   The client ID is public configuration, not a client secret. Do not commit `.env` or access tokens. Configure the OAuth client’s authorized JavaScript origins for `http://localhost:3000` and the deployed HTTPS origin.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000`.

Google sign-in requires a configured OAuth client ID. The watchlist is stored in this browser and is not synced to a server.

## Add a movie

Edit `app/data/movies.ts`. Set `youtubeId` for a YouTube trailer, or set `videoUrl` for an authorized MP4 playable through Video.js.

## Build

```bash
npm run build
npm run preview
```
