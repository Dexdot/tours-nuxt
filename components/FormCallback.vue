<template>
  <div class="contacts-callback">
    <div class="contacts-icons">
      <img src="~assets/svg/circle-waves.svg" alt="Icon" />
      <img src="~assets/svg/stamp.svg" alt="Icon" />
    </div>

    <form
      class="contacts-form"
      action="/api/callback"
      method="POST"
      ref="form"
      novalidate
      @submit.prevent="onSubmit"
      @keyup="onForm"
    >
      <BaseInput
        required
        type="text"
        name="cb_name"
        v-model="form.name"
        ref="name"
        :placeholder="$t('form.name')"
        :error-text="$t('form.nameError')"
      />
      <BaseInput
        required
        type="text"
        pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
        name="cb_email"
        v-model="form.email"
        ref="email"
        :placeholder="$t('form.email')"
        :error-text="$t('form.emailError')"
      />
      <BaseInput
        required
        isTextarea
        minlength="10"
        name="cb_text"
        v-model="form.text"
        ref="text"
        :placeholder="$t('form.message')"
        :error-text="$t('form.messageError')"
      />

      <BaseButton
        :showSuccess="submitStatus === 'success'"
        :showError="submitStatus === 'error'"
        type="submit"
      >
        <slot v-if="submitStatus === 'success'">{{
          $t("form.buttonSuccess")
        }}</slot>
        <slot v-else-if="submitStatus === 'error'">{{
          $t("form.buttonError")
        }}</slot>
        <slot v-else>{{ $t("form.button") }}</slot>
      </BaseButton>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    submitStatus: "",
    form: {
      name: "",
      email: "",
      text: ""
    }
  }),
  computed: {
    ...mapGetters({
      isCallbackActive: "dom/isCallbackActive"
    })
  },
  watch: {
    isCallbackActive(isActive) {
      if (!isActive) {
        this.resetForm();
      }
    }
  },
  methods: {
    resetForm() {
      this.$refs.form.reset();
      this.submitStatus = "";
      this.form.name = "";
      this.form.email = "";
      this.form.text = "";
    },
    isFormValid() {
      if (this.$refs && Object.keys(this.$refs).length > 0) {
        const { name, email, text } = this.$refs;

        return (
          name.getValidState() && email.getValidState() && text.getValidState()
        );
      }

      return false;
    },
    onSubmit() {
      if (this.isFormValid()) {
        this.submit();
      } else {
        this.setFieldsValidState();
      }
    },
    setFieldsValidState() {
      for (let key in this.$refs) {
        const ref = this.$refs[key];
        if (ref && ref.setValidState) ref.setValidState();
      }
    },
    submit() {
      this.post(this.getFormData());
    },
    getFormData() {
      const data = new FormData();

      // Text, file inputs
      Array.from(this.$refs.form.elements).forEach(field => {
        const hasName = field.name;
        const notDisabled = !field.disabled;
        const ignoredTypes = ["radio", "checkbox", "reset", "submit", "button"];
        const isFile = field.type === "file";

        if (hasName && notDisabled && !ignoredTypes.includes(field.type)) {
          if (isFile) {
            data.append(field.name, field.files[0]);
          } else {
            data.set(field.name, field.value);
          }
        }
      });

      // Checkboxes
      // this.form.checked.forEach(v => {
      //   data.append('cb_service[]', v)
      // })

      const objectData = {};
      data.forEach((value, key) => {
        objectData[key] = value;
      });
      objectData["cb_city"] = this.$route.params.city;

      return objectData;
    },
    post(data) {
      this.$axios
        .post(this.$refs.form.action, data)
        .then(({ data }) => {
          if (data.success == true) {
            this.onSuccess();
          } else {
            this.onError();
          }
        })
        .catch(() => {
          this.onError();
        });
    },
    onSuccess() {
      this.$refs.form.reset();
      this.submitStatus = "success";
    },
    onError() {
      this.submitStatus = "error";
    },
    onForm() {
      if (this.submitStatus !== "") {
        this.submitStatus = "";
      }
    }
  }
};
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
