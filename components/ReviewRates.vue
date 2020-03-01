<template>
  <ul class="review-rates">
    <li class="review-rates__li" v-for="img in aggregators" :key="img.sys.id">
      <a :href="img.fields.title" target="_blank">
        <img :src="img.fields.file.url" :alt="img.fields.title" />
      </a>
      <div class="review-rates__row">
        <b>{{ img.fields.rate }}</b>
        <svg-icon name="star"></svg-icon>
        <p>{{ img.fields.ratesLength }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    aggregators: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
.review-rates
  width: 100%
  display: flex
  flex-direction: column
  align-items: center
  
.review-rates__li
  width: 100%

.review-rates__li:not(:last-child)
  margin-bottom: 32px

.review-rates__li a
  display: block

.review-rates__li img
  display: block
  margin: 0 auto 32px
  max-width: 100%
  max-height: 100%

.review-rates__row
  height: 32px
  display: flex
  align-items: center
  justify-content: center

  font-size: 14px
  letter-spacing: -0.02em

  border-top: 1px solid rgba($black, 0.1)
  border-bottom: 1px solid rgba($black, 0.1)

.review-rates__row b
  +mont(sb)
  margin-right: 2px

.review-rates__row .i-star
  width: 16px
  height: 16px

.review-rates__row p
  +mont(r)
  &::before
    content: ''

    width: 3px
    height: 3px
    margin: 0 8px

    display: inline-block
    vertical-align: middle

    border-radius: 50%
    background: $black
</style>
