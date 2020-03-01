<template>
  <Modal
    name="sights-modal"
    type="bottom"
    :active="active"
    @close-click="$emit('close-click')"
  >
    <div class="sights">
      <div class="sights__img img">
        <BaseImage
          class="img__i"
          :key="counter"
          :img="img"
          :alt="img.fields.title"
        />
        <div v-if="counter" class="sights__counter u-center">{{ counter }}</div>
      </div>

      <p class="sights__text">
        {{ img.fields.description }}
      </p>
      <div class="sights__nav">
        <SliderNav
          @prev-click="$emit('prev-click')"
          @next-click="$emit('next-click')"
        />
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '~/ui/Modal'
import SliderNav from '~/ui/SliderNav'

export default {
  components: {
    Modal,
    SliderNav
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    counter: {
      type: [String, Number]
    },
    img: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
.modal--sights-modal /deep/ .modal__content
  background: $beige-d

.sights
  line-height: 1.2
  padding: 48px 24px 0

.sights__img
  padding-bottom: 71.56%
  margin-bottom: 16px
  border-radius: 16px
  overflow: hidden

.sights__counter
  position: absolute
  top: 16px
  left: 16px

  width: 32px
  height: 32px

  border-radius: 50%
  background: #fff

  font-size: 16px
  color: $black

.sights__text
  text-align: center
  +mont(b)
  margin-bottom: 40px
</style>
