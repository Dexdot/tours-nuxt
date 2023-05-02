<template>
  <li
    :class="['accordion', { active }]"
    :style="{ '--acc-max-height': `${maxHeight}px` }"
  >
    <button v-if="title" class="accordion__btn" type="button" @click="onClick">
      {{ title }}
      <svg-icon name="chevron"></svg-icon>
    </button>

    <div class="accordion__content" ref="content">
      <div class="accordion__content-inner">
        <div v-for="(item, i) in content.slice(1)" :key="i + item.nodeType">
          <p v-if="isText(item)" v-html="render(item)"></p>
        </div>
      </div>
    </div></li
></template>

<script>
import render from "~/mixins/render";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

export default {
  mixins: [render],
  props: {
    active: {
      type: Boolean,
      default: false
    },
    content: {
      type: Array,
      required: true
    }
  },
  computed: {
    title() {
      const titleItem = this.content.find(item => this.isH6(item));
      return titleItem ? documentToPlainTextString(titleItem) : "";
    }
  },
  data: () => ({
    maxHeight: 0
  }),
  methods: {
    onClick() {
      this.$emit("accordion-click");
    }
  },
  watch: {
    active(active) {
      this.maxHeight = this.$refs.content.scrollHeight;
    }
  }
};
</script>

<style lang="sass" scoped>
$acc-btn-p: 32px

// Accordion
.accordion
  position: relative

  display: flex
  flex-direction: column
  align-items: stretch
  justify-content: flex-start

  border-bottom: 1px solid rgba($black, 0.1)
  transition: 0.2s ease-in-out

// Button
.accordion__btn
  padding: $acc-btn-p calc(#{$acc-btn-p} + 16px) $acc-btn-p 0
  width: 100%
  display: flex
  align-items: center

  position: relative

  text-align: left
  +mont(sb)
  font-size: 18px
  line-height: 1.2

  @media (max-width: $tab)
    font-size: 14px
    padding: 22px calc(#{$acc-btn-p} + 12px) 22px 0

// Icons
.accordion__btn
  .i-chevron
    position: absolute
    top: 50%
    right: 32px

    width: 14px
    height: 14px

    transition: $trs
    transform-origin: 50% 50%
    transform: translateY(-50%) rotate(90deg)

    @media (max-width: $tab)
      right: 8px

// Opened
.accordion.active
  border-bottom: 1px solid rgba($black, 0)

  .i-chevron
    transform: translateY(-50%) rotate(-90deg)

  .accordion__content
    max-height: var(--acc-max-height)


// Content
.accordion__content
  transition: max-height 0.2s ease-in-out
  overflow: hidden
  max-height: 0

.accordion__content-inner
  padding-bottom: 48px

  font-size: 18px
  line-height: 1.4
  letter-spacing: -0.02em

  @media (max-width: $tab)
    padding-bottom: 24px
    font-size: 14px

  > div
    margin-bottom: 16px
</style>
