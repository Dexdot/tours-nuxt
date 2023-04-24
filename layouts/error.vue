<template>
  <div>
    <section class="ntf">
      <div class="container">
        <div class="ntf__inner">
          <img src="~assets/img/404.png" alt="404" class="ntf__img" />
          <div class="ntf__text">
            <h1 class="t-h2">{{ $t("ntf.title") }}</h1>
            <p>{{ $t("ntf.text") }}</p>
            <BaseButton isLink :to="$cityLocalePath('index')">{{
              $t("ntf.button")
            }}</BaseButton>
          </div>
        </div>
      </div>
    </section>

    <ToursSlider v-if="popularTours.length > 0" :tours="popularTours" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ToursSlider from "~/components/ToursSlider";

export default {
  components: {
    ToursSlider
  },
  props: ["error"],
  computed: {
    ...mapGetters({
      popularTours: "tours/popularTours",
      locale: "lang/locale"
    }),
    city() {
      // CITYSWITCH
      // const cities = ["tallinn", "spb"];
      const cities = ["spb"];
      const { fullPath, params } = this.$route;
      let { city } = params;

      if (!city || !cities.includes(city)) {
        city = cities.find(city => fullPath.split("/").includes(city));

        if (!city) {
          city = "spb";
        }
      }

      return city;
    }
  },
  serverPrefetch() {
    return this.loadTours();
  },
  mounted() {
    this.loadTours();
  },
  methods: {
    loadTours() {
      return this.$store.dispatch("tours/loadTours", this.city);
    }
  }
};
</script>

<style lang="sass" scoped>
.ntf
  @media (min-width: $tab + 1)
    padding-top: calc(var(--header-h) + 64px)
    padding-bottom: 32px
    padding-left: calc(#{mix(1)} + (#{columns(2)} / 2))

  @media (max-width: $tab)
    padding-top: calc(var(--header-h) + 32px)

.ntf__inner
  display: flex
  align-items: center

  @media (max-width: $tab)
    flex-direction: column

.ntf__img
  display: block
  height: auto

  @media (min-width: $tab + 1)
    width: mix(4)
    margin-right: 80px

  @media (max-width: $tab)
    width: 280px

.ntf__text
  padding-top: 88px

  @media (max-width: $tab)
    padding-top: 24px

.ntf__text .t-h2
  margin-bottom: 16px

.ntf__text p
  margin-bottom: 32px
  max-width: 27em
  font-size: 18px

  @media (max-width: 1400px)
    font-size: 16px

.ntf__text .btn
  width: 200px
</style>
