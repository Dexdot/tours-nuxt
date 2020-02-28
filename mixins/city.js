export default {
  computed: {
    city: {
      get: function() {
        return this.$route.params.city;
      },
      set: function(city) {
        // this.$store.dispatch("city/setCity", { city, i18n: this.$i18n });
        this.$store.dispatch("general/load", { city: this.$route.params.city });
      }
    }
  }
};
