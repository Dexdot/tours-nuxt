<template>
  <section class="inst-section">
    <div class="inst-section__mob-info">
      <div class="container">
        <h2 class="t-h3 inst-info__title">{{ data.title }}</h2>
        <p>{{ data.text }}</p>
      </div>
    </div>

    <div class="inst-list-container js-sb">
      <ul class="inst-list" @click.prevent.capture="onScrollBoosterClick">
        <li class="inst-li" v-for="(img, i) in data.images" :key="img.sys.id">
          <div v-if="i === 1" class="inst-info t-tac">
            <div class="inst-info__inner u-center u-flex-col">
              <h2 class="t-h3 inst-info__title" data-animate="fade">
                {{ data.title }}
              </h2>
              <p data-animate="fade">{{ data.text }}</p>
              <BaseButton isLink classScale classLight :to="data.buttonUrl">{{
                data.buttonText
              }}</BaseButton>
            </div>
          </div>

          <a
            v-else
            :href="data.buttonUrl"
            class="inst-block img"
            target="_blank"
            data-animate="fade"
          >
            <BaseImage class="img__i" :img="img" :alt="img.fields.title" />
            <svg-icon name="inst"></svg-icon>
          </a>
        </li>
      </ul>

      <div class="inst-list-container__btn t-tac">
        <BaseButton isLink classScale classLight :to="data.buttonUrl">{{
          data.buttonText
        }}</BaseButton>
      </div>
    </div>
  </section>
</template>

<script>
import scrollbooster from "~/mixins/scrollbooster";
import animate from "~/mixins/animate";

export default {
  mixins: [scrollbooster, animate],
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.initScrollBooster();
  }
};
</script>

<style lang="sass" scoped>
.inst-section
  overflow: hidden
  position: relative
  padding-top: 120px
  padding-bottom: 120px

  @media (max-width: $tab)
    padding-top: 64px
    padding-bottom: 48px

  &::before
    content: ''
    z-index: -1
    position: absolute
    bottom: 0
    left: 0

    width: 100vw
    height: 240px

    background: var(--sec-c)

    @media (max-width: $tab)
      height: 224px

.inst-list-container
  margin: 0 auto
  max-width: column-spans(12)

  @media (max-width: $tab)
    max-width: calc(100% - #{$unit} * 2)

.inst-list-container__btn
  margin: 0 auto

  @media (min-width: $tab + 1)
    display: none

.inst-list-container.js-sb .inst-list
  @media (max-width: $tab)
    will-change: transform

  @media (min-width: $tab + 1)
    transform: translateX(0) !important
    cursor: initial !important

.inst-list
  display: flex

  @media (min-width: $tab + 1)
    flex-wrap: wrap
    margin-top: minus(gutters(1))
    margin-left: minus(gutters(1))

  @media (max-width: $tab)
    margin-bottom: 40px

.inst-li
  @media (min-width: $tab + 1)
    margin-top: gutters(1)
    margin-left: gutters(1)

  &:not(:first-child)
    @media (max-width: $tab)
      margin-left: 16px

  // Info block
  &:nth-child(2)
    @media (max-width: $tab)
      display: none

.inst-block
  @media (min-width: $tab + 1)
    width: column-spans(3)

  @media (max-width: $tab)
    width: 216px

.inst-block
  overflow: hidden
  display: block
  padding-bottom: 100%

.inst-block img
  transition: transform 2s ease
  transform-origin: 50% 50%

.inst-block:hover img
  transform: scale(1.15)

.inst-block .i-inst
  color: #fff
  position: absolute
  top: 24px
  left: 24px

  width: 20px
  height: 20px

  @media (max-width: $tab)
    top: 16px
    left: 16px

.inst-info
  @media (min-width: $tab + 1)
    height: 100%
    width: column-spans(6)

.inst-info__inner
  margin: 0 auto

  @media (min-width: $tab + 1)
    height: 100%

  @media (min-width: $tab + 1) and (max-width: 1300px)
    max-width: calc(100% - 32px)

  @media (min-width: 1301px)
    max-width: 72%

.inst-info__title
  margin-bottom: 16px
  @media (max-width: $mob)
    margin-bottom: 24px

  &, &.t-h3
    line-height: 1

.inst-info p
  max-width: 32em
  margin-bottom: 40px
  @media (max-width: 1300px)
    margin-bottom: 24px

.inst-section__mob-info
  margin-bottom: 40px
  @media (min-width: $tab + 1)
    display: none
</style>
