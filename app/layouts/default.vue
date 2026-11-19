<template>
  <v-app>
    <div
      class="app-shell"
      :class="{
        'sidebar-is-collapsed': sidebarCollapsed,
        'mobile-sidebar-open': mobileSidebarOpen,
        'is-auth-page': route.path === '/login',
      }"
    >
      <header v-if="route.path !== '/login'" class="mobile-topbar">
        <button
          class="icon-button"
          type="button"
          aria-label="Open navigation"
          @click="mobileSidebarOpen = true"
        >
          <v-icon icon="mdi-menu" />
        </button>
        <NuxtLink class="brand" to="/discover">
          <v-icon color="amber" icon="mdi-filmstrip-box-multiple" size="25" />
          <span>Film <span class="brand-accent">Max</span></span>
        </NuxtLink>
      </header>

      <button
        v-if="mobileSidebarOpen && route.path !== '/login'"
        class="sidebar-scrim"
        type="button"
        aria-label="Close navigation"
        @click="mobileSidebarOpen = false"
      />

      <aside v-if="route.path !== '/login'" class="app-sidebar" aria-label="Main navigation">
        <div class="sidebar-brand">
          <NuxtLink class="brand" to="/discover">
            <v-icon color="amber" icon="mdi-filmstrip-box-multiple" size="27" />
            <span class="sidebar-label">Film <span class="brand-accent">Max</span></span>
          </NuxtLink>
          <button
            class="icon-button collapse-button"
            type="button"
            :aria-label="sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
            @click="sidebarCollapsed = !sidebarCollapsed"
          >
            <v-icon :icon="sidebarCollapsed ? 'mdi-chevron-right' : 'mdi-chevron-left'" />
          </button>
          <button
            class="icon-button close-button"
            type="button"
            aria-label="Close navigation"
            @click="mobileSidebarOpen = false"
          >
            <v-icon icon="mdi-close" />
          </button>
        </div>

        <nav class="sidebar-nav" aria-label="Primary">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            class="sidebar-link"
            :class="{
              'is-active': item.to === '/'
                ? route.path === '/'
                : route.path === item.to || route.path.startsWith(`${item.to}/`),
            }"
            :to="item.to"
            :aria-label="item.label"
            :title="sidebarCollapsed ? item.label : undefined"
            @click="mobileSidebarOpen = false"
          >
            <v-icon :icon="item.icon" size="20" />
            <span class="sidebar-label">{{ item.label }}</span>
            <v-badge
              v-if="item.to === '/watchlist' && watchlist.count.value"
              :content="watchlist.count.value"
              color="amber"
              inline
              class="sidebar-label"
            />
          </NuxtLink>
        </nav>

        <section v-if="route.path === '/'" class="sidebar-genres">
          <div class="sidebar-section-title sidebar-label">EXPLORE GENRES</div>
          <NuxtLink
            v-for="genre in genres"
            :key="genre"
            class="sidebar-genre sidebar-label"
            :to="{ path: '/movies', query: { genre } }"
            @click="mobileSidebarOpen = false"
          >
            {{ genre }}
          </NuxtLink>
        </section>

        <v-spacer />

        <v-menu v-if="user" location="top end">
          <template #activator="{ props }">
            <button
              v-bind="props"
              class="profile-button"
              :title="sidebarCollapsed ? user.name || user.email || 'Your account' : undefined"
            >
              <v-avatar size="34">
                <v-img v-if="user.picture" :src="user.picture" alt="Profile photo" />
                <v-icon v-else icon="mdi-account" />
              </v-avatar>
              <span class="profile-copy sidebar-label">
                <strong>{{ user.name || 'Your account' }}</strong>
                <small>{{ user.email }}</small>
              </span>
              <v-icon class="profile-menu-icon sidebar-label" icon="mdi-dots-vertical" size="small" />
            </button>
          </template>
          <v-list>
            <v-list-item :title="user.email || 'Signed in with Google'" prepend-icon="mdi-google" />
            <v-divider />
            <v-list-item title="Sign out" prepend-icon="mdi-logout" @click="logout" />
          </v-list>
        </v-menu>
      </aside>

      <div class="app-workspace">
        <main class="main-content">
          <slot />
        </main>
        <footer v-if="route.path !== '/login'" class="app-footer">
          <div class="footer-content">
            © 2026 <span class="footer-brand">Film Max</span>
            <span class="footer-separator">·</span>
            Created by Mhikel Q. David
            <span class="footer-separator">·</span>
            Est. 2026
          </div>
        </footer>
      </div>
    </div>
  </v-app>
</template>

<script lang="ts" setup>
import { movies } from '~/data/movies'

const watchlist = useWatchlist()
const route = useRoute()
const router = useRouter()
const authCookie = useCookie<string | null>('google_auth', {
  path: '/',
  sameSite: 'lax',
})
const sidebarCollapsed = ref(false)
const mobileSidebarOpen = ref(false)
const user = ref<{ name?: string; email?: string; picture?: string } | null>(null)
const navItems = [
  { to: '/discover', label: 'Discover', icon: 'mdi-compass-outline' },
  { to: '/', label: 'Dashboard', icon: 'mdi-view-dashboard-outline' },
  { to: '/movies', label: 'Movies', icon: 'mdi-movie-open-outline' },
  { to: '/watchlist', label: 'Watchlist', icon: 'mdi-heart-outline' },
]
const genres = [...new Set(movies.map(movie => movie.genre))].sort((a, b) => a.localeCompare(b))

