<template>
  <div>
    <section class="hero">
      <div class="hero-image" />
      <v-container class="hero-content">
        <v-chip color="amber" variant="tonal" prepend-icon="mdi-sparkles" class="mb-5">
          Your personal movie collection
        </v-chip>
        <h1>Stories worth<br>staying in for.</h1>
        <p>Discover unforgettable movies, watch official trailers, and keep your next favorite close.</p>
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

    <v-container class="section-container py-12 py-md-16">
      <div class="section-heading d-flex align-end justify-space-between mb-6">
        <div>
          <div class="eyebrow">A GOOD PLACE TO START</div>
          <h2>Popular picks</h2>
        </div>
        <v-btn variant="text" color="amber" to="/movies" append-icon="mdi-arrow-right">
          Browse all
        </v-btn>
      </div>
      <v-row>
        <v-col v-for="movie in popularMovies" :key="movie.id" cols="6" sm="4" md="3">
          <MovieCard :movie="movie" />
        </v-col>
      </v-row>

      <div class="home-note mt-12">
        <v-icon icon="mdi-movie-open-play" color="amber" size="30" />
        <div>
          <strong>Watch trailers, legally and easily.</strong>
          <p>Movie trailers open from YouTube. Big Buck Bunny is included as a full, openly licensed film played with Video.js.</p>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { movies } from '~/data/movies'

const popularMovies = movies.slice(0, 4)
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

h2 {
  margin-top: 7px;
  color: #fff;
  font-size: 2rem;
  font-weight: 750;
  letter-spacing: -0.04em;
}

.home-note {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  background: #171a23;
  color: white;
}

.home-note p {
  margin-top: 4px;
  color: #a4a8b4;
  font-size: 0.9rem;
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
