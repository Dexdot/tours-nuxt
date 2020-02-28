import Footer from "~/components/Footer";

export default {
  components: {
    Footer
  },
  async validate({ app, params, store }) {
    const { city } = params;
    if (!city) return true;

    return Object.keys(app.i18n.t("cities")).includes(city);
  }
};
