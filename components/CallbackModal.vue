<template>
  <Modal
    name="callback-modal"
    type="aside"
    side="right"
    :active="active"
    @close-click="$store.dispatch('dom/toggleCallback')"
  >
    <FormCallback />
  </Modal>
</template>

<script>
import Modal from '~/ui/Modal'
import FormCallback from '~/components/FormCallback'

export default {
  components: {
    Modal,
    FormCallback
  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="sass" scoped>
.modal--callback-modal
  display: flex

.modal--callback-modal /deep/
  .modal__container > .modal__close
    top: unset
    right: unset
    bottom: calc(77.77vh + 20px)
    left: 0

    width: 64px
    height: 64px

    .i-close
      width: 32px
      height: 32px

  .modal__container > .modal__close .i-close
    color: #fff

  .modal__container,
  .contacts-callback
    @media (min-width: $tab + 1) and (max-width: 1920px)
      min-width: 650px
      width: 650px

    @media (min-width: 1921px)
      min-width: unit-plus(column-spans(4))
      width: unit-plus(column-spans(4))

  .modal__container
    background: $beige-d

    @media (min-width: $tab + 1)
      margin-top: auto
      height: 77.77vh

  .modal__content > .modal__close
    color: $black
    border: 1px solid $black
    margin-bottom: var(--unit)

    .i-chevron
      transform: rotate(-180deg)
</style>
