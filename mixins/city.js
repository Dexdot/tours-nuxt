export default {
  computed: {
    city: {
      get: function() {
        return this.$store.getters["city/city"];
      },
      set: function(city) {
        if (city === "spb") {
          this.$i18n.setLocale("ru");
        }

        this.$store.dispatch("city/setCity", city);
        this.$store.dispatch("general/load");
      }
    }
  }
};
