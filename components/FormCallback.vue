<template>
  <div class="contacts-callback">
    <div class="contacts-icons">
      <img src="~assets/svg/circle-waves.svg" alt="Icon" />
      <img src="~assets/svg/stamp.svg" alt="Icon" />
    </div>

    <form action="ajax/callback.php" class="contacts-form" novalidate>
      <BaseInput
        required
        type="text"
        :placeholder="$t('form.name')"
        :error-text="$t('form.nameError')"
      />
      <BaseInput
        required
        type="text"
        pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
        :placeholder="$t('form.email')"
        :error-text="$t('form.emailError')"
      />
      <BaseInput
        required
        isTextarea
        minlength="10"
        :placeholder="$t('form.message')"
        :error-text="$t('form.messageError')"
      />

      <BaseButton
        :showSuccess="isFormSubmitted && isFormValid"
        :showError="!isFormSubmitted && !isFormValid"
        type="submit"
      >
        <slot v-if="!isFormSubmitted && !isFormValid">{{
          $t('form.buttonError')
        }}</slot>
        <slot v-else>{{ $t('form.button') }}</slot>
      </BaseButton>
    </form>
  </div>
</template>

<script>
export default {
  computed: {
    isFormSubmitted() {
      return false
    },
    isFormValid() {
      return true
    }
  }
}
</script>

<style lang="sass" scoped>
.contacts-callback
  position: relative

  display: flex
  flex-direction: column

  @media (min-width: $tab + 1)
    min-width: unit-plus(column-spans(4))
    width: unit-plus(column-spans(4))
    padding: $unit $unit 80px

  @media (max-width: $tab)
    padding: 32px $unit 80px

.contacts-icons
  display: flex
  align-items: flex-start
  justify-content: space-between

  margin-bottom: 160px

  @media (max-width: $tab)
    margin-bottom: 16px
    padding-top: 32px
    border-top: 1px solid rgba($black, 0.1)

// Icons
.contacts-icons img
  max-width: calc(50% - 16px)

  &:first-child
    @media (max-width: $tab)
      width: 108px

  &:last-child
    @media (max-width: $tab)
      width: 101px

// Input margins
.contacts-form .input
  margin-bottom: 40px

  @media (max-width: $tab)
    margin-bottom: 32px

// Button
.contacts-form .btn
  min-width: 200px
  max-width: 100%

  .btn__bg
    border-radius: 0
</style>
