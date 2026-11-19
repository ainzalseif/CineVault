<template>
  <v-container class="dashboard-container py-10 py-md-14" aria-label="Personal movie dashboard">
    <div class="eyebrow">YOUR FILM MAX</div>
    <div class="dashboard-heading d-flex flex-wrap align-end justify-space-between ga-5 mt-2 mb-8">
      <div>
        <h1>Welcome{{ firstName ? `, ${firstName}` : ' back' }}.</h1>
        <p>Your movie collection, all in one place.</p>
        <div v-if="profile" class="profile-summary mt-5">
          <v-avatar v-if="profile.picture" size="42">
            <v-img :src="profile.picture" alt="Your Google profile photo" />
          </v-avatar>
          <v-avatar v-else color="amber" variant="tonal" size="42">
            <v-icon icon="mdi-account" />
          </v-avatar>
          <div class="profile-summary-copy">
            <strong>{{ profile.name || 'Google account' }}</strong>
            <span>{{ profile.email || 'Email unavailable' }}</span>
          </div>
        </div>
      </div>
      <div class="d-flex flex-wrap ga-3">
        <v-btn color="amber" to="/movies" append-icon="mdi-arrow-right">Explore movies</v-btn>
        <v-btn variant="outlined" color="white" to="/watchlist" prepend-icon="mdi-heart-outline">
          My watchlist
        </v-btn>
      </div>
    </div>

    <v-row class="mb-5">
      <v-col cols="12" sm="4">
        <v-card class="stat-card h-100" rounded="lg" to="/movies">
          <v-card-text class="d-flex align-center ga-4 pa-5">
            <v-avatar color="amber" variant="tonal" size="48">
              <v-icon icon="mdi-movie-open" />
            </v-avatar>
            <div>
              <div class="stat-value">{{ movies.length }}</div>
              <div class="stat-label">Movies to discover</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="stat-card h-100" rounded="lg" to="/watchlist">
          <v-card-text class="d-flex align-center ga-4 pa-5">
            <v-avatar color="pink" variant="tonal" size="48">
              <v-icon icon="mdi-heart" />
            </v-avatar>
            <div>
              <div class="stat-value">{{ savedMovies.length }}</div>
              <div class="stat-label">Saved to watchlist</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card class="stat-card h-100" rounded="lg">
          <v-card-text class="d-flex align-center ga-4 pa-5">
            <v-avatar color="blue" variant="tonal" size="48">
              <v-icon icon="mdi-star" />
            </v-avatar>
            <div>
              <div class="stat-value">{{ averageRating }}<span class="stat-suffix"> / 10</span></div>
              <div class="stat-label">Average movie rating</div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="7">
        <section class="dashboard-panel h-100">
          <div class="panel-heading d-flex align-center justify-space-between mb-5">
            <div>
              <div class="eyebrow">YOUR COLLECTION</div>
              <h2>Genres to explore</h2>
            </div>
            <v-btn variant="text" color="amber" to="/movies" append-icon="mdi-arrow-right">All movies</v-btn>
          </div>
          <div v-for="genre in genreStats" :key="genre.name" class="genre-row">
            <div class="d-flex justify-space-between mb-2">
              <span class="genre-name">{{ genre.name }}</span>
              <span class="genre-count">{{ genre.count }} {{ genre.count === 1 ? 'movie' : 'movies' }}</span>
            </div>
            <v-progress-linear
              :model-value="genre.percentage"
              color="amber"
              bg-color="white"
              bg-opacity="0.08"
              height="6"
              rounded
            />
          </div>
        </section>
      </v-col>

      <v-col cols="12" md="5">
        <section class="dashboard-panel h-100">
          <div class="panel-heading d-flex align-center justify-space-between mb-5">
            <div>
              <div class="eyebrow">SAVED FOR LATER</div>
              <h2>Watchlist snapshot</h2>
            </div>
            <v-btn variant="text" color="amber" to="/watchlist" append-icon="mdi-arrow-right">View all</v-btn>
          </div>
          <template v-if="savedMovies.length">
            <NuxtLink
              v-for="movie in watchlistPreview"
              :key="movie.id"
              class="watchlist-item"
              :to="`/movies/${movie.id}`"
            >
              <v-avatar rounded="sm" size="54">
                <v-img :src="movie.poster" :alt="`${movie.title} poster`" cover />
              </v-avatar>
              <div class="watchlist-item-copy">
                <strong>{{ movie.title }}</strong>
                <span>{{ movie.year }} · {{ movie.genre }}</span>
              </div>
              <v-icon icon="mdi-chevron-right" color="grey" />
            </NuxtLink>
            <p v-if="savedMovies.length > watchlistPreview.length" class="more-saved">
              And {{ savedMovies.length - watchlistPreview.length }} more in your watchlist
            </p>
          </template>
          <div v-else class="watchlist-empty">
            <v-icon icon="mdi-heart-plus-outline" color="amber" size="32" />
            <p>Your watchlist is empty. Save a movie to keep it close.</p>
            <v-btn class="mt-2" variant="text" color="amber" to="/movies" append-icon="mdi-arrow-right">
              Find a movie
            </v-btn>
          </div>
        </section>
      </v-col>
    </v-row>

    <section class="recommendations mt-10">
      <div class="panel-heading d-flex align-end justify-space-between mb-6">
        <div>
          <div class="eyebrow">CURATED FOR YOUR NEXT MOVIE NIGHT</div>
          <h2>Top-rated picks</h2>
        </div>
        <v-btn variant="text" color="amber" to="/movies" append-icon="mdi-arrow-right">Browse all</v-btn>
      </div>
      <v-row>
        <v-col v-for="movie in topRatedMovies" :key="movie.id" cols="6" sm="4" md="3">
          <MovieCard :movie="movie" />
        </v-col>
      </v-row>
    </section>
  </v-container>
