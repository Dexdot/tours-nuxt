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
  methods: {
    onPagenClick(i) {
      this.pagen.index = i;
    }
  }
};
