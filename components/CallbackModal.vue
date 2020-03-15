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
$wh-header: calc(100vh - var(--header-h))

.modal--callback-modal
  display: flex

.modal--callback-modal /deep/
  .modal__container > .modal__close
    top: unset
    bottom: calc(#{$wh-header} - 48px)

    width: 64px
    height: 64px

    .i-close
      width: 32px
      height: 32px

  .modal__container > .modal__close .i-close
    color: #fff

  .modal__container,
  .contacts-callback
    @media (min-width: 1881px)
      width: unit-plus(column-spans(4))

    @media (min-width: 1401px) and (max-width: 1880px)
      width: unit-plus(column-spans(5))

    @media (min-width: 1341px) and (max-width: 1400px)
      width: unit-plus(calc(#{column-spans(5)} + 40px))

    @media (min-width: $tab + 1) and (max-width: 1340px)
      min-width: 650px
      width: 650px

  .modal__container
    background: $beige-d

    @media (min-width: $tab + 1)
      margin-top: auto
      height: $wh-header

  .modal__content > .modal__close
    color: $black
    border: 1px solid $black
    margin-bottom: var(--unit)

    .i-chevron
      transform: rotate(-180deg)
</style>
