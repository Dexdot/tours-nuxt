import locoscroll from "~/mixins/locoscroll";
import Footer from "~/components/Footer";

export default {
  mixins: [locoscroll],
  components: {
    Footer
  },
  async validate({ app, params, store }) {
    const { city } = params;
    if (!city) return true;

    return Object.keys(app.i18n.t("cities")).includes(city);
  }
};
