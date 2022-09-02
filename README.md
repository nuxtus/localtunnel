# Nuxt Localtunnel

A Nuxt module for automatically running [localtunnnel](https://github.com/localtunnel/localtunnel) to externally expose your development instance of Nuxt to the outside world.

**Allows full configuration of all localtunnel configuration options including https**

## Installation

```bash
npm install @nuxtus/nuxt-localtunnel
```

Edit your nuxt.config.ts and add the @nuxtus/nuxt-localtunnel module:

```ts
modules: [
  '@nuxtus/nuxt-localtunnel'
],
localtunnel: {} // Localtunnel config options go here (see below)
```

Then start Nuxt as normal `npm run dev`, you will be given an extra (external URL to reach your development site).

## Config

All localtunnel configuration options are accepted via the `localtunnel` property of the `nuxt.config.ts` file:

- `port` (number) The local port number to expose through localtunnel.
- `subdomain` (string) Request a specific subdomain on the proxy server. **Note** You may not actually receive this name depending on availability.
- `host` (string) URL for the upstream proxy server. Defaults to `https://localtunnel.me`.
- `local_host` (string) Proxy to this hostname instead of `localhost`. This will also cause the `Host` header to be re-written to this value in proxied requests.
- `local_https` (boolean) Enable tunneling to local HTTPS server.
- `local_cert` (string) Path to certificate PEM file for local HTTPS server.
- `local_key` (string) Path to certificate key file for local HTTPS server.
- `local_ca` (string) Path to certificate authority file for self-signed certificates.
- `allow_invalid_cert` (boolean) Disable certificate checks for your local HTTPS server (ignore cert/key/ca options).

Refer to [tls.createSecureContext](https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options) for details on the certificate options.

## Development

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.
