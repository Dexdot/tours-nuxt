<template>
  <button
    :class="['burger', { 'burger--light': light, active }]"
    @click="$emit('click')"
  >
    <div class="burger-icon">
      <span class="burger-icon-top"></span>
      <span class="burger-icon-bottom"></span>
    </div>
  </button>
</template>

<script>
export default {
  name: 'ButtonBurger',
  props: {
    light: { type: Boolean, default: false },
    active: { type: Boolean, default: false }
  }
}
</script>

<style lang="sass" scoped>
.burger--light
  .burger-icon-top,
  .burger-icon-bottom
    &::before,
    &::after
      background: #fff

.burger
  height: 24px
  display: flex
  align-items: flex-start
  justify-content: flex-start
  flex-direction: column

  perspective: 200px
  transform: translateZ(0)
  transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)

  &-icon
    position: relative
    width: 24px
    height: 9px

    &-top,
    &-bottom
      display: block
      width: 100%
      height: 2px

      position: absolute
      left: 0

      transform: translateZ(0)
      transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)

      &::before,
      &::after
        content: ''
        position: absolute
        top: 0
        left: 0

        width: 100%
        height: 100%

        background: #000

      &::before
        transform-origin: right
        transform: scaleX(1) translateZ(0)
        transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) 0.2s
      &::after
        transform-origin: left
        transform: scaleX(0) translateZ(0)
        transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)

    &-top
      top: 0
    &-bottom
      bottom: 0
      &::before
        transform-origin: left
      &::after
        transform-origin: right

  &:hover
    .burger-icon
      &-top,
      &-bottom
        &::before
          transform: scaleX(0) translateZ(0)
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)
        &::after
          transform: scaleX(1) translateZ(0)
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) 0.2s

  &.active
    @media (max-width: 500px)
      opacity: 0.3
      
    .burger-icon-top
      transform: translateY(8px) rotate(45deg) translateZ(0)
    .burger-icon-bottom
      transform: translateY(1px) rotate(-45deg) translateZ(0)
</style>
