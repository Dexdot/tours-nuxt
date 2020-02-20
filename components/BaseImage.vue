<template>
  <img />
</template>

<script>
import { getImageUrl } from '~/assets/scripts/helpers'

export default {
  name: 'BaseImage',
  props: {
    img: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      const img = this.$el
      const src = getImageUrl(this.img)

      const onload = () => {
        this.$emit('complete', img)
        this.$root.$emit('update-scroll')
      }

      if (img.decode) {
        img.src = src
        img.decode().then(onload.bind(this))
      } else {
        img.onload = onload.bind(this)
        img.src = src
      }
    }
  }
}
</script>
