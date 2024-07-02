<template>
  <div class="tip u-center">
    <TipButton class="tip-btn" ref="button" />
    <span class="tip-content">
      <slot></slot>
    </span>
  </div>
</template>

<script>
import TipButton from "~/ui/TipButton";

export default {
  components: {
    TipButton
  },
  mounted() {
    this.$nextTick(() => {
      this.onMouseenter();
      this.$refs.button.$el.addEventListener(
        "mouseenter",
        this.onMouseenter.bind(this)
      );
    });
  },
  beforeDestroy() {
    this.$refs.button.$el.removeEventListener("mouseenter", this.onMouseenter);
  },
  methods: {
    onMouseenter() {
      const el = this.$refs.button.$el;
      const top = el.offsetTop + el.offsetHeight / 2;
      const right = el.offsetLeft + el.offsetWidth;

      this.$el.style.setProperty("--tip-btn-offset-top", `${top}px`);
      this.$el.style.setProperty("--tip-btn-offset-left", `${right}px`);
    }
  }
};
</script>

<style lang="sass" scoped>
// Tip
.tip
  width: 16px
  height: 16px
  position: relative

  @media (max-width: $mob)
    position: static

// Button
.tip-btn:focus,
.tip-btn:hover
  & + .tip-content
    opacity: 1
    transform: translate(16px, 0)

    @media (max-width: $mob)
      transform: translate(0, 0)


// Content
.tip-content
  z-index: 1
  position: absolute
  top: -16px
  left: 100%

  transform: translate(16px, 0)

  width: 302px
  padding: 24px

  line-height: 1.4
  background: var(--sec-c)
  opacity: 0
  pointer-events: none
  transition: opacity 0.25s

  @media (max-width: $mob)
    width: auto
    transform: translate(0, 0)
    top: calc(var(--tip-btn-offset-top) + 24px)
    left: 0


.tip-content /deep/
  div:not(:last-child)
    p, a
      margin-bottom: 8px

.tip-content /deep/ a
  +link(var(--acc-c))


// Content triangle
.tip-content::before
  content: ''
  position: absolute
  top: 16px
  right: 100%
  transform: translate(0, 0)

  width: 0
  height: 0

  border-style: solid
  border-width: 8px 13.9px 8px 0
  border-color: transparent var(--sec-c) transparent transparent

  @media (max-width: $mob)
    top: unset
    bottom: 100%
    left: var(--tip-btn-offset-left)
    transform: translate(-100%, 0)

    border-width: 0 8px 13.9px 8px
    border-color: transparent transparent var(--sec-c) transparent
</style>
