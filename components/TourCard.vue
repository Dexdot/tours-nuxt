<template>
  <div class="tour-li">
    <div class="tour-li__img img">
      <nuxt-link :to="$cityLocalePath(`/tour/${tour.fields.slug}`)">
        <BaseImage
          class="img__i"
          :img="tour.fields.previewImage"
          :alt="tour.fields.previewImage.fields.title"
        />
      </nuxt-link>
      <BaseButton
        classExpand
        @click="$store.dispatch('dom/showBukza', tour.fields.bukzaId)"
        >{{ $t('chooseTour') }}</BaseButton
      >
    </div>

    <nuxt-link
      class="t-h6 tour-li__title"
      :to="$cityLocalePath(`/tour/${tour.fields.slug}`)"
    >
      {{ tour.fields.title }}
    </nuxt-link>

    <ul class="tour-li__list">
      <li>
        <svg-icon name="people"></svg-icon>
        <p>{{ tour.fields.numberOfPeople }}</p>
      </li>
      <li>
        <svg-icon name="clock"></svg-icon>
        <p>{{ tour.fields.duration }}</p>
      </li>
      <li>
        <svg-icon name="pin"></svg-icon>
        <p>{{ tour.fields.venue }}</p>
      </li>
    </ul>

    <b class="tour-li__price">
      {{ `${$t('tour.priceFrom')} ${tour.fields.price}` }}
    </b>
  </div>
</template>

<script>
export default {
  props: {
    tour: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
.tour-li
  width: 100%

.tour-li__img
  border-radius: 12px

  -webkit-mask-image: -webkit-radial-gradient(white, black)
  overflow: hidden
  margin-bottom: 24px
  padding-bottom: 155%

  /deep/ .btn
    cursor: pointer
    
    position: absolute
    bottom: 16px
    right: 16px

    @media (max-width: $mob)
      bottom: 12px
      right: 12px

.tour-li__img img
  transition: transform 2s ease
  transform-origin: 50% 50%

.tour-li:hover .tour-li__img img
  transform: scale(1.15)
  
.tour-li__title
  display: block
  margin-bottom: 16px

.tour-li__list
  margin-bottom: 24px

  opacity: 0.4
  line-height: 1.2

  @media (max-width: $mob)
    margin-bottom: 16px
    font-size: 12px

  li
    display: flex
    align-items: flex-start

  li:not(:last-child)
    margin-bottom: 8px

  svg
    margin-right: 12px
    min-width: 16px
    width: 16px
    height: 16px

    @media (max-width: $mob)
      margin-right: 8px

.tour-li__price
  +mont(b)
  line-height: 1
  font-size: 16px
</style>