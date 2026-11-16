<template>
  <v-container class="page-container py-10 py-md-14">
    <div class="eyebrow">SAVED FOR LATER</div>
    <div class="d-flex flex-wrap align-end justify-space-between ga-3 mt-2 mb-8">
      <div>
        <h1>My watchlist</h1>
        <p class="page-subtitle">A little collection of movies you want to see.</p>
      </div>
      <v-chip v-if="savedMovies.length" color="amber" variant="tonal">
        {{ savedMovies.length }} {{ savedMovies.length === 1 ? 'movie' : 'movies' }}
      </v-chip>
    </div>

    <v-row v-if="savedMovies.length">
      <v-col v-for="movie in savedMovies" :key="movie.id" cols="6" sm="4" md="3" lg="2">
        <MovieCard :movie="movie" />
      </v-col>
    </v-row>
    <div v-else class="empty-watchlist">
      <v-icon icon="mdi-heart-outline" size="52" color="amber" />
      <h2>Your watchlist is waiting.</h2>
      <p>Save movies you love and they’ll show up here.</p>
      <v-btn class="mt-5" color="amber" to="/movies" append-icon="mdi-arrow-right">Explore movies</v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { getMovie } from '~/data/movies'

const watchlist = useWatchlist()
const savedMovies = computed(() => watchlist.ids.value
  .map(id => getMovie(id))
  .filter(movie => movie !== undefined))
</script>

<style scoped>
.page-container {
  max-width: 1240px;
  min-height: 80vh;
}

.eyebrow {
  color: #f6b93b;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.16em;
}

h1 {
  color: white;
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 800;
  letter-spacing: -0.055em;
}

.page-subtitle,
.empty-watchlist p {
  margin-top: 8px;
  color: #a4a8b4;
}

.empty-watchlist {
  display: flex;
  min-height: 360px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px dashed rgba(255, 255, 255, 0.16);
  border-radius: 16px;
  text-align: center;
}

.empty-watchlist h2 {
  margin-top: 18px;
  color: white;
  font-size: 1.5rem;
}
</style>
