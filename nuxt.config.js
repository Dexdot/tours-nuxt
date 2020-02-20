const baseTitle = 'Some base title';
const baseDescription = 'Some base description';

module.exports = {
  server: {
    port: 3001,
    host: '127.0.0.1'
  },
  /*
   ** Headers of the page
   */
  head: {
    title: baseTitle,
    titleTemplate: '%s | projectName',
    meta: [
      // Default
      { charset: 'utf-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0' },
      { name: 'author', content: 'dexdot' },
      { hid: 'description', name: 'description', content: baseDescription },
      // OG
      { property: 'og:locale', content: 'ru_RU' },
      { property: 'og:type', content: 'website' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: baseTitle
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: baseDescription
      },
      { property: 'og:url', content: 'https://' },
      { property: 'og:site_name', content: 'some site name' },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '/favicon/projectName.png'
      },
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: baseDescription
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'projectName'
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: '/favicon/projectName.png'
      },
      // Favico
      {
        name: 'msapplication-TileColor',
        content: '#000000'
      },
      {
        name: 'msapplication-TileImage',
        content: '/favicon/apple-touch-icon.png'
      },
      {
        name: 'theme-color',
        content: '#ffffff'
      },
      {
        name: 'msapplication-config',
        content: '/favicon/browserconfig.xml'
      }
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicon/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon/favicon-16x16.png'
      },
      {
        rel: 'manifest',
        href: '/favicon/site.webmanifest'
      },
      {
        rel: 'mask-icon',
        href: '/favicon/safari-pinned-tab.svg',
        color: '#000000'
      }
    ]
  },
  /*
   ** Modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/redirect-module'
  ],
  /*
   ** Redirects
   */
  redirect: [],
  /*
   ** Customize the progress bar color
   */
  loading: { color: '#FDC616' },
  /**
   * style-resources
   */
  styleResources: {
    sass: ['./assets/sass/_utils.sass']
  },
  // Plugins
  plugins: [
    { src: '~/plugins/global' },
    { src: '~/plugins/inputmask', ssr: false },
    {
      src: '~/plugins/locoscroll',
      mode: 'client'
    }
  ],
  /**
   * Css / Sass / scss
   */
  css: [
    'loco-scroll/dist/locomotive-scroll.min.css',
    { src: '~assets/sass/main.sass', lang: 'sass' }
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }

      // Source maps
      if (isDev) {
        config.devtool = isClient ? 'source-map' : 'inline-source-map';
      }
    }
  },
  buildModules: [
    // Simple usage
    '@nuxtjs/dotenv'
  ]
};
