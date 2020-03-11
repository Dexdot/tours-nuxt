<template>
  <Modal
    name="bukza-modal"
    type="aside"
    :active="active"
    @close-click="$store.dispatch('dom/hideBukza')"
  >
    <div>
      <!-- BEGIN BUKZA CODE -->
      <div class="bukza-container" :id="`BukzaContainer${id}`"></div>
      <div ref="ss"></div>
      <!-- END BUKZA CODE -->
    </div>
  </Modal>
</template>

<script>
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters({
      id: 'dom/bukzaID'
    })
  },
  methods: {
    init() {
      const d = document
      const w = window

      const l = () => {
        const s = d.createElement('script')
        s.type = 'text/javascript'
        s.async = true
        s.src = `https://public.bukza.com/api/script/generate/11417/${
          this.id
        }/BukzaContainer${this.id}?t=${new Date().getTime()}`
        const { ss } = this.$refs
        ss.parentNode.insertBefore(s, ss)
      }

      if (d.readyState == 'complete') {
        l()
      } else {
        if (w.attachEvent) {
          w.attachEvent('onload', l)
        } else {
          w.addEventListener('load', l, false)
        }
      }
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
