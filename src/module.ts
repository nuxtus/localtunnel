import QRCode from "qrcode";
import chalk from "chalk";
import { defineNuxtModule } from "@nuxt/kit";
import localtunnel from "localtunnel";

export interface ModuleOptions {
  subdomain?: string;
  port?: number;
  host?: string;
  local_host?: string;
  local_https?: boolean;
  local_cert?: string;
  local_key?: string;
  local_ca?: string;
  allow_invalid_cert?: boolean;
  display_qr?: boolean;
}

let tunnel

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxtus/nuxt-localtunnel',
    configKey: 'localtunnel',
    compatibility: {
      // Semver version of supported nuxt versions
      nuxt: '>=3.0.0'
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
    allow_invalid_cert: true,
    display_qr: false,
  },

  setup (options, nuxt) {
    if (process.env.NODE_ENV === 'production') {
      return
    }
    nuxt.hook('listen', async (nuxt) => {
      const config = {
        host: process.env.LOCALTUNNEL_HOST || options.host,
        port: options.port,
        subdomain: process.env.LOCALTUNNEL_SUBDOMAIN || options.subdomain,
        local_host: options.local_host,
        local_https: options.local_https,
        local_cert: options.local_cert,
        local_key: options.local_key,
        local_ca: options.local_ca,
        allow_invalid_cert: options.allow_invalid_cert
      };
      tunnel = await localtunnel(config)

      if (options.display_qr) {
        try {
          const qr = await QRCode.toString(tunnel.url, {
            type: 'terminal',
            small: true,
          });

          console.log(qr);
        } catch (e) {
          console.error('Failed to create QR code:', e);
        }
      }

      // the assigned public url for your tunnel
      // i.e. https://abcdefgjhij.localtunnel.me
      // eslint-disable-next-line no-console
      console.info(`  > External: ${chalk.underline.cyan(tunnel.url)}\n`)
    })
    nuxt.hook('close', async (nuxt) => {
      if (tunnel) {
        await tunnel.close()
      }
    })
  }
})
