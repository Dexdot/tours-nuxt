<template>
  <div class="addreview">
    <form
      v-if="!submitted"
      class="addreview-form"
      method="POST"
      ref="form"
      novalidate
      @submit.prevent="onSubmit"
      @keyup="onForm"
    >
      <BaseInput
        required
        name="name"
        v-model="form.name"
        ref="name"
        :placeholder="$t('form.name')"
        :error-text="$t('form.nameError')"
      />

      <BaseInput
        required
        type="text"
        pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
        name="email"
        v-model="form.email"
        ref="email"
        :placeholder="$t('form.email')"
        :error-text="$t('form.emailError')"
      />

      <div class="select">
        <MultipleSelect
          :list="selectToursList"
          :selected="selectedTours"
          :className="'addreview-select'"
          :placeholder="$t('reviews.chooseTour')"
          :error="submitTriggered && selectedTours.length <= false"
          @change="onTourSelectValueClick"
        />
      </div>

      <div class="stars-wrap">
        <p class="stars-label">
          {{ $t("reviews.scoreTour") }}
        </p>
        <ul class="stars">
          <li v-for="i in 5" :key="i">
            <button
              :class="['star', { active: i <= form.score }]"
              type="button"
              @click="form.score = i"
            >
              <svg-icon name="star"></svg-icon>
            </button>
          </li>
        </ul>
      </div>

      <BaseInput
        required
        isTextarea
        name="text"
        v-model="form.text"
        ref="text"
        :placeholder="$t('reviews.textPlaceholder')"
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
    <p class="message" v-if="!submitted">
      Команда “ПЕШЕХОД ТУР” была счастлива видеть вас на наших экскурсиях и
      получить ваш отзыв!<br /><b
        >Дарим скидку 100₽/чел на все последующие экскурсии!</b
      >
      <br />
      <br />
      Вы можете забронировать
      <a target="_blank" href="https://peshehodtour.ru/spb/tours"
        >экскурсии на нашем сайте</a
      >. Пожалуйста, укажите дату/название экскурсии/имя гида в поле "Откуда вы
      о нас узнали". Мы пересчитаем вам скидку вручную.<br /><br />Ждем вас в
      любое время! Акция не имеет ограничений по срокам.
    </p>

    <div v-if="submitted">
      <img class="logo" src="~assets/img/umbrella.svg" alt="Logo" />
      <h2 class="t-h4 message-title">Благодарим за отзыв!</h2>
      <p class="message">
        И хотим поделиться нашим тайным списком идей, что делать в Петербурге в
        любое время года.<br />Подписывайтесь
        <a target="_blank" href="https://vk.com/peshehodtour"
          >на нашу рассылку в ВК</a
        >
        и сохраняйте гайд.
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MultipleSelect from "~/ui/MultipleSelect";

export default {
  components: { MultipleSelect },
  data: () => ({
    submitTriggered: false,
    submitted: false,
    selectedTours: [],
    submitStatus: "",
    form: {
      score: 4,
      name: "",
      email: "",
      text: ""
    }
  }),
  computed: {
    ...mapGetters({
      allTours: "tours/allTours",
      isAddReviewActive: "dom/isAddReviewActive"
    }),
    selectToursList() {
      return this.allTours.map(tour => ({
        label: tour.fields.title,
        value: tour.sys.id
      }));
    }
  },
  watch: {
    isAddReviewActive(isActive) {
      if (!isActive) {
        this.resetForm();
        this.submitted = false;
      }
    }
  },
  methods: {
    onTourSelectValueClick(v) {
      const result = this.selectedTours.includes(v)
        ? this.selectedTours.filter(f => f !== v)
        : [...this.selectedTours, v];

      this.selectedTours = result;
    },
    resetForm() {
      this.submitTriggered = false;
      this.$refs.form?.reset();
      this.selectedTours = [];
      this.submitStatus = "";
      this.form.email = "";
      this.form.text = "";
      this.form.name = "";
      this.form.score = 4;
    },
    isFormValid() {
      if (this.$refs && Object.keys(this.$refs).length > 0) {
        const { email, text, name } = this.$refs;

        return (
          this.form.score > 0 &&
          this.form.score <= 5 &&
          this.selectedTours.length > 0 &&
          email.getValidState() &&
          name.getValidState() &&
          text.getValidState()
        );
      }

      return false;
    },
    onSubmit() {
      this.submitTriggered = true;
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
      const toursIds = this.selectedTours;
      const { score, email, name } = this.form;
      const textarea = Array.from(this.$refs.form.elements).find(
        el => el.name === "text"
      );
      const text = textarea ? textarea.value : "";

      const date = new Date();
      const dateStr = date.toLocaleDateString("ru");

      const postData = {
        date: dateStr,
        sortDate: dateStr,
        score,
        text,
        clientName: name,
        clientEmail: email,
        tours: this.allTours
          .filter(tour => toursIds.includes(tour.sys.id))
          .map(tour => tour.fields.title)
          .join(", ")
      };

      const URL = "https://peshehodtour.ru/api/newreview";

      this.$axios
        .post(URL, postData)
        .then(() => {
          this.onSuccess();
        })
        .catch(() => {
          this.onError();
        });
    },
    onSuccess() {
      this.$refs.form.reset();
      this.submitted = true;
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
.addreview
  position: relative

  display: flex
  flex-direction: column

  @media (min-width: $tab + 1)
    min-width: unit-plus(column-spans(4))
    width: unit-plus(column-spans(4))
    padding: $unit $unit 80px

  @media (max-width: $tab)
    padding: 32px $unit 80px

.stars
  display: inline-flex
  align-items: center

  > li:not(:last-child)
    padding-right: 4px

.star
  display: flex
  align-items: center
  justify-content: center

  &:not(.active) .i-star
    color: rgba($black, 0.3)

  &.active
    &,
    .i-star
      color: $acc

  &,
  .i-star
    transition: 0.2s ease
    min-width: 20px
    width: 20px
    height: 20px
    @media (max-width: $tab)
      min-width: 16px
      width: 16px
      height: 16px

.stars:hover
  .star,
  .i-star
    color: $acc

.stars > li:hover ~ li
  .star,
  .i-star
    color: rgba($black, 0.3)

.stars-label
  +mont(m)
  font-size: 16px
  letter-spacing: -0.02em
  text-align: left
  margin-bottom: 8px

.stars-wrap,
.addreview-form .input,
.select
  margin-bottom: 40px

  @media (max-width: $tab)
    margin-bottom: 32px

.select
  /deep/ ul
    max-width: 100%

    button
      display: block
      text-overflow: ellipsis
      overflow: hidden

.addreview-select
  width: 100%

// Button
.addreview-form .btn
  min-width: 200px
  max-width: 100%

  .btn__bg
    border-radius: 0

.addreview-form + .message
  margin-top: 40px

.message-title
  text-align: center
  margin-bottom: 0.5em

.message
  font-weight: 400
  b
    font-weight: 500

  a
    color: $acc
    display: inline

.logo
  display: block
  margin: 0 auto 24px
</style>
