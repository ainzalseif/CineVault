import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      googleClientId: ''
    }
  },

  build: {
    transpile: ['vuetify'],
  },
  vite: {
    plugins: [
      
      vuetify({ autoImport: true }),
    ],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})