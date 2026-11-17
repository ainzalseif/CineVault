<<<<<<< HEAD
# Film Max
=======
# Film Max

A small, local-first movie catalog and watchlist built with Nuxt 4, Vuetify 4, and Video.js.

**Film Max** — Created by Mhikel Q. David · Est. 2026

## Features

- Browse movies, search by title, and filter by genre.
- View movie details and open YouTube-hosted official trailers.
- Add and remove movies from a watchlist saved in browser local storage.
- Play the openly licensed Big Buck Bunny short film with Video.js.
- Sign in with Google using the existing OAuth flow.

Movie trailer playback is embedded from YouTube; Film Max does not host commercial movies. YouTube controls whether a video can be embedded in your region or on your browser. The openly licensed Big Buck Bunny film is streamed from the Internet Archive.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and set your Google OAuth client ID:

   ```env
   NUXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
   ```

   In Google Cloud Console, configure the OAuth consent screen and add `http://localhost:3000` as an authorized JavaScript origin for the OAuth client.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000`.

Google sign-in requires a valid OAuth client ID. The watchlist is stored in this browser and is not synced to Google or a server.

## Add a movie

Edit `app/data/movies.ts`. For a YouTube trailer, set `youtubeId` to the video ID from its URL. For an authorized MP4, set `videoUrl`; that movie will play through Video.js.

## Production build

```bash
npm run build
npm run preview
```
>>>>>>> 975adb7 (Initial CineVault release)
