import { defineNuxtConfig } from 'nuxt'
import localtunnel from '..'

export default defineNuxtConfig({
  modules: [
    localtunnel
  ],
  localtunnel: {
    port: 3000
  }
})
