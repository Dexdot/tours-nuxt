import { getRandomFromRange } from "~/assets/scripts/helpers";
import { isMobileDevice } from "~/assets/scripts/detect";

const math = {
  map: (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c,
  lerp: (a, b, n) => (1 - n) * a + n * b
};

let winsize;
let docScroll = 1;

// Y
class Parallax {
  constructor({
    el,
    childSelector = "img",
    property = "translateY",
    options = {}
  }) {
    this.DOM = { el };
    this.DOM.child = this.DOM.el.querySelector(childSelector);

    this.minus = options && options.minus ? "-" : "";
    this.property = property;

    this.renderedStyles = {
      translateY: {
        previous: 0,
        current: 0,
        ease: 0.075,
        maxValue: getRandomFromRange(15, 30),
        ...options,
        setValue: () => {
          const { maxValue } = this.renderedStyles.translateY;
          const minValue = -1 * maxValue;

          return Math.max(
            Math.min(
              math.map(
                this.props.top - docScroll,
                winsize.height,
                -1 * this.props.height,
                minValue,
                maxValue
              ),
              maxValue
            ),
            minValue
          );
        }
      },
      scale: {
        previous: 0,
        current: 0,
        ease: 0.05,
        minValue: 1,
        maxValue: 1.3,
        ...options,
        setValue: () => {
          const { minValue, maxValue } = this.renderedStyles.scale;

          return Math.max(
            Math.min(
              math.map(
                this.props.top - docScroll,
                winsize.height,
                -1 * this.props.height,
                minValue,
                maxValue
              ),
              maxValue
            ),
            minValue
          );
        }
      }
    };

    this.DOM.child.style.willChange = "transform";
    this.update();

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        this.isVisible = entry.intersectionRatio > 0;
      });
    });
    this.observer.observe(this.DOM.el);

    this.initEvents();
  }

  destroy() {
    this.observer.unobserve(this.DOM.el);
    window.removeEventListener("resize", this.resize);
  }

  update() {
    this.getSize();

    for (const key in this.renderedStyles) {
      this.renderedStyles[key].current = this.renderedStyles[
        key
      ].previous = this.renderedStyles[key].setValue();
    }

    this.layout();
  }

  getSize() {
    const rect = this.DOM.el.getBoundingClientRect();
    this.props = {
      height: rect.height,
      width: rect.width,
      top: docScroll + rect.top
    };
  }

  initEvents() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.update();
  }

  render() {
    for (const key in this.renderedStyles) {
      this.renderedStyles[key].current = this.renderedStyles[key].setValue();

      this.renderedStyles[key].previous = math.lerp(
        this.renderedStyles[key].previous,
        this.renderedStyles[key].current,
        this.renderedStyles[key].ease
      );
    }

    this.layout();
  }

  layout() {
    if (this.property === "scale") {
      this.DOM.child.style.transform = `scale(${this.renderedStyles.scale.previous})`;
    } else {
      const scale = 1.05;

      this.DOM.child.style.transform = `translate3d(0,${this.minus}${this.renderedStyles.translateY.previous}px,0) scale(${scale})`;
    }
  }
}

export default {
  data: () => ({
    parallaxRAF: 0,
    parallaxItems: []
  }),
  mounted() {
    if (!isMobileDevice() && !this.disableParallax) {
      this.$nextTick(() => {
        this.initParallax();
      });
    }
  },
  beforeDestroy() {
    this.destroyParallax();
  },
  methods: {
    animateParallax() {
      this.parallaxItems.forEach(item => {
        if (item.isVisible) item.render();
      });

      this.parallaxRAF = requestAnimationFrame(() => this.animateParallax());
    },
    initParallax() {
      this.calcWinsize();
      this.getPageYScroll();
      window.addEventListener("resize", this.calcWinsize.bind(this));
      window.addEventListener("scroll", this.getPageYScroll.bind(this));

      const parallaxItems = Array.from(
        this.$el.querySelectorAll(".js-parallax")
      );
      parallaxItems.forEach(el => {
        this.parallaxItems.push(new Parallax({ el }));
      });

      const parallaxItemsSacle = Array.from(
        this.$el.querySelectorAll(".js-parallax-scale")
      );
      parallaxItemsSacle.forEach(el => {
        this.parallaxItems.push(new Parallax({ el, property: "scale" }));
      });

      this.parallaxRAF = requestAnimationFrame(() => this.animateParallax());
    },
    destroyParallax() {
      window.removeEventListener("resize", this.calcWinsize);
      window.removeEventListener("scroll", this.getPageYScroll);
      window.cancelAnimationFrame(this.parallaxRAF);

      this.parallaxItems.forEach(item => {
        item.destroy();
      });
    },
    getPageYScroll: () => {
      docScroll = window.pageYOffset || document.documentElement.scrollTop;
    },
    calcWinsize() {
      winsize = { width: window.innerWidth, height: window.innerHeight };
      this.getPageYScroll();
    }
  }
};
