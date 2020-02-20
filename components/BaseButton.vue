<template>
  <button class="btn" @click="$emit('click')" v-bind="$attrs">
    <span class="btn__bg"></span>
    <span class="btn__text"><slot></slot></span>
  </button>
</template>

<style lang="sass" scoped>
.btn
  overflow: hidden
  display: block
  height: 64px
  padding: 0 56px

  position: relative

.btn__bg
  &,
  &::before,
  &::after
    content: ''
    position: absolute
    top: 0
    left: 0

    width: 100%
    height: 100%


  &::before,
  &::after
    background: $black

  &::before
    transition: 0.6s $cubic-io 0.4s

  &::after
    transition: 0.6s $cubic-io
    transform: translateX(100%)

.btn:hover .btn__bg
  &::before
    transition: 0.6s $cubic-io
    transform: translateX(-100%)
  &::after
    transition: 0.6s $cubic-io 0.4s
    transform: translateX(0%)


.btn__text
  display: block

  color: #fff
  font-size: 12px
  letter-spacing: 0.08em
  text-transform: uppercase
  
  position: relative
</style>
