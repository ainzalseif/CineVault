<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="login-card pa-6 rounded-xl">
      <div class="login-brand">
        <v-icon color="amber" icon="mdi-filmstrip-box-multiple" size="32" />
        <span>Film <strong>Max</strong></span>
      </div>
      <h1 class="login-title">
        {{ authMode === 'signup' ? 'Create your account' : 'Welcome back' }}
      </h1>
      <v-card-text>
        <p class="text-center text-medium-emphasis mb-5">
          {{ authMode === 'signup' ? 'Create an account to start your movie collection.' : 'Sign in to discover movies and keep your watchlist close.' }}
        </p>
        <div class="auth-tabs" role="group" aria-label="Email account options">
          <v-btn
            :variant="authMode === 'signin' ? 'flat' : 'text'"
            :color="authMode === 'signin' ? 'amber' : 'white'"
            @click="selectAuthMode('signin')"
          >
            Sign in
          </v-btn>
          <v-btn
            :variant="authMode === 'signup' ? 'flat' : 'text'"
            :color="authMode === 'signup' ? 'amber' : 'white'"
            @click="selectAuthMode('signup')"
          >
            Sign up
          </v-btn>
        </div>

        <v-form class="email-auth-form" @submit.prevent="submitEmailAuth">
          <v-text-field
            v-model="email"
            label="Email address"
            type="email"
            autocomplete="email"
            variant="outlined"
            density="comfortable"
            required
          />
          <v-text-field
            v-model="password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            :autocomplete="authMode === 'signup' ? 'new-password' : 'current-password'"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            variant="outlined"
            density="comfortable"
            required
            @click:append-inner="showPassword = !showPassword"
          />
          <v-text-field
            v-if="authMode === 'signup'"
            v-model="confirmPassword"
            label="Confirm password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="new-password"
            variant="outlined"
            density="comfortable"
            required
          />
          <v-btn block type="submit" variant="outlined" color="white" size="large">
            {{ authMode === 'signup' ? 'Create account' : 'Sign in with email' }}
          </v-btn>
        </v-form>
        <v-alert v-if="emailAuthNotice" class="mt-4" type="info" variant="tonal">
          {{ emailAuthNotice }}
        </v-alert>
        <div class="auth-divider"><span>OR</span></div>
        <v-btn
          block
          color="primary"
          size="large"
          prepend-icon="mdi-google"
          :loading="isLoading"
          :disabled="isLoading"
          @click="loginWithGoogle"
        >
          Continue with Google
        </v-btn>
        <v-alert v-if="errorMessage" type="error" variant="tonal" class="mt-4">
          {{ errorMessage }}
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const authCookie = useCookie<string | null>('google_auth', {
  path: '/',
  sameSite: 'lax',
})

interface GoogleTokenResponse {
  access_token?: string
  error?: string
  error_description?: string
}

interface GoogleTokenClient {
  requestAccessToken: () => void
}

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (options: {
            client_id: string
            scope: string
            callback: (response: GoogleTokenResponse) => void
          }) => GoogleTokenClient
        }
      }
    }
  }
}

const isLoading = ref(false)
const errorMessage = ref('')
const emailAuthNotice = ref('')
const authMode = ref<'signin' | 'signup'>('signin')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)

function selectAuthMode(mode: 'signin' | 'signup') {
  authMode.value = mode
  emailAuthNotice.value = ''
}

function submitEmailAuth() {
  emailAuthNotice.value = 'Email/password authentication is not enabled yet. Please use Continue with Google to sign in.'
}

const loginWithGoogle = () => {
  errorMessage.value = ''

  if (!config.public.googleClientId) {
    errorMessage.value = 'Google sign-in is not configured.'
    return
  }

  if (!window.google?.accounts.oauth2) {
    errorMessage.value = 'Google sign-in is still loading. Please try again.'
    return
  }

  isLoading.value = true
  const client = window.google.accounts.oauth2.initTokenClient({
    client_id: config.public.googleClientId,
    scope: 'openid email profile',
    callback: async (response) => {
      if (!response.access_token) {
        isLoading.value = false
        errorMessage.value = response.error_description || 'Google sign-in was cancelled.'
        return
      }

      try {
        const userInfo = await $fetch(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`
            }
          }
        )

        localStorage.setItem('google_user', JSON.stringify(userInfo))
        localStorage.removeItem('google_token')
        authCookie.value = '1'
        await navigateTo('/discover')
      } catch {
        errorMessage.value = 'Unable to retrieve your Google profile. Please try again.'
      } finally {
        isLoading.value = false
      }
    }
  })

  client.requestAccessToken()
}
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 400px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #171a23;
}

.login-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: -0.04em;
}

.login-brand strong {
  color: #f6b93b;
}

.login-title {
  margin-top: 20px;
  color: white;
  font-size: 1.55rem;
  font-weight: 750;
  text-align: center;
}

.auth-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 0 16px;
  color: #858b99;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.auth-divider::before,
.auth-divider::after {
  height: 1px;
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  content: '';
}

.auth-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.email-auth-form {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

</style>
