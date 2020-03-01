<template>
  <button class="tip-btn u-center" @click="$emit('click')">
    <svg-icon name="help"></svg-icon>
  </button>
</template>

<style lang="sass" scoped>
.tip-btn
  min-width: 16px
  width: 16px
  height: 16px

  border-radius: 50%
  background: $acc

  .i-help
    color: #fff
</style>
