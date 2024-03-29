// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/desapegao-client'
  },
  devtools: {
    enabled: false
  },
  nitro: {
    prerender: {
      ignore: ['/review']
    }
  }
});
