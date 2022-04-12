const baseTitle = "Пешеход Тур";
const baseDescription = "Пешеходные туры в Санкт-Петербурге и Таллине";

const removeDimensions = require("svgo/plugins/removeDimensions");
const removeViewBox = require("svgo/plugins/removeViewBox");

function svgoPlugins() {
  removeViewBox.active = false;
  removeDimensions.active = true;
  return [
    removeDimensions,
    removeViewBox,
    {
      removeAttrs: {
        attrs: ["width", "height"]
      }
    },
    { removeTitle: true },
    { convertColors: { currentColor: true } }
  ];
}

const i18n = [
  "nuxt-i18n",
  {
    locales: [
      {
        code: "ru",
        file: "ru.js"
      }
      // LANGSWITCH
      // {
      //   code: "en",
      //   file: "en.js"
      // }
    ],
    defaultLocale: "ru",
    vueI18n: {
      fallbackLocale: "ru"
    },
    lazy: true,
    langDir: "lang/"
  }
];

const getRedirects = (from, to) => [
  {
    from: `^${from}`,
    to: `${to}`
  },
  {
    from: `^/spb${from}`,
    to: `/spb${to}`
  },
  {
    from: `^/tallinn${from}`,
    to: `/tallinn${to}`
  }
  // LANGSWITCH
  // {
  //   from: `^/en/tallinn${from}`,
  //   to: `/en/tallinn${to}`
  // }
];

const redirect = [
  // Tours
  ...getRedirects("/tours-cal", "/tours"),
  ...getRedirects("/individualnye-ekskursii", "/tours/individual"),
  ...getRedirects("/obzornye-ekskursii", "/tours/group"),
  ...getRedirects("/tour-category/obzornye-ekskursii/", "/tours/group"),
  // Tour
  ...getRedirects(
    "/tour/obzornaya-peshehodnaya-ekskursiya-po-sankt-peterburgu",
    "/tour/obzornaya-ekskursiya-gulyaj-kak-peterburzhec"
  ),
  ...getRedirects(
    "/tour/individualnaya-obzornaya-po-peterburgu",
    "/tour/individual'naya-obzornaya-excursia-po-Petersburgu"
  ),
  ...getRedirects(
    "/tour/detskaya_excursia_sankt-peterburg",
    "/tour/detskaya-excursia-po-peterburgu"
  ),
  // Article
  ...getRedirects(
    "/za-chto-peterburzhtsy-lyubyat-petra-pervogo",
    "/blog/za-chto-peterburzhtsy-lyubyat-petra-pervogo"
  ),
  ...getRedirects(
    "/kak-pereimenovyvali-peterburg",
    "/blog/kak-pereimenovyvali-peterburg"
  ),
  ...getRedirects(
    "/odevatsa-kak-peterburzhec",
    "/blog/odevatsya-kak-peterburzhec"
  ),
  // Policy
  ...getRedirects("/policy", "/info/policy"),
  ...getRedirects("/privacy-policy", "/info/policy")
];

module.exports = {
  /*
   ** Redirects
   */
  redirect,
  /*
   ** Server
   */
  server: {
    port: 3001,
    host: "127.0.0.1"
  },
  /*
   ** Headers of the page
   */
  head: {
    title: baseTitle,
    titleTemplate: "%s | Пешеход Тур",
    meta: [
      // Default
      { charset: "utf-8" },
      { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
      { name: "viewport", content: "width=device-width,initial-scale=1.0" },
      { hid: "description", name: "description", content: baseDescription },
      // OG
      { property: "og:locale", content: "ru_RU" },
      { property: "og:type", content: "website" },
      {
        hid: "og:title",
        property: "og:title",
        content: baseTitle
      },
      {
        hid: "og:description",
        property: "og:description",
        content: baseDescription
      },
      { property: "og:url", content: "https://peshehodtour.ru" },
      { property: "og:site_name", content: "Пешеход Тур" },
      {
        hid: "og:image",
        property: "og:image",
        content: "/favicon/apple-touch-icon.png"
      },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: baseDescription
      },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: baseTitle
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: "/favicon/apple-touch-icon.png"
      },
      // Favicons
      {
        name: "msapplication-TileColor",
        content: "#4aad7b"
      },
      {
        name: "msapplication-TileImage",
        content: "/favicon/apple-touch-icon.png"
      },
      {
        name: "theme-color",
        content: "#ffffff"
      },
      {
        name: "msapplication-config",
        content: "/favicon/browserconfig.xml"
      }
    ],
    link: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/favicon/apple-touch-icon.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon/favicon-16x16.png"
      },
      {
        rel: "manifest",
        href: "/favicon/site.webmanifest"
      },
      {
        rel: "mask-icon",
        href: "/favicon/safari-pinned-tab.svg",
        color: "#4aad7b"
      },
      {
        rel: "shortcut-icon",
        href: "/favicon/favicon.ico"
      }
    ]
  },
  /*
   ** Modules
   */
  modules: [
    i18n,
    "@nuxtjs/axios",
    "@nuxtjs/style-resources",
    "@nuxtjs/redirect-module",
    "dex-nuxt-svg-sprite"
    // [
    //   "@nuxtjs/yandex-metrika",
    //   {
    //     id: "88239579",
    //     webvisor: true,
    //     clickmap: true,
    //     trackLinks: true,
    //     accurateTrackBounce: true
    //   }
    // ],
    // [
    //   "nuxt-vk-rtrg",
    //   {
    //     id: "VK-RTRG-474822-9nKyq"
    //   }
    // ]
  ],
  /*
   ** SVG Sprite
   */
  svgSprite: {
    elementClass: "",
    spriteClassPrefix: "i-",
    svgoConfig() {
      return {
        plugins: svgoPlugins()
      };
    }
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#4AAD7B" },
  router: {
    middleware: "city"
  },
  serverMiddleware: ["~/api/nodemailer"],
  // Plugins
  plugins: [
    "~/plugins/city-locale-path",
    "~/plugins/i18n",
    "~/plugins/global",
    { src: "~/plugins/inputmask", ssr: false },
    { src: "~/plugins/scrollbooster", mode: "client" },
    { src: "~/plugins/ymapPlugin.js", mode: "client" }
  ],
  /**
   * style-resources
   */
  styleResources: {
    sass: ["./assets/sass/_utils.sass"]
  },
  /**
   * Css / Sass / scss
   */
  css: [{ src: "~assets/sass/main.sass", lang: "sass" }],
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
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }

      // Source maps
      if (isDev) {
        config.devtool = isClient ? "source-map" : "inline-source-map";
      }
    }
  },
  buildModules: [
    // Simple usage
    "@nuxtjs/dotenv"
  ]
};
