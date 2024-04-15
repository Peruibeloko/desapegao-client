// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt'
  ],
  app: {
    baseURL: '/desapegao-client',
    head: {
      title: 'Desapegão',
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: 'favicon.ico'
        }
      ]
    }
  },
  devtools: {
    enabled: false
  },
  nitro: {
    prerender: {
      ignore: ['/review', '/error']
    }
  }
});
