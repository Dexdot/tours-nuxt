<template>
  <Accordion :content="normalizedContent" />
</template>

<script>
import Accordion from '~/components/Accordion'

export default {
  components: {
    Accordion
  },
  props: {
    content: {
      type: Array,
      required: true
    }
  },
  computed: {
    normalizedContent() {
      let counter = 0
      const content = []

      this.content.forEach(field => {
        if (field.nodeType !== 'hr') {
          const slide = content[counter]

          if (Array.isArray(slide)) {
            slide.push(field)
          } else {
            content[counter] = []
            content[counter].push(field)
          }
        } else {
          counter++
        }
      })

      return content
    }
  }
}
</script>