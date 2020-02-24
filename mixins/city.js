export default {
  computed: {
    city: {
      get: function() {
        return this.$store.getters["lang/city"];
      },
      set: function(city) {
        if (city === "spb") {
          this.$store.dispatch("lang/setLang", "ru");
          console.log("wanna set ru lang");
        }

        this.$store.dispatch("lang/setCity", city);

        console.log("general/load from city");
        this.$store.dispatch("general/load");
      }
    }
  }
};
