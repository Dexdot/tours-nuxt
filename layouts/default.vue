<template>
  <div id="app">
    <Intro @complete="introCompleted = true" />

    <Menu :active="isMenuActive" />
    <Header
      :isMenuActive="isMenuActive"
      :isCallbackActive="isCallbackActive"
      :transparent="isHeaderTransparent"
    />

    <div class="page-container">
      <nuxt ref="page" />
    </div>

    <Footer />

    <CreditsModal :active="isCreditsActive" />
    <BukzaModal :key="$store.getters['dom/bukzaID']" :active="isBukzaActive" />
    <CallbackModal :active="isCallbackActive" />

    <no-ssr>
      <!-- Yandex.Metrika counter -->
      <script type="text/javascript">
        (function(m, e, t, r, i, k, a) {
          m[i] =
            m[i] ||
            function() {
              (m[i].a = m[i].a || []).push(arguments);
            };
          m[i].l = 1 * new Date();
          (k = e.createElement(t)),
            (a = e.getElementsByTagName(t)[0]),
            (k.async = 1),
            (k.src = r),
            a.parentNode.insertBefore(k, a);
        })(
          window,
          document,
          "script",
          "https://mc.yandex.ru/metrika/tag.js",
          "ym"
        );

        ym(88239579, "init", {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true
        });
      </script>
      <noscript
        ><div>
          <img
            src="https://mc.yandex.ru/watch/88239579"
            style="position:absolute; left:-9999px;"
            alt=""
          /></div
      ></noscript>
      <!-- /Yandex.Metrika counter -->

      <!-- Pixel -->
      <script type="text/javascript">
        !(function() {
          var t = document.createElement("script");
          (t.type = "text/javascript"),
            (t.async = !0),
            (t.src = "https://vk.com/js/api/openapi.js?169"),
            (t.onload = function() {
              VK.Retargeting.Init("VK-RTRG-1345000-8rLMa"),
                VK.Retargeting.Hit();
            }),
            document.head.appendChild(t);
        })();
      </script>
      <noscript
        ><img
          src="https://vk.com/rtrg?p=VK-RTRG-1345000-8rLMa"
          style="position:fixed; left:-999px;"
          alt=""
      /></noscript>
      <!-- /Pixel -->
    </no-ssr>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Menu from "~/components/Menu";
import Intro from "~/components/Intro";
import CreditsModal from "~/components/CreditsModal";
import BukzaModal from "~/components/BukzaModal";
import CallbackModal from "~/components/CallbackModal";

import initCSSProps from "~/assets/scripts/css-props";
import { detectDevices } from "~/assets/scripts/detect";

export default {
  components: {
    Header,
    Footer,
    Menu,
    Intro,
    CreditsModal,
    BukzaModal,
    CallbackModal
  },
  data: () => ({
    detect: {},
    introCompleted: false,
    visited: false,
    prevScroll: 0,
    dir: {}
  }),
  computed: {
    ...mapGetters({
      isMenuActive: "dom/isMenuActive",
      isCreditsActive: "dom/isCreditsActive",
      isBukzaActive: "dom/isBukzaActive",
      isCallbackActive: "dom/isCallbackActive",
      isHeaderTransparent: "dom/isHeaderTransparent"
    }),
    page() {
      return this.$refs.page && this.$refs.page.$children[0];
    }
  },
  mounted() {
    if (document.readyState === "complete" && !this.introCompleted)
      this.introCompleted = true;

    initCSSProps();
    this.detect = detectDevices();

    this.visited = JSON.parse(localStorage.visited || false);
    if (!localStorage.visited) {
      localStorage.visited = JSON.stringify(true);
    }
  },
  watch: {
    $route(to, from) {
      this.dir = { to, from };

      if (this.isMenuActive) this.$store.dispatch("dom/toggleMenu");
    }
  }
};
</script>
