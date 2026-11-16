<template>
  <v-card class="movie-card" rounded="lg" :to="`/movies/${movie.id}`">
    <div class="poster-wrap">
      <v-img
        :src="movie.poster"
        :alt="`${movie.title} poster`"
        aspect-ratio="0.68"
        cover
        class="movie-poster"
      >
        <template #placeholder>
          <div class="poster-placeholder d-flex align-center justify-center">
            <v-icon icon="mdi-movie-open" size="42" />
          </div>
        </template>
      </v-img>
      <v-btn
        class="favorite-btn"
        :aria-label="isSaved ? 'Remove from watchlist' : 'Add to watchlist'"
        :icon="isSaved ? 'mdi-heart' : 'mdi-heart-outline'"
        :color="isSaved ? 'red' : 'white'"
        variant="flat"
        size="small"
        @click.prevent="watchlist.toggle(movie.id)"
      />
      <div class="poster-rating">
        <v-icon icon="mdi-star" color="amber" size="small" />
        {{ movie.rating.toFixed(1) }}
      </div>
    </div>
    <v-card-text class="pa-4">
      <div class="movie-title">{{ movie.title }}</div>
      <div class="movie-meta">{{ movie.year }} <span class="dot">•</span> {{ movie.genre }}</div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Movie } from '~/data/movies'

const props = defineProps<{ movie: Movie }>()
const watchlist = useWatchlist()
const isSaved = computed(() => watchlist.ids.value.includes(props.movie.id))
</script>

<style scoped>
.movie-card {
  position: relative;
  overflow: hidden;
  background: #191c25;
  color: #fff;
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
}

.poster-wrap {
  position: relative;
  overflow: hidden;
}

.movie-poster {
  background: #252936;
}

.poster-placeholder {
  height: 100%;
  color: #858b9b;
}

.favorite-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(15, 17, 24, 0.82);
}

.poster-rating {
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px 8px;
  border-radius: 6px;
  background: rgba(15, 17, 24, 0.85);
  font-size: 0.8rem;
  font-weight: 700;
}

.movie-title {
  overflow: hidden;
  font-size: 1rem;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.movie-meta {
  margin-top: 5px;
  color: #a0a5b2;
  font-size: 0.82rem;
}

.dot {
  padding: 0 4px;
  color: #f6b93b;
}
</style>
