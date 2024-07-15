<template>
  <!-- Button -->
  <button
    v-if="!isLink"
    :class="[
      'btn',
      {
        'btn--success': showSuccess && !showError,
        'btn--error': showError && !showSuccess,
        'btn--expand': classExpand,
        'btn--scale': classScale,
        'btn--pulse': classPulse,
        'btn--light': classLight,
        'btn--dark': classDark,
        'btn--outline': classOutline
      }
    ]"
    @click="$emit('click')"
    v-bind="$attrs"
  >
    <span class="btn__bg"></span>
    <span
      :class="['btn__text', { 'btn__text--icon': showSuccess || showError }]"
    >
      <svg-icon v-if="showSuccess" class="btn__icon" name="daw"></svg-icon>
      <svg-icon v-if="showError" class="btn__icon" name="close-sm"></svg-icon>
      <slot></slot
    ></span>

    <svg-icon v-if="classExpand" class="btn__plus" name="plus"></svg-icon>
  </button>

  <!-- External Link -->
  <a
    target="_blank"
    :href="to"
    v-else-if="isExternalLink"
    :class="[
      'btn',
      {
        'btn--success': showSuccess && !showError,
        'btn--error': showError && !showSuccess,
        'btn--expand': classExpand,
        'btn--scale': classScale,
        'btn--pulse': classPulse,
        'btn--light': classLight,
        'btn--dark': classDark,
        'btn--outline': classOutline
      }
    ]"
  >
    <span class="btn__bg"></span>
    <span
      :class="['btn__text', { 'btn__text--icon': showSuccess || showError }]"
    >
      <svg-icon v-if="showSuccess" class="btn__icon" name="daw"></svg-icon>
      <svg-icon v-if="showError" class="btn__icon" name="close-sm"></svg-icon>
      <slot></slot
    ></span>

    <svg-icon v-if="classExpand" class="btn__plus" name="plus"></svg-icon>
  </a>

  <!-- Nuxt Link -->
  <nuxt-link
    :to="to"
    v-else
    :class="[
      'btn',
      {
        'btn--success': showSuccess && !showError,
        'btn--error': showError && !showSuccess,
        'btn--expand': classExpand,
        'btn--scale': classScale,
        'btn--pulse': classPulse,
        'btn--light': classLight,
        'btn--dark': classDark,
        'btn--outline': classOutline
      }
    ]"
  >
    <span class="btn__bg"></span>
    <span
      :class="['btn__text', { 'btn__text--icon': showSuccess || showError }]"
    >
      <svg-icon v-if="showSuccess" class="btn__icon" name="daw"></svg-icon>
      <svg-icon v-if="showError" class="btn__icon" name="close-sm"></svg-icon>
      <slot></slot
    ></span>

    <svg-icon v-if="classExpand" class="btn__plus" name="plus"></svg-icon>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String
    },
    isLink: {
      type: Boolean,
      default: false
    },
    showSuccess: {
      type: Boolean,
      default: false
    },
    showError: {
      type: Boolean,
      default: false
    },
    classExpand: {
      type: Boolean,
      default: false
    },
    classPulse: {
      type: Boolean,
      default: false
    },
    classScale: {
      type: Boolean,
      default: false
    },
    classLight: {
      type: Boolean,
      default: false
    },
    classDark: {
      type: Boolean,
      default: false
    },
    classOutline: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isExternalLink() {
      return this.to.startsWith("http") || !this.to.startsWith("/");
    }
  }
};
</script>

<style lang="sass" scoped>
$btn-h: var(--btn-h)
.btn
  --btn-h: 56px

.btn
  padding: 0 24px
  height: $btn-h
  line-height: $btn-h
  text-align: center

  position: relative

.btn:not(.btn--scale):not(.btn--expand)
  .btn__bg
    transition: opacity 0.25s ease
  &:hover .btn__bg
    opacity: 0.4

a.btn
  display: inline-block

.btn__bg
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)

  width: 100%
  height: 100%

  border-radius: $btn-h
  background: var(--acc-c)

.btn__text,
.btn__plus
  position: relative
  z-index: 1

.btn__text
  +mont(sb)
  line-height: $btn-h
  font-size: 12px
  letter-spacing: 0.04em
  text-transform: uppercase
  +link(#fff)

  svg
    color: inherit

.btn__text--icon
  display: inline-flex
  align-items: center

  svg
    margin-right: 8px


// Pulse
.btn--pulse .btn__bg
  overflow: hidden

.btn--pulse .btn__bg::before
  content: ''
  z-index: 1
  position: absolute
  top: 0
  left: 0

  width: 30px
  height: 100%

  opacity: 0.3
  background: linear-gradient(to right,rgba(255,255,255,0) 0%,rgba(255,255,255,0.03) 1%,rgba(255,255,255,0.6) 30%,rgba(255,255,255,0.85) 50%,rgba(255,255,255,0.85) 70%,rgba(255,255,255,0.85) 71%,rgba(255,255,255,0) 100%)
  transform: skew(-10deg,0deg)
  animation: btn-move 3s linear infinite

@keyframes btn-move
  0%
    left: 0%
  20%
    left: 120%
  100%
    left: 120%

// Light
.btn--light
  .btn__text
    +link($black)
  .btn__bg
    background: #E7E2DB
  &::before
    border: 1px solid #E7E2DB


// Dark
.btn--dark
  .btn__bg
    background: #333
  &::before
    border: 1px solid #333


// Outline
.btn--outline
  .btn__bg
    background: 0
    border: 1px solid #333

  .btn__text
    +link($black)


// Expand
.btn--expand
  --btn-h: 40px
  border-radius: 40px
  overflow: hidden
  -webkit-mask-image: -webkit-radial-gradient(white, black)

  padding-left: 16px
  padding-right: 12px
  display: flex
  align-items: center

  .btn__bg,
  .btn__text,
  .btn__plus
    transition: $trs-4

  .btn__bg
    left: unset
    right: 0
    transform: translate(calc(100% - 40px), -50%)

  .btn__text
    margin-right: 8px
    opacity: 0
    pointer-events: none

    @media (max-width: $mob)
      font-size: 10px

.btn--expand:hover
  .btn__plus
    transform: rotate(-90deg)

  .btn__bg
    transform: translate(0, -50%)

  .btn__text
    opacity: 1
    pointer-events: auto
    transition: $trs-4 0.15s


// Scale
$btn-scale-1: cubic-bezier(.19,1,.22,1)
$btn-scale-2: cubic-bezier(.165,.84,.44,1)

.btn--scale
  .btn__text
    transition: color $btn-scale-1

  .btn__bg
    pointer-events: none
    transition: transform .9s $btn-scale-1, opacity .6s $btn-scale-2

  &::before
    content: ''
    z-index: 1
    position: absolute
    top: 50%
    left: 50%

    transform: translate(-50%, -50%) scale(1.2,1.44)
    opacity: 0
    transition: transform .4s $btn-scale-1, opacity .3s $btn-scale-1
    pointer-events: none

    width: 100%
    height: 100%

    border-radius: $btn-h
    border: 1px solid rgba($black, 0.2)

.btn--scale:hover
  .btn__text
    color: $black

  .btn__bg
    opacity: 0
    transform: translate(-50%, -50%) scale(0.6)
    transition: transform .7s $btn-scale-1, opacity .15s $btn-scale-2

  &::before
    opacity: 1
    transform: translate(-50%, -50%) scale(1)
    transition: transform .4s $btn-scale-1,opacity .4s $btn-scale-1


// Error
.btn--error
  .btn__text, svg
    +link($black)
  .btn__bg
    background: rgba($black, 0.3)
</style>
