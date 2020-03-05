<template>
  <section class="how-title-section rail">
    <div class="rail__container">
      <div class="rail__track-container">
        <ul class="rail__track">
          <li>
            <p class="how-title">{{ text }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import Rail from '~/assets/scripts/rail'

export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  data: () => ({
    rail: null
  }),
  mounted() {
    this.initRail()
  },
  beforeDestroy() {
    this.rail.destroy()
  },
  methods: {
    initRail() {
      const el = this.$el

      const railContainer = el.querySelector('.rail__container')
      const trackContainer = el.querySelector('.rail__track-container')
      const track = el.querySelector('.rail__track')

      trackContainer.append(track.cloneNode(true))
      railContainer.append(trackContainer.cloneNode(true))

      this.rail = new Rail(el)
    }
  }
}
</script>

<style lang="sass" scoped>
.how-title-section
  max-width: 100%
  overflow: hidden
  padding: 96px 48px
  @media (max-width: $tab)
    padding: 16px 32px

.how-title
  +mont(b)
  +yo('font-size', (375px: 64px, 1920px: 160px, 2550px: 184px))
  letter-spacing: -0.02em
  padding-right: 0.3em
</style>
