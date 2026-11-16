<template>
  <v-container class="watch-container py-8 py-md-12">
    <v-btn :to="`/movies/${movie.id}`" variant="text" color="white" prepend-icon="mdi-arrow-left" class="mb-5">
      Back to {{ movie.title }}
    </v-btn>
    <div class="watch-heading mb-5">
      <div class="eyebrow">{{ movie.videoUrl ? 'FEATURE PRESENTATION' : 'OFFICIAL TRAILER' }}</div>
      <h1>{{ movie.title }}</h1>
      <p>{{ movie.year }} <span class="dot">•</span> {{ movie.genre }} <span class="dot">•</span> {{ movie.runtime }}</p>
    </div>

    <div class="player-frame">
      <ClientOnly v-if="movie.videoUrl">
        <VideoJsPlayer :src="movie.videoUrl" :poster="movie.poster" />
        <template #fallback>
          <div class="player-loading">Loading the Video.js player…</div>
        </template>
      </ClientOnly>
      <iframe
        v-else-if="movie.youtubeId"
        :src="`https://www.youtube-nocookie.com/embed/${movie.youtubeId}?rel=0`"
        :title="`${movie.title} official trailer`"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      />
    </div>
    <p class="player-caption">
      <template v-if="movie.videoUrl">
        This openly licensed Blender short film is streamed from the Internet Archive using Video.js.
      </template>
      <template v-else>
        Trailer is embedded from YouTube. Playback availability is controlled by YouTube and the video owner.
      </template>
    </p>
  </v-container>
</template>

<script setup lang="ts">
import { getMovie } from '~/data/movies'

const route = useRoute()
const movie = getMovie(String(route.params.id))

if (!movie) {
  throw createError({ statusCode: 404, statusMessage: 'Movie not found' })
}
</script>

<style scoped>
.watch-container {
  max-width: 1120px;
  min-height: 80vh;
}

.eyebrow {
  color: #f6b93b;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.watch-heading h1 {
  margin-top: 8px;
  color: white;
  font-size: clamp(2rem, 5vw, 3.4rem);
  font-weight: 800;
  letter-spacing: -0.05em;
}

.watch-heading p,
.player-caption {
  margin-top: 8px;
  color: #a4a8b4;
}

.dot {
  padding: 0 6px;
  color: #f6b93b;
}

.player-frame {
  overflow: hidden;
  border-radius: 14px;
  background: #050608;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.35);
}

.player-frame iframe {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 0;
}

.player-frame :deep(.video-js) {
  width: 100%;
  aspect-ratio: 16 / 9;
}

.player-loading {
  display: grid;
  min-height: 300px;
  place-items: center;
  color: #c1c4cd;
}

.player-caption {
  font-size: 0.88rem;
}
</style>
