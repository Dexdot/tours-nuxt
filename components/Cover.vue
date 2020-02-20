<template>
  <div class="cover"></div>
</template>

<style lang="sass" scoped>
.cover
  z-index: 10
  position: fixed
  top: 0
  left: 0

  width: 100vw
  height: 100vh

  background: #000
  transform: translateY(100%)
  will-change: transform
</style>
