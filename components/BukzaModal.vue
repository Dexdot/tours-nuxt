<template>
  <Modal
    name="bukza-modal"
    type="aside"
    :active="active"
    @close-click="$store.dispatch('dom/hideBukza')"
  >
    <!-- BEGIN BUKZA CODE -->
    <div class="bukza-container" id="BukzaContainer11621"></div>
    <div ref="ss"></div>
    <!-- END BUKZA CODE -->
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
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init() {
      var self = this

      ;(function() {
        var d = document
        var w = window

        function l() {
          var s = d.createElement('script')
          s.type = 'text/javascript'
          s.async = true
          s.src =
            'https://public.bukza.com/api/script/generate/12529/11621/BukzaContainer11621?t=' +
            new Date().getTime()
          var ss = self.$refs.ss
          ss.parentNode.insertBefore(s, ss)
        }

        if (d.readyState == 'complete') {
          l()
          console.log('calling readystate')
        } else {
          if (w.attachEvent) {
            console.log('calling onload')
            w.attachEvent('onload', l)
          } else {
            console.log('calling load')
            w.addEventListener('load', l, false)
          }
        }
      })()
    }
  }
}
</script>

<style lang="sass" scoped>
.modal--bukza-modal /deep/
  .modal__container > .modal__close .i-close,
  .modal__content > .modal__close .i-chevron
    color: #fff

  .modal__content > .modal__close
    color: #fff
    border: 1px solid #fff
    margin-bottom: var(--unit)

  .modal__content > .modal__close .i-chevron
    transform: rotate(-180deg)

.modal--bukza-modal /deep/ .modal__content
  background-color: #151515

.bukza-container /deep/ iframe
  height: 100vh !important
</style>