</template>

<script setup lang="ts">
import { movies } from '~/data/movies'

const watchlist = useWatchlist()
const profile = ref<{ name?: string; email?: string; picture?: string } | null>(null)
const firstName = computed(() => profile.value?.name?.trim().split(/\s+/)[0] || '')
const savedMovies = computed(() => watchlist.ids.value
  .map(id => movies.find(movie => movie.id === id))
  .filter(movie => movie !== undefined))
const watchlistPreview = computed(() => savedMovies.value.slice(0, 3))
const averageRating = computed(() => (
  movies.reduce((total, movie) => total + movie.rating, 0) / movies.length
).toFixed(1))
const genreStats = computed(() => {
  const counts = new Map<string, number>()
  for (const movie of movies) {
    counts.set(movie.genre, (counts.get(movie.genre) || 0) + 1)
  }

  return [...counts.entries()]
    .map(([name, count]) => ({
      name,
      count,
      percentage: (count / movies.length) * 100,
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
})
const topRatedMovies = computed(() => [...movies]
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 4))

onMounted(() => {
  watchlist.load()

  const savedUser = localStorage.getItem('google_user')
  if (!savedUser) return

  try {
    const user: unknown = JSON.parse(savedUser)
    if (typeof user === 'object' && user !== null) {
      const savedProfile = user as Record<string, unknown>
      profile.value = {
        name: typeof savedProfile.name === 'string' ? savedProfile.name : undefined,
        email: typeof savedProfile.email === 'string' ? savedProfile.email : undefined,
        picture: typeof savedProfile.picture === 'string' ? savedProfile.picture : undefined,
      }
    } else {
      console.error('Saved Google profile has an unexpected format.')
    }
  } catch (error) {
    console.error('Unable to read the saved Google profile:', error)
  }
})
</script>

<style scoped>
.dashboard-container {
  max-width: 1240px;
  min-height: 80vh;
}

.eyebrow {
  color: #f6b93b;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.dashboard-heading h1 {
  color: white;
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 800;
  letter-spacing: -0.055em;
}

.dashboard-heading p {
  margin-top: 8px;
  color: #a4a8b4;
}

.profile-summary {
  display: flex;
  align-items: center;
  gap: 12px;
}

.profile-summary-copy {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.profile-summary-copy strong {
  color: #fff;
  font-size: 0.95rem;
}

.profile-summary-copy span {
  color: #a4a8b4;
  font-size: 0.85rem;
}

.stat-card,
.dashboard-panel {
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #171a23;
  color: white;
}

.stat-card {
  transition: border-color 150ms ease;
}

.stat-card:hover {
  border-color: rgba(246, 185, 59, 0.45);
}

.stat-value {
  color: white;
  font-size: 1.65rem;
  font-weight: 800;
}

.stat-suffix {
  color: #858b99;
  font-size: 0.85rem;
  font-weight: 500;
}

.stat-label,
.genre-count {
  color: #a4a8b4;
  font-size: 0.88rem;
}

.dashboard-panel {
  padding: 24px;
  border-radius: 12px;
}

.panel-heading h2 {
  margin-top: 6px;
  color: white;
  font-size: 1.4rem;
  font-weight: 750;
  letter-spacing: -0.035em;
}

.genre-row + .genre-row {
  margin-top: 18px;
}

.genre-name {
  color: #e7e8ec;
  font-size: 0.92rem;
  font-weight: 600;
}

.watchlist-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 0;
  color: inherit;
  text-decoration: none;
}

.watchlist-item + .watchlist-item {
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.watchlist-item-copy {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 4px;
}

.watchlist-item-copy strong {
  overflow: hidden;
  color: #f5f5f6;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.watchlist-item-copy span,
.more-saved,
.watchlist-empty p {
  color: #a4a8b4;
  font-size: 0.85rem;
}

.more-saved {
  margin-top: 10px;
}

.watchlist-empty {
  display: flex;
  min-height: 190px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.watchlist-empty p {
  max-width: 260px;
  margin-top: 12px;
}

@media (max-width: 600px) {
  .dashboard-panel {
    padding: 18px;
  }

  .panel-heading :deep(.v-btn) {
    padding: 0 4px;
    font-size: 0.75rem;
  }
}
</style>
