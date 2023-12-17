export default {
  mounted() {
    if (
      document.readyState === "interactive" ||
      document.readyState === "complete"
    ) {
      this.observeAnimate();
    } else {
      document.addEventListener("DOMContentLoaded", () => {
        setTimeout(() => {
          this.observeAnimate();
        }, 200);
      });
    }
  },
  methods: {
    observeAnimate() {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) {
            target.classList.add("visible");
          }
        });
      });

      const elements = Array.from(this.$el.querySelectorAll("[data-animate]"));
      elements.forEach(el => {
        observer.observe(el);
      });
    }
  }
};
