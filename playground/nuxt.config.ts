import localtunnel from '../src/module'

export default defineNuxtConfig({
  compatibilityDate: '2026-01-16',
  modules: [
    localtunnel
  ],
  localtunnel: {
    port: 3000
  }
})
