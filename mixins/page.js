// import transition from "~/assets/scripts/transitions/default";
import Footer from "~/components/Footer";

export default {
  // transition,
  components: {
    Footer
  },
  async validate({ params, store }) {
    const { city } = params;
    if (!city) return true;

    return store.state.city.cities.includes(city);
  }
};
