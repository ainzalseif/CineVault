// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'cineVaultDark',
      themes: {
        cineVaultDark: {
          dark: true,
          colors: {
            background: '#0f1118',
            surface: '#191c25',
            primary: '#f6b93b',
            secondary: '#a4a8b4',
          },
        },
      },
    },
  })
  app.vueApp.use(vuetify)
})
    