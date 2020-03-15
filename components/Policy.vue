<template>
  <div class="policy">
    <aside class="policy__aside">
      <slot></slot>
    </aside>

    <section class="policy__content">
      <div v-for="(item, i) in content" :key="i + item.nodeType">
        <p v-if="isText(item)" v-html="render(item)"></p>
        <ol v-if="isOL(item)" v-html="render(item)"></ol>
        <ul v-if="isUL(item)" v-html="render(item)"></ul>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import render from '~/mixins/render'

export default {
  mixins: [render],
  props: {
    content: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
.policy
  padding: calc(var(--header-h) + 80px) 0 80px

.policy__aside
  @media (min-width: $tab + 1)
    z-index: 2
    position: sticky
    top: calc(var(--header-h) + 16px)
    float: left

  @media (max-width: $tab)
    margin-bottom: 64px

.policy__content
  margin: 0 auto

  @media (min-width: $tab + 1)
    max-width: column-spans(6)

.policy__content /deep/
  p
    margin-bottom: 16px

  ol, ul
    margin-bottom: 16px

  ol
    counter-reset: counter
    margin-bottom: 16px
    padding-left: 32px

  ol li
    position: relative

    &:not(:last-child)
      margin-bottom: 16px

  ol li::before
    content: counter(counter)'.'
    counter-increment: counter
    display: inline-block

    position: absolute
    top: 0
    left: -32px

  ol p
    display: inline

  ul li
    position: relative
    padding-left: 30px
    &:not(:last-child)
      margin-bottom: 16px

  ul li::before
    content: ''
    position: absolute
    top: 0.5em
    left: 0

    width: 6px
    height: 6px
    background: $black
    border-radius: 50%
</style>

