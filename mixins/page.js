import locoscroll from "~/mixins/locoscroll";
import transition from "~/assets/scripts/transitions/default";
import Footer from "~/components/Footer";

export default {
  mixins: [locoscroll],
  transition,
  components: {
    Footer
  }
};
