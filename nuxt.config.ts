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
  modules: ['@nuxt/eslint', '@primevue/nuxt-module','nuxt-auth-sanctum'],
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
  sanctum: {
    mode: 'token',
    baseUrl: 'http://localhost/api',
    endpoints: {
      csrf: '/sanctum/csrf-cookie',
      login: '/auth/login',
      logout: '/auth/logout',
      user: '/auth/me'
    }
  },
  runtimeConfig: {
    public: {
      base_api_url: process.env.BASE_API_URL,
    },
  },
})