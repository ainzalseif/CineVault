<template>
  <v-container class="page-container py-10 py-md-14">
    <div class="eyebrow">THE CINEVAULT COLLECTION</div>
    <div class="page-heading d-flex flex-wrap align-end justify-space-between ga-5 mt-2 mb-8">
      <div>
        <h1>Find your next favorite.</h1>
        <p>Browse the collection and save movies to your watchlist.</p>
      </div>
      <div class="filters d-flex flex-wrap ga-3">
        <v-text-field
          v-model="search"
          class="search-field"
          prepend-inner-icon="mdi-magnify"
          label="Search movies"
          variant="outlined"
          density="comfortable"
          hide-details
          clearable
        />
        <v-select
          v-model="selectedGenre"
          :items="genres"
          label="Genre"
          variant="outlined"
          density="comfortable"
          hide-details
          class="genre-select"
        />
      </div>
    </div>

    <p class="results-count mb-4">{{ filteredMovies.length }} movies</p>
    <v-row v-if="filteredMovies.length">
      <v-col v-for="movie in filteredMovies" :key="movie.id" cols="6" sm="4" md="3" lg="2">
        <MovieCard :movie="movie" />
      </v-col>
    </v-row>
    <v-empty-state
      v-else
      icon="mdi-movie-search-outline"
      title="No movies found"
      text="Try another title or genre."
    />
  </v-container>
</template>

<script setup lang="ts">
import { movies } from '~/data/movies'

const search = ref('')
const selectedGenre = ref('All genres')
const genres = ['All genres', ...new Set(movies.map(movie => movie.genre))]

const filteredMovies = computed(() => {
  const query = search.value?.trim().toLowerCase() || ''
  return movies.filter((movie) => {
    const matchesSearch = !query || movie.title.toLowerCase().includes(query)
    const matchesGenre = selectedGenre.value === 'All genres' || movie.genre === selectedGenre.value
    return matchesSearch && matchesGenre
  })
})
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

.page-heading h1 {
  color: white;
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.055em;
}

.page-heading p,
.results-count {
  margin-top: 8px;
  color: #a4a8b4;
}

.filters {
  width: min(100%, 440px);
}

.search-field {
  flex: 1 1 230px;
}

.genre-select {
  flex: 1 1 150px;
}
</style>
