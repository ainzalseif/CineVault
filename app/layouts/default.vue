<template>
  <v-app>
    <v-app-bar v-if="route.path !== '/login'" class="app-header" flat>
      <v-container class="d-flex align-center py-0">
        <NuxtLink class="brand d-flex align-center ga-2 text-decoration-none" to="/">
          <v-icon color="amber" icon="mdi-filmstrip-box-multiple" size="28" />
          <span>Cine<span class="brand-accent">Vault</span></span>
        </NuxtLink>

        <nav class="main-nav d-flex align-center ga-2 ml-10">
          <v-btn to="/" variant="text" color="white">Discover</v-btn>
          <v-btn to="/movies" variant="text" color="white">Movies</v-btn>
          <v-btn to="/watchlist" variant="text" color="white">
            Watchlist
            <v-badge
              v-if="watchlist.count.value"
              :content="watchlist.count.value"
              color="amber"
              inline
              class="ml-1"
            />
          </v-btn>
        </nav>

        <v-spacer />

        <v-menu v-if="user" location="bottom end">
          <template #activator="{ props }">
            <v-btn v-bind="props" class="user-menu" variant="text">
              <v-avatar size="34" class="mr-2">
                <v-img v-if="user.picture" :src="user.picture" alt="Profile photo" />
                <v-icon v-else icon="mdi-account" />
              </v-avatar>
              <span class="user-name">{{ user.name || user.email || 'Your account' }}</span>
              <v-icon icon="mdi-chevron-down" size="small" class="ml-1" />
            </v-btn>
          </template>
          <v-list>
            <v-list-item :title="user.email || 'Signed in with Google'" prepend-icon="mdi-google" />
            <v-divider />
            <v-list-item title="Sign out" prepend-icon="mdi-logout" @click="logout" />
          </v-list>
        </v-menu>
      </v-container>
    </v-app-bar>

    <v-main class="app-main">
      <div class="main-content">
        <slot />
      </div>
      <footer class="app-footer">
        <v-container class="footer-content">
          © 2026 <span class="footer-brand">CineVault™</span>
          <span class="footer-separator">·</span>
          Created by Mhikel Q. David
          <span class="footer-separator">·</span>
          Est. 2026
        </v-container>
      </footer>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
const watchlist = useWatchlist()
const route = useRoute()
const authCookie = useCookie<string | null>('google_auth', {
  path: '/',
  sameSite: 'lax',
})
const user = ref<{ name?: string; email?: string; picture?: string } | null>(null)

onMounted(() => {
  const savedUser = localStorage.getItem('google_user')
  if (savedUser) {
    try {
      user.value = JSON.parse(savedUser)
    } catch (error) {
      console.error('Unable to read the saved Google profile:', error)
    }
  }

  watchlist.load()
})

async function logout() {
  localStorage.removeItem('google_user')
  localStorage.removeItem('google_token')
  authCookie.value = null
  user.value = null
  await navigateTo('/login')
}
</script>

<style scoped>
.app-header {
  background: rgba(15, 17, 24, 0.94);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
}

.brand {
  color: #fff;
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: -0.04em;
}

.brand-accent {
  color: #f6b93b;
}

.app-main {
  background: #0f1118;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

.app-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: #858b99;
  font-size: 0.8rem;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding-top: 18px;
  padding-bottom: 18px;
  text-align: center;
}

.footer-brand {
  color: #f6b93b;
  font-weight: 700;
}

.footer-separator {
  color: #555b68;
}

.user-menu {
  color: white;
  text-transform: none;
}

@media (max-width: 600px) {
  .main-nav {
    gap: 0 !important;
    margin-left: 8px !important;
  }

  .main-nav :deep(.v-btn) {
    min-width: 0;
    padding: 0 8px;
    font-size: 0.78rem;
  }

  .user-name {
    display: none;
  }
}
</style>
