<template>
  <button
    :class="[
      'chipbox',
      { 'chipbox--sm': small, 'chipbox--white': white, active }
    ]"
    type="button"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    white: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="sass" scoped>
.chipbox
  display: block
  height: 32px
  padding: 0 24px

  border-radius: 24px
  transition: $trs

  white-space: nowrap
  +mont(sb)
  +link($black)
  line-height: 32px
  font-size: 12px
  letter-spacing: 0.04em
  text-transform: uppercase

  @media (max-width: 360px)
    font-size: 11px
    padding: 0 16px

.chipbox:not(.chipbox--white)
  border: 1px solid rgba($black, 0.2)

  &.active
    border: 1px solid rgba($black, 0)
    background: rgba($black, 0.2)


.chipbox--white
  border: 1px solid #fff

  &:not(.active)
    +link(#fff)

  &.active
    background: #fff


.chipbox--sm
  padding: 0 8px
  height: 20px
  line-height: 20px
  font-size: 10px
</style>