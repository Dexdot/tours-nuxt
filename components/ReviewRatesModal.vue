<template>
  <Modal
    name="review-rates"
    type="bottom"
    :active="active"
    @close-click="$emit('close-click')"
  >
    <slot></slot>
  </Modal>
</template>

<script>
import Modal from "~/ui/Modal";

export default {
  components: {
    Modal
  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="sass" scoped>
.modal--review-rates /deep/ .modal__content
  background: var(--sec-c)
  padding: 88px unit-plus(calc(#{$unit} / 2)) 80px
</style>
