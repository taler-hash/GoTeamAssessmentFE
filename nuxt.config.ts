// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import Aura from '@primeuix/themes/aura';

export default defineNuxtConfig({
  colorMode: {
    preference: 'light',
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/eslint', '@primevue/nuxt-module'],
  primevue: {
    options: {
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: false
            }
        }
     }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})