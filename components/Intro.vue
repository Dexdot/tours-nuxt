<template>
  <section class="intro"></section>
</template>

<script>
import { gsap } from 'gsap'

export default {
  mounted() {
    window.addEventListener('load', () => {
      this.animate()
    })
  },
  methods: {
    async animate() {
      gsap.fromTo(
        this.$el,
        {
          opacity: 1
        },
        {
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.set(this.$el, { 'pointer-events': 'none' })
            this.$emit('complete')
          }
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.intro
  z-index: 10
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh

  display: flex
  align-items: center
  justify-content: center

  background: #000
</style>
