<template>
  <ul class="accordion-container accordion-container--bg">
    <AccordionItem
      :active="i === index"
      v-for="(item, i) in content"
      :content="item"
      :key="i"
      @accordion-click="onClick(i)"
    />
  </ul>
</template>

<script>
import AccordionItem from '~/components/AccordionItem'

export default {
  components: {
    AccordionItem
  },
  props: {
    content: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    index: -1
  }),
  methods: {
    onClick(i) {
      this.index = this.index === i ? -1 : i
    }
  }
}
</script>

<style lang="sass" scoped>
// White BG
.accordion-container--bg /deep/
  .accordion.active
    z-index: 1

  .accordion::before
    z-index: -1
    content: ''
    position: absolute
    top: -1px
    
    height: calc(100% + 1px)
    width: 100vw

    background: #fff
    opacity: 0
    transition: opacity 0.2s ease-in-out

  .accordion.active::before
    opacity: 1
</style>
