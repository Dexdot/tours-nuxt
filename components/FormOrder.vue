<template>
  <div class="form-order">
    <div class="form-order__price">
      <div class="form-order__price-item">
        <b>
          {{ tourData.price }}
        </b>
        <p>
          {{ tourData.priceLabel || $t("formOrder.price") }}
        </p>
      </div>

      <div class="form-order__price-item" v-if="tourData.priceChild">
        <b>
          {{ tourData.priceChild }}
        </b>
        <p>
          {{ tourData.priceChildLabel || $t("formOrder.priceChild") }}
        </p>
      </div>
    </div>

    <div class="form-order__controls">
      <p>{{ $t("formOrder.title") }}</p>
      <BaseButton @click="$store.dispatch('dom/showBukza', tourData.bukzaId)">{{
        $t("formOrder.button")
      }}</BaseButton>
      <small>
        {{ tourData.offerFormLabel || $t("formOrder.subtitle") }}
      </small>
    </div>

    <div
      class="form-order__action"
      v-if="tourData.offerTitle || tourData.offerText"
    >
      <div class="form-order__action-text">
        <b v-if="tourData.offerTitle">{{ tourData.offerTitle }}</b>
        <p v-if="tourData.offerText">{{ tourData.offerText }}</p>
      </div>
      <img
        class="form-order__action-icon"
        :src="
          require(`~/assets/svg${
            city === 'belgrade' ? '/belgrade' : ''
          }/clock.svg`)
        "
        alt="Clock"
      />
    </div>
  </div>
</template>

<script>
import city from "~/mixins/city";

export default {
  mixins: [city],
  props: {
    tourData: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="sass" scoped>
.form-order
  padding: 64px 18% 48px

  @media (max-width: 1540px)
    padding: 64px 32px 48px

  @media (max-width: 1250px)
    padding: 64px 16px 48px

  @media (max-width: $tab)
    padding: 48px $unit 56px

.form-order__price
  display: flex
  margin-bottom: 40px
  line-height: 1.2

  @media (min-width: $tab + 1) and (max-width: 1250px)
    margin-bottom: 32px

.form-order__price-item
  position: relative
  font-size: 12px

  b
    +mont(sb)
    +yo('font-size', (1250px: 24px, 1540px: 28px, 1650px: 30px, 1920px: 36px, 2550px: 40px))
    line-height: 1

    @media (max-width: $tab)
      font-size: 36px

.form-order__price-item:first-child
  padding-right: 24px
  margin-right: 24px

  @media (min-width: $tab + 1) and (max-width: 1250px)
    padding-right: 16px
    margin-right: 16px

  &::before
    content: ''
    position: absolute
    top: 0
    right: 0

    height: 100%
    width: 1px
    display: block

    background: rgba($black, 0.1)

.form-order__controls /deep/
  margin-bottom: 40px

  > p
    font-size: 12px

  > p,
  .select-box
    margin-bottom: 8px

  .btn
    margin-bottom: 16px

  .btn,
  .btn__bg
    border-radius: 0

  .select-box,
  .btn
    width: 100%

  small
    font-size: 12px
    text-align: center
    opacity: 0.4
    display: block

.form-order__action
  border-top: 1px solid rgba($black, 0.1)
  padding-top: 32px

  display: flex
  align-items: center
  justify-content: space-between

.form-order__action-text
  line-height: 1.2
  +mont(r)

  @media (min-width: $tab + 1) and (max-width: 1650px)
    font-size: 12px

  b
    +mont(sb)
    display: block
    margin-bottom: 8px

.form-order__action-icon
  object-fit: contain
  margin-left: 16px
  min-width: 48px
  width: 48px
  height: 48px

  @media (min-width: $tab + 1) and (max-width: 1650px)
    min-width: 40px
    width: 40px
    height: 40px
    margin-left: 8px

  @media (max-width: $tab)
    margin-right: 16px
</style>
