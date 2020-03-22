<template>
  <section class="popular-tours">
    <div class="popular-tours__container">
      <div class="popular-tours__info">
        <h2 v-if="title" class="t-h3" data-animate="fade">{{ title }}</h2>
        <p v-if="text" data-animate="fade">{{ text }}</p>
        <BaseButton classScale isLink :to="$cityLocalePath('/tours')">{{
          $t('main.toursButton')
        }}</BaseButton>
      </div>

      <div class="popular-tours__slider" v-if="tours && tours.length > 0">
        <div class="js-sb" @click.prevent.capture="onScrollBoosterClick">
          <ul class="popular-tours__list">
            <li v-for="tour in tours" :key="tour.sys.id">
              <TourCard :tour="tour" />
            </li>
          </ul>
        </div>
      </div>

      <div class="popular-tours__btn-mob">
        <BaseButton classScale isLink :to="$cityLocalePath('/tours')">{{
          $t('main.toursButton')
        }}</BaseButton>
      </div>
    </div>
  </section>
</template>

<script>
import TourCard from '~/components/TourCard'
import scrollbooster from '~/mixins/scrollbooster'
import animate from '~/mixins/animate'

export default {
  mixins: [scrollbooster, animate],
  components: {
    TourCard
  },
  props: {
    title: { type: String, required: true },
    text: { type: String, required: false },
    tours: { type: Array, required: true }
  },
  mounted() {
    this.initScrollBooster()
  }
}
</script>


<style lang="sass" scoped>
.popular-tours
  max-width: 100%
  overflow: hidden
  padding: 144px 0
  @media (max-width: $tab)
    padding: 64px 0

.popular-tours__container
  overflow: hidden
  display: flex
  align-items: flex-start
  @media (min-width: $tab + 1)
    padding-left: $unit

  @media (max-width: $tab)
    flex-direction: column

.popular-tours__info
  @media (max-width: $tab)
    padding-left: $unit
    padding-right: $unit

  @media (min-width: $tab + 1)
    min-width: mix(3)
    width: mix(3)
    padding-right: mix(1)

.popular-tours__slider
  overflow: hidden
  padding-right: $unit

  @media (min-width: $tab + 1)
    width: unit-plus(column-spans(9))

  @media (max-width: $tab)
    max-width: 100%
    padding-left: $unit
    margin-bottom: 40px

.popular-tours__info h2
  margin-bottom: 24px

.popular-tours__info p
  margin-bottom: 40px

  @media (max-width: $tab)
    margin-bottom: 48px

  @media (max-width: $tab) and (min-width: $mob + 1)
    max-width: 80%

.popular-tours__info .btn
  @media (max-width: $tab)
    display: none

.popular-tours__btn-mob
  margin-left: $unit

  @media (min-width: $tab + 1)
    display: none

.popular-tours__list
  display: flex
  align-items: flex-start

.popular-tours__list > li
  min-width: 16.145vw
  width: 16.145vw

  @media (max-width: 1240px)
    min-width: 200px
    width: 200px

  &:not(:last-child)
    margin-right: gutters(1)
    @media (max-width: $mob)
      margin-right: 12px

  @media (max-width: $mob)
    min-width: calc((100vw - #{$unit-2}) / 2 - 6px)
    width: calc((100vw - #{$unit-2}) / 2 - 6px)
</style>