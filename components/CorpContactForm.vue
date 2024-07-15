<template>
  <div class="form-order">
    <div class="form-order__controls">
      <BaseButton v-if="email" :to="`mailto:${email}`" isLink
        >{{ $t("corpTour.textUs") }}<svg-icon name="email"
      /></BaseButton>

      <span v-if="email && phone" class="hr"></span>

      <BaseButton v-if="phone" :to="`tel:${phone}`" isLink classOutline
        >{{ $t("corpTour.call") }}<svg-icon name="phone"
      /></BaseButton>

      <small v-if="label">
        {{ label }}
      </small>
    </div>
  </div>
</template>

<script>
import city from "~/mixins/city";

export default {
  mixins: [city],
  props: {
    email: {
      type: String,
      required: false
    },
    phone: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: false
    }
  }
};
</script>

<style lang="sass" scoped>
.form-order
  padding: 56px 18%

  @media (max-width: 1540px)
    padding: 56px 32px

  @media (max-width: 1250px)
    padding: 56px 16px

  @media (max-width: $tab)
    padding: 48px $unit

.form-order__controls /deep/
  > p
    font-size: 12px

  .btn__text
    display: inline-flex
    align-items: center
    transform: translateY(-1px)

    svg
      display: inline-block
      vertical-align: middle
      margin-left: 10px

  .btn,
  .btn__bg
    border-radius: 0

  .btn
    width: 100%

  small
    font-size: 12px
    text-align: center
    opacity: 0.4
    display: block
    margin-top: 12px

.hr
  display: block
  width: 100%
  margin: 16px 0
  border-top: 1px solid rgba($black, 0.1)
</style>
