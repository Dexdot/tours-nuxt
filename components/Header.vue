<template>
  <header
    :class="[
      'header',
      {
        'header--callback-active': isCallbackActive,
        'header--menu-active': isMenuActive,
        'header--uphidden': isUphidden && animated,
        'header--transparent': isTrasparent,
        'header--fixed': isFixed,
        'header--animated': preAnimated,
        'header--trs': animated
      }
    ]"
  >
    <div class="container" ref="container">
      <div class="header__inner">
        <div class="header__logo-wrap">
          <nuxt-link
            class="header__logo u-center"
            :to="$cityLocalePath('index')"
          >
            <img src="~assets/img/logo.svg" alt="Logo" />
          </nuxt-link>

          <!-- CITYSWITCH -->
          <!-- <button
            @click="isCitiesSelectActive = !isCitiesSelectActive"
            :class="['header__select t-ttu', { active: isCitiesSelectActive }]"
            v-if="
              $route.name &&
                !$route.name.includes('tour-') &&
                !$route.name.includes('blog-slug')
            "
          >
            {{ $t("cities")[city] }}
            <svg-icon name="chevron" />
          </button> -->
        </div>

        <nav class="header__nav">
          <ul>
            <li v-for="link in $t('navLinks')" :key="link.to">
              <nuxt-link class="t-ttu" :to="$cityLocalePath(link.to)">{{
                link.text
              }}</nuxt-link>
            </li>

            <!-- LANGSWITCH -->
            <!-- <li>
              <nuxt-link
                v-if="$i18n.locale === 'ru' && city !== 'spb'"
                :to="switchLocalePath('en')"
                class="t-ttu"
              >
                EN
              </nuxt-link>

              <nuxt-link
                v-if="$i18n.locale === 'en'"
                :to="switchLocalePath('ru')"
                class="t-ttu"
              >
                RU
              </nuxt-link>
            </li> -->
          </ul>
        </nav>

        <div class="header__right">
          <div class="header__contact">
            <a :href="`tel:${general.phoneNumber}`">
              {{ general.phoneText }}
            </a>
            <button @click="$store.dispatch('dom/toggleCallback')">
              {{ $t("orderCall") }}
            </button>
          </div>

          <div class="header__social">
            <SocialList :socialLinks="general.socialLinks" />
          </div>

          <BaseButton classPulse @click="$store.dispatch('dom/showBukza')">{{
            $t("orderTicket")
          }}</BaseButton>
        </div>

        <ButtonBurger
          :active="isMenuActive"
          @click="$store.dispatch('dom/toggleMenu')"
        />
      </div>
    </div>

    <!-- CITYSWITCH -->
    <!-- <ul :class="['header__cities', { active: isCitiesSelectActive }]">
      <li v-for="key in Object.keys($t('cities'))" :key="key">
        <Chipbox small @click="onChipboxClick(key)">{{
          $t("cities")[key]
        }}</Chipbox>
      </li>
    </ul> -->
  </header>
</template>

<script>
import { mapGetters } from "vuex";

import ButtonBurger from "~/ui/ButtonBurger";
import Chipbox from "~/ui/Chipbox";
import SocialList from "~/components/SocialList";

import city from "~/mixins/city";

export default {
  mixins: [city],
  components: {
    ButtonBurger,
    SocialList,
    Chipbox
  },
  props: {
    isCallbackActive: { type: Boolean, default: false },
    isMenuActive: { type: Boolean, default: false },
    transparent: { type: Boolean, default: false }
  },
  data: () => ({
    scrollY: 0,
    dir: "down",
    isMob: false,
    isCitiesSelectActive: false,
    preAnimated: false,
    animated: false
  }),
  computed: {
    ...mapGetters({
      general: "general/data"
    }),
    onTop() {
      return this.scrollY <= 1;
    },
    isUphidden() {
      if (this.onTop) {
        return false;
      } else {
        return this.dir === "down";
      }
    },
    isTrasparent() {
      return this.transparent && this.onTop;
    },
    isFixed() {
      return !this.onTop;
    }
  },
  mounted() {
    this.handleScroll();
    this.handleResize();

    if (document.readyState === "complete") {
      this.animate();
    } else {
      window.addEventListener("load", () => {
        setTimeout(() => {
          this.animate();
        }, 200);
      });
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    animate() {
      this.preAnimated = true;
      setTimeout(() => {
        this.animated = true;
      }, 1000);
    },
    handleScroll() {
      this.onScroll();
      window.addEventListener("scroll", this.onScroll.bind(this));
    },
    handleResize() {
      this.onResize();
      window.addEventListener("resize", this.onResize.bind(this));
    },
    onScroll() {
      let y = window.pageYOffset;
      this.dir = y > this.scrollY ? "down" : "up";
      this.scrollY = y;
    },
    onResize() {
      this.isMob = window.innerWidth <= 1040;
    },
    onChipboxClick(city) {
      this.isCitiesSelectActive = false;
      this.city = city;
    }
  }
};
</script>

<style lang="sass">
\:root
  --header-h: 139px
  @media (max-width: $tab)
    --header-h: 131px
</style>

<style lang="sass" scoped>
.header
  z-index: 5
  position: fixed
  top: 0
  left: 0
  width: 100%

  transition: $trs
  background: $beige-l

  @media (min-width: $tab + 1)
    background: $beige-l

.header
  transition: 1s ease

.header:not(.header--animated)
  transform: translateY(-20%)
  opacity: 0

.header--trs
  transition: $trs

.header--fixed:not(.header--transparent):not(.header--menu-active)
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.16)

