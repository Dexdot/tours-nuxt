export default {
  computed: {
    city: {
      get: function() {
        return this.$route.params.city;
      },
      set: function(city) {
        if (city === "spb") {
          this.$i18n.setLocale("ru");
        }

        this.$store.dispatch("lang/setCity", city);
        this.$router.push({ params: { city } });

        this.$store.dispatch("general/load", city);
      }
    }
  }
};
