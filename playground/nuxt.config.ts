import localtunnel from '../src/module'

export default defineNuxtConfig({
  modules: [
    localtunnel
  ],
  localtunnel: {
    port: 3000
  }
})
