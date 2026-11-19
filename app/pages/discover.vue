<template>
  <div>
    <section class="hero">
      <div class="hero-image" />
      <v-container class="hero-content">
        <v-chip color="amber" variant="tonal" prepend-icon="mdi-sparkles" class="mb-5">
          Discover your next favorite movies
        </v-chip>
        <h1>Stories worth<br>staying in for.</h1>
        <p>Discover unforgettable movies, watch official trailers and short films, and keep your next favorite close.</p>
        <div class="d-flex flex-wrap ga-3 mt-7">
          <v-btn color="amber" size="large" to="/movies" append-icon="mdi-arrow-right">
            Explore movies
          </v-btn>
          <v-btn variant="outlined" color="white" size="large" to="/watchlist" prepend-icon="mdi-heart-outline">
            My watchlist
          </v-btn>
        </div>
        <div class="hero-featured">
          <span class="hero-featured-label">FEATURED FILM</span>
          <div class="d-flex align-center ga-3 mt-2">
            <span class="featured-name">Inception</span>
            <span class="hero-meta">2010 <span class="dot">•</span> Sci-Fi <span class="dot">•</span> ★ 8.8</span>
          </div>
        </div>
      </v-container>
    </section>

    <v-container class="section-container genre-container pt-8">
      <div class="d-flex flex-wrap align-center ga-3">
        <span class="eyebrow">BROWSE BY GENRE</span>
        <v-chip
          v-for="genre in genreShortcuts"
          :key="genre"
          :to="{ path: '/movies', query: { genre } }"
          variant="outlined"
          color="white"
        >
          {{ genre }}
        </v-chip>
      </div>
    </v-container>

    <v-container class="section-container py-12 py-md-16">
      <div class="section-heading d-flex align-end justify-space-between mb-6">
        <div>
          <div class="eyebrow">RATED BY MOVIE FANS</div>
          <h2>Top-rated picks</h2>
        </div>
        <v-btn variant="text" color="amber" to="/movies" append-icon="mdi-arrow-right">
          Browse all
        </v-btn>
      </div>
      <v-row>
        <v-col v-for="movie in topRatedMovies" :key="movie.id" cols="6" sm="4" md="3">
          <MovieCard :movie="movie" />
        </v-col>
      </v-row>

      <section v-if="fullFilms.length" class="full-films mt-12">
        <div class="section-heading d-flex flex-wrap align-end justify-space-between ga-3 mb-6">
          <div>
            <div class="eyebrow">AUTHORIZED FEATURE-FILM SOURCES</div>
            <h2>Watch a feature film</h2>
            <p class="full-films-description">
              These feature-length titles have a playable source; other movie entries link to trailers.
            </p>
          </div>
          <v-icon icon="mdi-movie-open-play" color="amber" size="30" />
        </div>
        <v-row>
          <v-col v-for="movie in fullFilms" :key="movie.id" cols="6" sm="4" md="3">
            <MovieCard :movie="movie" />
          </v-col>
        </v-row>
      </section>

      <section v-if="shortFilms.length" class="full-films mt-12">
        <div class="section-heading d-flex flex-wrap align-end justify-space-between ga-3 mb-6">
          <div>
            <div class="eyebrow">COMPLETE SHORT STORIES</div>
            <h2>Short films</h2>
            <p class="full-films-description">
              Watch complete short films from their official or openly licensed sources.
            </p>
          </div>
          <v-icon icon="mdi-movie-open-play" color="amber" size="30" />
        </div>
        <v-row>
          <v-col v-for="movie in shortFilms" :key="movie.id" cols="6" sm="4" md="3">
            <MovieCard :movie="movie" />
          </v-col>
        </v-row>
      </section>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { movies } from '~/data/movies'

const topRatedMovies = [...movies]
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 4)
const fullFilms = movies.filter(movie => Boolean(movie.videoUrl) && movie.contentType !== 'short-film')
const shortFilms = movies.filter(movie => movie.contentType === 'short-film')
const genreShortcuts = ['Action', 'Adventure', 'Animation', 'Comedy', 'Drama', 'Sci-Fi']
  .filter(genre => movies.some(movie => movie.genre === genre))
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 570px;
  overflow: hidden;
  background: #11131a;
}

.hero-image {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, #0f1118 2%, rgba(15, 17, 24, 0.94) 34%, rgba(15, 17, 24, 0.36) 72%, rgba(15, 17, 24, 0.2)),
    linear-gradient(0deg, #0f1118 0%, transparent 46%),
    url('https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg') center 38% / cover;
  opacity: 0.88;
}

.hero-content {
  position: relative;
  padding-top: 85px;
  padding-bottom: 65px;
}

h1 {
  max-width: 700px;
  color: #fff;
  font-size: clamp(3rem, 7vw, 5.7rem);
  font-weight: 800;
  letter-spacing: -0.065em;
  line-height: 0.99;
}

.hero-content > p {
  max-width: 490px;
  margin-top: 20px;
  color: #c2c4cc;
  font-size: 1.08rem;
  line-height: 1.7;
}

.hero-featured {
  margin-top: 48px;
}

.hero-featured-label,
.eyebrow {
  color: #f6b93b;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.featured-name {
  color: #fff;
  font-size: 1.25rem;
  font-weight: 700;
}

.hero-meta {
  color: #b7bac4;
  font-size: 0.9rem;
}

.dot {
  padding: 0 5px;
  color: #f6b93b;
}

.section-container {
  max-width: 1240px;
}

.genre-container {
  padding-bottom: 0;
}

.full-films-description {
  margin-top: 8px;
  color: #a4a8b4;
  font-size: 0.9rem;
}

h2 {
  margin-top: 7px;
  color: #fff;
  font-size: 2rem;
  font-weight: 750;
  letter-spacing: -0.04em;
}

@media (max-width: 600px) {
  .hero {
    min-height: 540px;
  }

  .hero-content {
    padding-top: 66px;
  }

  .hero-image {
    background-position: 58% center;
  }

  .section-heading {
    align-items: flex-start !important;
  }

  .section-heading :deep(.v-btn) {
    padding: 0 4px;
    font-size: 0.75rem;
  }
}
</style>
