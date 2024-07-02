<template>
  <ul :class="['pagen', { 'pagen--outline': outlined }]">
    <li v-for="(item, i) in list" :key="item.text">
      <button
        :class="['u-center', { active: index === i }]"
        type="button"
        @click="$emit('click', i)"
      >
        {{ item.text }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    outlined: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }
};
</script>

<style lang="sass" scoped>
.pagen
  display: flex
  flex-wrap: wrap

.pagen:not(.pagen--outline)
  font-size: 18px

  margin-left: -8px
  li
    margin-left: 8px

  button
    width: 48px
    height: 48px

    transition: $trs
    +link($black)
    border-bottom: 1px solid rgba($black, 0.2)

    &:hover
      color: var(--acc-c)

    &.active
      +link(var(--acc-c))
      border-bottom: 1px solid var(--acc-c)


.pagen--outline
  +mont(sb)
  font-size: 18px

  margin-left: -16px

  @media (max-width: $mob)
    flex-wrap: wrap
    font-size: 16px
    margin-top: -8px
    justify-content: center

  li
    margin-left: 16px
    @media (max-width: $mob)
      margin-top: 8px

  button
    width: 72px
    height: 72px

    transition: $trs
    border-radius: 50%
    border: 1px solid $black

    @media (max-width: $mob)
      width: 48px
      height: 48px

    &:not(.active)
      opacity: 0.4

    &:hover
      opacity: 0.8
</style>
