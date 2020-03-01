<template>
  <div class="slider-nav">
    <button
      class="slider-nav__btn slider-nav__btn--prev u-center"
      @click="$emit('prev-click')"
    >
      <svg-icon name="polygon"></svg-icon>
    </button>
    <button
      class="slider-nav__btn slider-nav__btn--next u-center"
      @click="$emit('next-click')"
    >
      <svg-icon name="polygon"></svg-icon>
    </button>
  </div>
</template>

<style lang="sass" scoped>
.slider-nav
  display: flex
  align-items: center
  height: 80px
  padding: 16px 0

  width: 100%

  border-top: 1px solid rgba($black, 0.1)

.slider-nav__btn
  width: 50%
  height: 48px
  color: $black

  position: relative

.slider-nav__btn .i-polygon
  width: 12px
  height: 12px

.slider-nav__btn--prev .i-polygon
  transform: scale(-1, 1)

.slider-nav__btn--prev::before
  content: ''
  position: absolute
  top: 0
  right: 0

  width: 1px
  height: 100%

  background: rgba($black, 0.1)
</style>