.header--menu-active
  box-shadow: unset
  background: 0

.header--uphidden
  @media (max-width: $tab)
    transform: translateY(-101%)

.header--transparent
  background: 0
  color: #fff

  /deep/
    a, svg
      +link(#fff)

    .social a::before
      border-color: #fff

    .burger-icon-top,
    .burger-icon-bottom,
    .burger-icon-last
      &::before, &::after
        background: #fff

.header--callback-active
  @media (min-width: $tab + 1)
    z-index: 6
    background: transparent
    pointer-events: none

  .header__logo-wrap,
  .header__nav,
  .header__social,
  .btn
    @media (min-width: $tab + 1)
      opacity: 0.3

  .header__contact
    @media (min-width: $tab + 1)
      pointer-events: auto

    a, button
      @media (min-width: $tab + 1)
        +link(#fff)

.header__inner
  display: flex
  align-items: center
  padding-top: 24px
  padding-bottom: 16px

  @media (max-width: $tab)
    padding-top: 16px
    align-items: flex-start


// Logo
.header__logo-wrap
  margin-right: 80px
  @media (max-width: 1540px)
    margin-right: 40px

  @media (max-width: 1110px)
    margin-right: 16px

.header__logo img
  display: block
  width: 123px
  height: auto

// Select
.header:not(.header--fixed)
  .header__select,
  .header__cities
    opacity: 0
    pointer-events: none

.header__select
  font-size: 10px
  transition: opacity $trs

  margin-top: 4px
  display: flex
  align-items: center

  .i-chevron
    margin-left: 4px
    width: 8px
    height: 8px
    transform: rotate(90deg)
    transition: $trs

  &.active .i-chevron
    transform: rotate(-90deg)


// Dropdown cities
.header__cities
  position: absolute
  top: 100%
  left: 0

  width: 100%
  height: 48px
  padding: 0 $unit

  display: flex
  align-items: center

  background: $beige-d
  transition: opacity $trs

  &:not(.active)
    opacity: 0
    pointer-events: none

  > li
    margin-right: 4px

  /deep/ .chipbox
    border: 1px solid $black


// Hide on tab/mob
.header__cities,
.header__select,
.header__contact,
.header .btn,
.header__nav
  @media (max-width: $tab)
    display: none


// Nav
.header__nav ul
  display: flex
  align-items: center
  margin-left: -32px
  @media (max-width: 1540px)
    margin-left: -16px

.header__nav li
  margin-left: 32px
  @media (max-width: 1540px)
    margin-left: 16px

  transition: opacity $trs
  &:hover
    opacity: 0.4


// Right
.header__right
  @media (min-width: 1881px)
    width: column-spans(4)

  @media (min-width: 1401px) and (max-width: 1880px)
    width: column-spans(5)

  @media (min-width: 1341px) and (max-width: 1400px)
    width: calc(#{column-spans(5)} + 40px)

  display: flex
  align-items: center
  margin-left: auto

  .btn
    margin-left: auto


// Phone
.header__contact
  margin-right: 24px

  a
    +mont(sb)
    font-size: 16px
    letter-spacing: 0.04em
    line-height: 1
    display: block

    @media (max-width: 1540px)
      font-size: 14px

  button
    font-size: 12px
    opacity: 0.6
    transition: $trs
    &:hover
      opacity: 1


// Social
.header__social
  @media (max-width: 1340px)
    display: none


// Burger
.header .burger
  margin-top: 1px
  margin-left: auto

  @media (min-width: $tab + 1)
    display: none
</style>