watch(() => route.fullPath, () => {
  mobileSidebarOpen.value = false
})

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
  await router.push('/login')
}
</script>

<style scoped>
.app-shell {
  --sidebar-width: 258px;
  min-height: 100vh;
  background: #0f1118;
}

.mobile-topbar {
  display: none;
}

.app-sidebar {
  position: fixed;
  z-index: 20;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  width: var(--sidebar-width);
  flex-direction: column;
  padding: 18px 14px 14px;
  overflow: hidden auto;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  background: #141925;
  transition: width 180ms ease, transform 180ms ease;
}

.sidebar-brand {
  display: flex;
  min-height: 42px;
  align-items: center;
  justify-content: space-between;
  padding: 0 7px 16px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #fff;
  font-size: 1.18rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  text-decoration: none;
  white-space: nowrap;
}

.brand-accent,
.footer-brand {
  color: #f6b93b;
}

.icon-button {
  display: inline-flex;
  width: 36px;
  height: 36px;
  flex: 0 0 36px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #a4a8b4;
  cursor: pointer;
}

.icon-button:hover,
.profile-button:hover {
  background: rgba(255, 255, 255, 0.07);
  color: white;
}

.close-button {
  display: none;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.sidebar-link {
  display: flex;
  min-height: 44px;
  align-items: center;
  gap: 14px;
  padding: 0 12px;
  border-radius: 8px;
  color: #aab0bf;
  font-size: 0.93rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 150ms ease, color 150ms ease;
}

.sidebar-link:hover {
  background: rgba(255, 255, 255, 0.06);
  color: white;
}

.sidebar-link.is-active {
  background: #f01372;
  color: white;
}

.sidebar-genres {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-top: 26px;
  padding: 16px 0 0 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.sidebar-section-title {
  margin-bottom: 8px;
  color: #8d95a6;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.13em;
}

.sidebar-genre {
  padding: 7px 8px;
  border-radius: 6px;
  color: #aab0bf;
  font-size: 0.86rem;
  text-decoration: none;
}

.sidebar-genre:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #f6b93b;
}

.profile-button {
  display: flex;
  width: 100%;
  min-height: 54px;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: white;
  text-align: left;
  cursor: pointer;
}

.profile-copy {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 3px;
}

.profile-copy strong,
.profile-copy small {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.profile-copy strong {
  font-size: 0.84rem;
}

.profile-copy small {
  color: #8d95a6;
  font-size: 0.72rem;
}

.app-workspace {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  margin-left: var(--sidebar-width);
  transition: margin-left 180ms ease;
}

.main-content {
  flex: 1;
  min-width: 0;
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
  padding: 18px 16px;
  text-align: center;
}

.sidebar-is-collapsed {
  --sidebar-width: 76px;
}

.sidebar-is-collapsed .app-sidebar {
  padding-right: 10px;
  padding-left: 10px;
}

.sidebar-is-collapsed .sidebar-brand {
  justify-content: center;
  padding-right: 0;
  padding-left: 0;
}

.sidebar-is-collapsed .sidebar-brand .brand {
  display: none;
}

.sidebar-is-collapsed .sidebar-label {
  display: none;
}

.sidebar-is-collapsed .sidebar-nav {
  align-items: center;
}

.sidebar-is-collapsed .sidebar-link {
  width: 48px;
  justify-content: center;
  padding: 0;
}

.sidebar-is-collapsed .sidebar-genres {
  display: none;
}

.sidebar-is-collapsed .profile-button {
  justify-content: center;
  padding: 8px 0;
}

@media (max-width: 959px) {
  .mobile-topbar {
    position: fixed;
    z-index: 18;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    height: 60px;
    align-items: center;
    gap: 10px;
    padding: 0 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(15, 17, 24, 0.96);
    backdrop-filter: blur(14px);
  }

  .mobile-topbar .brand {
    font-size: 1.08rem;
  }

  .app-sidebar {
    z-index: 30;
    width: 280px;
    transform: translateX(-100%);
  }

  .mobile-sidebar-open .app-sidebar {
    transform: translateX(0);
  }

  .sidebar-is-collapsed .app-sidebar {
    width: 280px;
  }

  .sidebar-is-collapsed .sidebar-brand .brand,
  .sidebar-is-collapsed .sidebar-label {
    display: initial;
  }

  .sidebar-is-collapsed .sidebar-genres {
    display: flex;
  }

  .sidebar-is-collapsed .profile-copy {
    display: flex;
  }

  .sidebar-is-collapsed .sidebar-brand {
    justify-content: space-between;
    padding: 0 7px 16px;
  }

  .sidebar-is-collapsed .sidebar-link {
    width: auto;
    justify-content: flex-start;
    padding: 0 12px;
  }

  .sidebar-is-collapsed .profile-button {
    justify-content: flex-start;
    padding: 8px;
  }

  .collapse-button {
    display: none;
  }

  .close-button {
    display: inline-flex;
  }

  .sidebar-scrim {
    position: fixed;
    z-index: 25;
    inset: 0;
    border: 0;
    background: rgba(0, 0, 0, 0.58);
  }

  .app-workspace {
    min-height: 100vh;
    margin-left: 0;
    padding-top: 60px;
  }
}

.is-auth-page .app-workspace {
  margin-left: 0;
  padding-top: 0;
}
</style>
