<template>
  <label :class="['input', { 'input--invalid': !isValid }]">
    <template v-if="textarea">
      <textarea
        @input="resizeTextarea"
        @blur="checkValid"
        ref="textarea"
        class="input__field"
        v-bind="$attrs"
      ></textarea>

      <span class="input__line"></span>
    </template>

    <template v-else-if="upload">
      <input class="input__field" type="file" @change="onFileUpload" />
      <input
        class="input__field"
        v-bind="$attrs"
        :placeholder="fileName || $attrs.placeholder"
        readonly
      />
      <span class="input__line"></span>
    </template>

    <template v-else>
      <input
        v-if="usePhoneMask"
        v-mask="'+9(999)999-99-99'"
        class="input__field"
        @input="updateValue($event.target.value)"
        @blur="checkValid"
        v-bind="$attrs"
        ref="input"
      />
      <input
        v-else
        class="input__field"
        @input="updateValue($event.target.value)"
        @blur="checkValid"
        v-bind="$attrs"
        ref="input"
      />
      <span class="input__line"></span>
    </template>
  </label>
</template>

<script>
export default {
  props: {
    value: {
      type: String
    },
    upload: {
      type: Boolean,
      default: false
    },
    textarea: {
      type: Boolean,
      default: false
    },
    usePhoneMask: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    isValid: true,
    fileName: ''
  }),
  mounted() {
    this.$nextTick(() => {
      this.handleTextarea()
    })
  },
  methods: {
    handleTextarea() {
      if (this.textarea) {
        this.$nextTick(() => {
          const { scrollHeight } = this.$refs.textarea
          const h = scrollHeight === 0 ? 'auto' : `${scrollHeight}px`

          this.$refs.textarea.setAttribute(
            'style',
            `height: ${h}; overflow-y: hidden;`
          )
        })
      }
    },
    resizeTextarea() {
      const { textarea } = this.$refs

      textarea.style.height = 'auto'
      textarea.style.height = textarea.scrollHeight + 'px'
    },
    updateValue(value) {
      this.$emit('input', value)
    },
    onFileUpload(e) {
      this.fileName = e.target.files[0].name
    },
    checkValid() {
      this.$nextTick(() => {
        const input = this.textarea ? this.$refs.textarea : this.$refs.input

        this.isValid = this.usePhoneMask
          ? input.value.replace(/[^0-9]/g, '').length >= 11
          : input.validity.valid
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.input
  display: block
  width: 100%
  position: relative

.input__line
  position: absolute
  bottom: 0
  left: 0

  width: 100%
  height: 1px

  background: #efefef

  &::before
    content: ''
    position: absolute
    bottom: 0
    left: 0

    width: 100%
    height: 1px

    background: $black
    transition: 0.3s $cubic-in-out
    transform: scaleX(0)
    transform-origin: 100% 50%

.input__field:focus ~ .input__line::before
    transform: scaleX(1)

.input__field
  width: 100%
  padding-bottom: 16px
  
  &, &::placeholder
    color: $black
    transition: color $trs

  &[type="file"]
    z-index: 1
    position: absolute
    top: 0
    left: 0
    height: 100%
    opacity: 0

.input__field[type="file"] + .input__field
  &, &::placeholder
    color: rgba($black, 0.4)

.input--invalid
  .input__field
    &, &::placeholder
      color: $red
  .input__line
    &, &::before
      background: $red
</style>
