<template>
  <Modal
    name="credits-modal"
    :active="active"
    @close-click="$store.dispatch('dom/toggleCredits')"
  >
    <div class="credits-modal u-center">
      <nav class="credits-modal__nav">
        <ul>
          <li>
            <a href="https://nickadams.now.sh/" target="_blank">
              <small>Design</small>
              <b>Nick Adams</b>
            </a>
          </li>
          <li>
            <a href="http://hvxzcb.com/" target="_blank">
              <small>Development</small>
              <b>Kamil Sometimes</b>
            </a>
          </li>
          <li>
            <a href="https://darina.now.sh/" target="_blank">
              <small>Management</small>
              <b>Darina Yurina</b>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </Modal>
</template>

<script>
import Modal from '~/ui/Modal'

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
}
</script>

<style lang="sass" scoped>
// Modal
.modal--credits-modal /deep/
  .modal__content .modal__close
    display: none

  .modal__close
    z-index: 1
    position: absolute
    top: 48px
    right: $unit

    border: 0
    margin: 0

    width: 64px
    height: 64px

    .i-close
      color: #fff
      width: 32px
      height: 32px

  .modal__container
    position: relative

    width: 100%
    height: 100%

    background: #000
    transition: $trs-4
    opacity: 0
    pointer-events: none

.modal--active /deep/ .modal__container
  opacity: 1
  pointer-events: auto


// Gallery
.credits-modal
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)

  width: 100%
  height: 100%

.credits-modal__nav
  text-align: center
  font-size: 18px
  color: #fff
  line-height: 1

  li:not(:last-child)
    margin-bottom: 32px

  a
    +link(#fff)

  small
    display: block
    margin-bottom: 8px

    opacity: 0.2
    font-size: 12px

  b
    +mont(sb)
</style>
