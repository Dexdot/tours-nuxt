<template>
  <label
    :class="['input', { 'input--invalid': !isValid }]"
    :data-error-text="errorText"
  >
    <template v-if="isTextarea">
      <textarea
        class="input__field"
        ref="textarea"
        v-bind="$attrs"
        @input="
          resizeTextarea()
          onChange()
        "
        @blur="onChange"
      ></textarea>
    </template>

    <template v-else-if="isFile">
      <input
        class="input__field"
        type="file"
        v-bind="$attrs"
        :placeholder="fileName || $attrs.placeholder"
        @change="
          onFileUpload()
          onChange()
        "
      />
    </template>

    <template v-else>
      <input
        v-if="usePhoneMask"
        v-mask="'+9(999)999-99-99'"
        class="input__field"
        ref="input"
        v-bind="$attrs"
        @input="
          updateValue($event.target.value)
          onChange()
        "
        @blur="onChange"
      />

      <input
        v-else
        class="input__field"
        ref="input"
        v-bind="$attrs"
        @input="
          updateValue($event.target.value)
          onChange()
        "
        @blur="onChange"
      />
    </template>
  </label>
</template>

<script>
export default {
  props: {
    value: {
      type: String
    },
    errorText: {
      type: String,
      default: ''
    },
    isFile: {
      type: Boolean,
      default: false
    },
    isTextarea: {
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
    updateValue(value) {
      this.$emit('input', value)
    },
    onFileUpload(e) {
      this.fileName = e.target.files[0].name
    },
    onChange() {
      if (this.getValidState() && !this.isValid) this.setValidState()
    },
    getValidState() {
      const input = this.isTextarea ? this.$refs.textarea : this.$refs.input

      return this.usePhoneMask
        ? input.value.replace(/[^0-9]/g, '').length >= 11
        : input.validity.valid
    },
    setValidState() {
      this.$nextTick(() => {
        this.isValid = this.getValidState()
      })
    },
    handleTextarea() {
      if (this.isTextarea) {
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
    }
  }
}
</script>

<style lang="sass" scoped>
.input
  display: block
  width: 100%
  position: relative

  +mont(m)
  font-size: 16px
  letter-spacing: -0.02em

.input::after
  content: attr(data-error-text)
  position: absolute
  top: 0
  right: 0

  color: $acc
  font-size: 14px
  transition: opacity $trs
  opacity: 0

.input__field
  width: 100%
  padding-bottom: 16px
  border-bottom: 1px solid rgba($black, 0.1)
  
  &, &::placeholder
    color: $black
    transition: color $trs

textarea.input__field
  resize: none
  &::placeholder
    color: rgba($black, 0.3)

.input--invalid
  .input__field
    border-bottom: 1px solid rgba($red, 0.1)

  &::after
    opacity: 1
</style>
