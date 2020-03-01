<template>
  <section class="slider-tours">
    <div class="container">
      <h2 class="t-h4 slider-tours__title" v-if="title">
        {{ title }}
      </h2>

      <div class="js-sb" @click.prevent.capture="onScrollBoosterClick">
        <ul class="slider-tours__list">
          <li v-for="tour in tours" :key="tour.sys.id">
            <TourCard :tour="tour" />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import TourCard from '~/components/TourCard'
import scrollbooster from '~/mixins/scrollbooster'

export default {
  mixins: [scrollbooster],
  components: {
    TourCard
  },
  props: {
    title: { type: String, required: false },
    tours: { type: Array, required: true }
  },
  mounted() {
    this.initScrollBooster()
  }
}
</script>

<style lang="sass" scoped>
.slider-tours
  max-width: 100%
  overflow: hidden
  padding: 120px 0
  @media (max-width: $tab)
    padding: 80px 0

.slider-tours__title
  margin-bottom: 48px
  @media (max-width: $tab)
    margin-bottom: 40px

.slider-tours__list
  display: flex
  align-items: flex-start

.slider-tours__list > li
  min-width: 200px
  width: column-spans(2)

  &:not(:last-child)
    margin-right: gutters(1)
    @media (max-width: $mob)
      margin-right: 12px

  @media (max-width: $mob)
    min-width: calc((100vw - #{$unit-2}) / 2 - 6px)
    width: calc((100vw - #{$unit-2}) / 2 - 6px)
</style>
