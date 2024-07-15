<template>
  <section :class="['slider-logos', { 'no-pb': noPaddingBottom }]">
    <div class="container">
      <h2 class="t-h4 slider-logos__title" v-if="title">
        {{ title }}
      </h2>

      <div class="js-sb" @click.prevent.capture="onScrollBoosterClick">
        <ul class="slider-logos__list">
          <li v-for="logo in logos" :key="logo">
            <div class="logo-card">
              <img class="logo-img" :src="logo" alt="#" />
            </div>
          </li>
        </ul>
      </div>

      <div class="arrows">
        <button class="arrow-btn" type="button" @click="onPrevClick">
          <svg-icon name="slider-arrow"></svg-icon>
        </button>
        <button class="arrow-btn" type="button" @click="onNextClick">
          <svg-icon name="slider-arrow"></svg-icon>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import scrollbooster from "~/mixins/scrollbooster";

export default {
  mixins: [scrollbooster],
  props: {
    title: { type: String, required: false },
    logos: { type: Array, required: true },
    noPaddingBottom: { type: Boolean, required: false }
  },
  mounted() {
    this.initScrollBooster();
  },
  methods: {
    onPrevClick() {
      const sb = this.scrollBooster.instance;
      const pos = this.scrollBooster.payload.position;
      if (!sb || !pos) return;

      const cardWidth = window.innerWidth - 24 * 2 + 6;
      sb.scrollTo({ x: Math.max(pos.x - cardWidth, 0), y: 0 });
    },
    onNextClick() {
      const sb = this.scrollBooster.instance;
      const pos = this.scrollBooster.payload.position;
      const edgeX = sb.edgeX.from;
      const max = edgeX < 0 ? -1 * edgeX : edgeX;

      const cardWidth = window.innerWidth - 24 * 2 + 6;
      const x = Math.min(pos.x + cardWidth, max);

      if (!sb || !pos) return;
      sb.scrollTo({ x, y: 0 });
    }
  }
};
</script>

<style lang="sass" scoped>
.slider-logos
  max-width: 100%
  overflow: hidden
  padding-bottom: 120px
  @media (max-width: $tab)
    padding-bottom: 80px

.no-pb
  padding-bottom: 0

.slider-logos__title
  margin-bottom: 48px
  @media (max-width: $tab)
    margin-bottom: 40px

.slider-logos__list
  display: flex
  align-items: flex-start

.slider-logos__list > li
  @media (max-width: $mob)
    min-width: calc((100vw - #{$unit-2}) - 6px)
    width: calc((100vw - #{$unit-2}) - 6px)

  &:not(:last-child)
    margin-right: 32px
    @media (max-width: $tab)
      margin-right: 12px


.logo-card
  min-height: 325px
  padding: 0 120px
  background: var(--sec-c)
  border-radius: 18px

  display: flex
  align-items: center
  justify-content: center

  @media (max-width: $tab)
    min-height: 192px
    padding: 0 16px

  @media (max-width: $mob)
    width: 100%

.logo-img
  display: block
  width: 315px
  height: auto

  @media (max-width: $tab)
    width: 298px
    max-height: 104px
    object-fit: contain

  @media (max-width: $mob)
    max-width: calc(100% - 32px)

.arrows
  margin-top: 16px
  display: none
  align-items: center
  justify-content: space-between

  @media (max-width: $mob)
    display: flex

.arrow-btn
  display: flex
  align-items: center
  justify-content: center

  &:last-child svg
    transform: scaleX(-1)

  svg
    width: 40px
</style>
