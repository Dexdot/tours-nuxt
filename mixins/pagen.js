import Pagen from "~/ui/Pagen";

export default {
  components: {
    Pagen
  },
  data: () => ({
    pagen: {
      index: 0,
      limit: 6
    }
  }),
  computed: {
    pagenSkip() {
      return this.pagen.index * this.pagen.limit;
    }
  },
  watch: {
    "pagen.index"() {
      window.scrollTo(0, 0);
    }
  },
  methods: {
    onPagenClick(i) {
      this.pagen.index = i;
    }
  }
};
