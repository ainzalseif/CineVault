<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="400" class="pa-6 rounded-xl">
      <v-card-title class="text-center text-h5">
        Welcome to CineVault
      </v-card-title>
      <v-card-text>
        <p class="text-center text-medium-emphasis mb-5">
          Sign in to explore movies and save your watchlist.
        </p>
        <v-alert v-if="errorMessage" type="error" variant="tonal" class="mb-4">
          {{ errorMessage }}
        </v-alert>
        <v-btn
          block
          color="primary"
          size="large"
          prepend-icon="mdi-google"
          :loading="isLoading"
          :disabled="isLoading"
          @click="loginWithGoogle"
        >
          Sign in with Google
        </v-btn>
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
        localStorage.setItem('google_token', response.access_token)
        authCookie.value = '1'
        await navigateTo('/')
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
