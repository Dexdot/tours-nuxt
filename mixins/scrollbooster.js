export default {
  data: () => ({
    scrollBooster: {
      instance: {},
      payload: {
        dragOffset: {
          x: 0,
          y: 0
        }
      }
    }
  }),
  beforeDestroy() {
    this.destroyScrollBooster();
  },
  methods: {
    initScrollBooster() {
      const viewport = this.$el.querySelector(".js-sb");
      const content = viewport.firstElementChild;

      if (!content) return false;

      // Cursor style
      content.style.cursor = "grab";
      content.style.willChange = "transform";

      // Set draggable false to links and images
      viewport.querySelectorAll("a, img").forEach(child => {
        child.draggable = false;
        child.ondragstart = "return false";
      });

      const sb = new this.scrollbooster({
        viewport,
        content,
        mode: "x",
        onUpdate: payload => {
          this.scrollBooster.payload = payload;
          content.style.transform = `translateX(${-payload.position.x}px)`;
        }
      });

      this.scrollBooster.instance = sb;
    },
    destroyScrollBooster() {
      this.scrollBooster.instance.destroy();
    },
    onScrollBoosterClick(e) {
      const link = e.target.closest("a");

      const { x, y } = this.scrollBooster.payload.dragOffset;
      const clickOnly = x === 0 && y === 0;

      // Если мы не драгаем, а просто кликаем, т.е. x,y === 0, то "переходим" по ссылке
      if (!clickOnly || !link) return false;

      const { href, target } = link;

      const { origin } = window.location;
      if (target === "_blank") {
        window.open(href);
      } else if (href.includes(origin)) {
        this.$router.push(href.replace(origin, ""));
      } else {
        window.location = href;
      }
    }
  }
};
