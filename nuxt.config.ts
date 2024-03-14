// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/sitemap'],
  ssr: true,
  builder: "vite",
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', 'sitemap.xml'],
      ignore: ['/tak', '/konfiguration', '/checkout'],
    },
  },
  sitemap: {
    sources: ['/api/sitemap'],
  },
})
