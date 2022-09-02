import { addPlugin, defineNuxtModule } from '@nuxt/kit'

import chalk from 'chalk'
import localtunnel from 'localtunnel'

export interface ModuleOptions {
  subdomain?: string,
  port?: number,
  host?: string,
  local_host?: string,
  local_https?: boolean,
  local_cert?: string,
  local_key?: string,
  local_ca?: string,
  allow_invalid_cert?: boolean
}

let tunnel

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtus/nuxt-localtunnel',
    configKey: 'localtunnel',
    compatibility: {
      // Semver version of supported nuxt versions
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    host: undefined,
    subdomain: undefined,
    port: 3000,
    local_host: undefined,
    local_https: false,
    local_cert: undefined,
    local_key: undefined,
    local_ca: undefined,
    allow_invalid_cert: true
  },

  setup (options, nuxt) {
    if (process.env.NODE_ENV === 'production') {
      return
    }
    nuxt.hook('listen', async (nuxt) => {
      const config = {
        host: options.host,
        port: options.port,
        subdomain: options.subdomain
      }
      tunnel = await localtunnel(config)
      // the assigned public url for your tunnel
      // i.e. https://abcdefgjhij.localtunnel.me
      // eslint-disable-next-line no-console
      console.log(`  > External: ${chalk.underline.cyan(tunnel.url)}\n`)
    })
    nuxt.hook('close', async (nuxt) => {
      await tunnel.close()
    })
  }
})
