<template>
  <ul class="social">
    <li
      v-for="item in list"
      :key="item.name"
      :href="item.to"
      :class="`social-li--${item.name}`"
      target="_blank"
    >
      <svg-icon :name="item.name" />
    </li>
    <slot></slot>
  </ul>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
.social
  display: flex
  align-items: center

  margin-top: -8px
  margin-left: -8px
  
.social li
  margin-top: 8px
  margin-left: 8px

.social a
  width: 32px
  height: 32px

  position: relative
  &::before
    content: ''
    position: absolute
    top: 50%
    left: 50%

    transform: translate(-50%, -50%)
    transform-origin: 50% 50%

    width: 100%
    height: 100%

    border-radius: 50%
    border: 1px solid $black
    transition: transform $trs

  &:hover::before
    transform: translate(-50%, -50%) scale(1.1)
</style>