import { TweenMax, Power2 } from "gsap";

const PG_UP = 33;
const PG_DOWN = 34;
const END = 35;
const HOME = 36;

let vuexWatcher = "";

export default {
  mounted() {
    this.$nextTick(() => {
      this.lmS = new this.locoscroll({
        el: document.querySelector(".page-container"),
        smooth: true,
        getDirection: true
      });

      this.lmS.on("scroll", e => {
        this.scroll = { ...e };
        this.$root.$emit("locoscroll", { lmS: this.lmS, scroll: this.scroll });
      });

      this.lmS.update();
      this.lmS.setScroll(0, 0);

      this.subscribe();
    });
  },
  destroyed() {
    this.unsubscribe();
    this.lmS.destroy();
  },
  data: () => ({
    selector: ".page-container",
    scroll: { scroll: { x: 0, y: 0 } },
    lmS: null
  }),
  computed: {
    translateY() {
      return process.client
        ? {
            transform: `translate3d(0, ${this.y}px, 0)`
          }
        : {};
    },
    y() {
      return this.scroll.scroll.y;
    }
  },
  methods: {
    subscribe() {
      vuexWatcher = this.$store.watch(
        (state, getters) => getters["dom/scrollDisabled"],
        scrollDisabled => {
          if (scrollDisabled) {
            window.removeEventListener(
              "keydown",
              this.lmS.scroll.checkKey,
              false
            );
          } else {
            window.addEventListener("keydown", this.lmS.scroll.checkKey, false);
          }
        }
      );

      this.$root.$on("update-scroll", this.updateScroll);
      window.addEventListener("resize", this.onLmsResize);
      window.addEventListener("keydown", this.keydown);
    },
    unsubscribe() {
      if (vuexWatcher) vuexWatcher();

      this.$root.$off("update-scroll", this.updateScroll);
      window.removeEventListener("resize", this.onLmsResize);
      window.removeEventListener("keydown", this.keydown);
    },
    keydown({ keyCode }) {
      const limit = this.lmS.el.scrollHeight - this.lmS.scroll.windowHeight;

      switch (keyCode) {
        case PG_UP:
          this.scrollTo(Math.max(this.y - innerHeight, 0));
          break;
        case PG_DOWN:
          this.scrollTo(Math.min(this.y + innerHeight, limit));
          break;
        case HOME:
          this.scrollTo(0);
          break;
        case END:
          this.scrollTo(limit);
          break;
        default:
          break;
      }
    },
    onLmsResize() {
      this.updateScroll();
    },
    scrollTo(top, onComplete) {
      if (this.lmS.isMobile && !this.lmS.smoothMobile) {
        this.lmS.scrollTo(this.selector, top);
        if (onComplete) onComplete();
      } else {
        this.stopScroll();

        TweenMax.fromTo(
          this.selector,
          0.6,
          {
            y: -this.y
          },
          {
            y: -top,
            ease: Power2.easeInOut,
            onComplete: () => {
              this.lmS.setScroll(0, top);
              this.updateScroll();

              this.startScroll();
              if (onComplete) onComplete();
            }
          }
        );
      }
    },
    updateScroll() {
      if (this.lmS) this.lmS.update();
    },
    stopScroll() {
      const scrollbar =
        this.lmS.scroll.scrollbar ||
        document.querySelector(`.${this.lmS.scrollbarClass}`);

      scrollbar.classList.add("u-hidden");

      if (this.lmS) this.lmS.stop();
    },
    startScroll() {
      const scrollbar =
        this.lmS.scroll.scrollbar ||
        document.querySelector(`.${this.lmS.scrollbarClass}`);

      scrollbar.classList.remove("u-hidden");

      if (this.lmS) this.lmS.start();
    }
  },
  watch: {
    $route() {
      this.updateScroll();
    }
  }
};
