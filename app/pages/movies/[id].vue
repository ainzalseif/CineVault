<template>
  <v-container class="detail-container py-10 py-md-14">
    <v-btn to="/movies" variant="text" color="white" prepend-icon="mdi-arrow-left" class="mb-7">
      All movies
    </v-btn>
    <div class="detail-grid">
      <v-img :src="movie.poster" :alt="`${movie.title} poster`" class="detail-poster" cover />
      <div class="detail-content">
        <div class="eyebrow">{{ movie.genre }} <span class="dot">•</span> {{ movie.year }}</div>
        <h1>{{ movie.title }}</h1>
        <div class="movie-stats">
          <span><v-icon icon="mdi-star" color="amber" size="small" /> {{ movie.rating.toFixed(1) }}</span>
          <span>{{ movie.runtime }}</span>
          <span>{{ movie.genre }}</span>
        </div>
        <p class="description">{{ movie.description }}</p>
        <div class="d-flex flex-wrap ga-3 mt-8">
          <v-btn color="amber" size="large" :to="`/watch/${movie.id}`" prepend-icon="mdi-play">
            {{ movie.videoUrl ? 'Watch film' : 'Watch trailer' }}
          </v-btn>
          <v-btn
            :color="isSaved ? 'red' : 'white'"
            :prepend-icon="isSaved ? 'mdi-heart' : 'mdi-heart-outline'"
            size="large"
            variant="outlined"
            @click="watchlist.toggle(movie.id)"
          >
            {{ isSaved ? 'In watchlist' : 'Add to watchlist' }}
          </v-btn>
        </div>
        <v-alert v-if="movie.youtubeId" class="mt-8" type="info" variant="tonal" density="comfortable">
          Trailer playback is provided by YouTube. CineVault does not host or distribute movie files.
        </v-alert>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { getMovie } from '~/data/movies'

const route = useRoute()
const movie = getMovie(String(route.params.id))

if (!movie) {
  throw createError({ statusCode: 404, statusMessage: 'Movie not found' })
}

const watchlist = useWatchlist()
const isSaved = computed(() => watchlist.ids.value.includes(movie.id))
</script>

<style scoped>
.detail-container {
  max-width: 1100px;
  min-height: 80vh;
}

.detail-grid {
  display: grid;
  grid-template-columns: minmax(220px, 360px) 1fr;
  align-items: center;
  gap: clamp(28px, 6vw, 72px);
}

.detail-poster {
  border-radius: 14px;
  background: #20232d;
}

.eyebrow {
  color: #c1c4cd;
  font-weight: 700;
}

.dot {
  padding: 0 7px;
  color: #f6b93b;
}

h1 {
  margin-top: 12px;
  color: #fff;
  font-size: clamp(2.5rem, 6vw, 4.7rem);
  font-weight: 800;
  letter-spacing: -0.06em;
  line-height: 1;
}

.movie-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 22px;
  color: #b5b8c2;
}

.movie-stats span:first-child {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: white;
}

.description {
  max-width: 590px;
  margin-top: 24px;
  color: #c2c4cc;
  font-size: 1.08rem;
  line-height: 1.8;
}

@media (max-width: 700px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }

  .detail-poster {
    max-width: 280px;
  }
}
</style>
