<template>
  <section :class="className">
    <button
      class="modal__overlay"
      type="button"
      @click="$emit('close-click')"
    ></button>
    <div class="modal__container">
      <button
        class="modal__close u-center"
        type="button"
        @click="$emit('close-click')"
        ref="containerClose"
      >
        <svg-icon name="close" />
      </button>

      <div class="modal__content" ref="content">
        <button
          class="modal__close u-center"
          type="button"
          @click="$emit('close-click')"
        >
          <svg-icon name="chevron" />
        </button>

        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: ''
    },
    side: {
      type: String,
      default: 'left'
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    className() {
      const { name, side, type, active } = this

      const classObj = {
        modal: true,
        'modal--active': active
      }

      if (type) {
        classObj[`modal--${type}`] = true
      }

      if (type === 'aside') {
        classObj[`modal--${side}`] = true
      }

      if (name) {
        classObj[`modal--${name}`] = true
      }

      return classObj
    }
  },
  mounted() {
    this.calcTop()
    window.addEventListener('resize', this.calcTop.bind(this))
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calcTop)
  },
  methods: {
    ...mapActions({
      disableScroll: 'dom/disableScroll',
      enableScroll: 'dom/enableScroll'
    }),
    calcTop() {
      const content = this.$refs.content
      const button = this.$refs.containerClose

      if (content && button)
        button.style.setProperty(
          '--modal-content-top',
          `${content.offsetTop}px`
        )
    }
  },
  watch: {
    active(isActive) {
      if (isActive) {
        this.disableScroll()
      } else {
        this.enableScroll()
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.modal
  z-index: 5
  position: fixed
  top: 0
  left: 0

  width: 100vw
  +vh

  pointer-events: none

// Active state
.modal--active
  pointer-events: auto

  .modal__overlay,
  .modal__close
    pointer-events: auto
    opacity: 1

.modal__overlay,
.modal__close
  pointer-events: none
  opacity: 0

.modal__overlay
  transition: $trs-4

.modal__close
  transition: $trs

// Overlay
.modal__overlay
  z-index: -1
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0

  width: 100%
  height: 100%

  background: rgba($black, 0.8)

// Close
.modal__close
  width: 20px
  height: 20px

  color: #fff

  @media (max-width: $tab)
    margin-top: $unit
    margin-left: $unit

    width: 32px
    height: 32px

    border-radius: 50%
    border: 1px solid $black
    color: #000

.modal__close .i-chevron
  width: 14px
  height: 14px
  transform: rotate(90deg)


// Aside modal
.modal--aside
  .modal__container > .modal__close
    position: absolute
    top: 48px
    @media (max-width: $tab)
      display: none

  .modal__content > .modal__close
    @media (min-width: $tab + 1)
      display: none

.modal--aside
  .modal__content
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0

    width: 100%
    max-height: 100%
    +scrollbar

  .modal__container
    position: relative

    width: 50%
    height: 100%

    transition: $trs-4
    background: #fff

    @media (max-width: $tab)
      width: 100%

.modal--aside.modal--left
  .modal__container
    transform: translateX(-101%)
  .modal__close
    @media (min-width: $tab + 1)
      left: calc(100% + 48px)

.modal--aside.modal--right
  .modal__container
    transform: translateX(101%)
    margin-left: auto
  .modal__close
    @media (min-width: $tab + 1)
      right: calc(100% + 48px)

.modal--aside.modal--active .modal__container
  transform: translateX(0)


// Center modal
.modal--center
  .modal__content
    max-height: 100%

  .modal__container
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, 0%)

    +scrollbar
    padding-bottom: 0

    max-height: 100%

    width: 440px
    max-width: calc(100% - #{$unit-2})

    background: #fff
    transition: 0.4s ease
    opacity: 0

    @media (max-width: $mob)
      width: 100%

.modal--center.modal--active .modal__container
  opacity: 1
  transform: translate(-50%, -50%)


// Bottom modal
.modal--bottom
  visibility: hidden

  .modal__container
    height: 100%

  .modal__content
    position: absolute
    bottom: 0
    left: 0
    transform: translateY(100%)

    +scrollbar
    max-height: calc(100% - var(--header-h))
    width: 100%

    transition: 0.4s ease
    border-radius: 24px 24px 0px 0px

    @media (max-width: $mob)
      width: 100%

  .modal__content::before
    content: ''
    background: rgba($black, 0.4)
    border-radius: 40px

    width: 32px
    height: 4px

    position: absolute
    top: 12px
    left: 50%
    transform: translateX(-50%)
       
  .modal__content > .modal__close
    display: none

  .modal__container > .modal__close
    margin: 0
    border: 0
    position: absolute
    bottom: calc(100% - var(--modal-content-top) + 16px)
    right: 0

    width: 40px
    height: 40px

    .i-close
      width: 20px
      height: 20px
      color: rgba(#fff, 0.4)

.modal--bottom.modal--active
  visibility: visible

  .modal__content
    transform: translateY(0%)
</style>
