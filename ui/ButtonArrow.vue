<template>
  <button class="u-center arrow-btn" @click="$emit('click')">
    <svg-icon name="chevron"></svg-icon>
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>

<style lang="sass" scoped>
.arrow-btn
  border-radius: 50%
  border: 1px solid rgba($black, 0.1)
  transition: $trs

  width: 56px
  height: 56px

  &:hover
    border: 1px solid rgba($black, 1)

  .i-chevron
    width: 14px
    height: 14px
    color: $black
</style>
