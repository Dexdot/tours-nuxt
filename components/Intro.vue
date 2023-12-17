<template>
  <section class="preloader u-center">
    <img src="~assets/img/umbrella.svg" alt="Logo" />
  </section>
</template>

<script>
export default {
  mounted() {
    if (
      document.readyState === "interactive" ||
      document.readyState === "complete"
    ) {
      this.complete();
    } else {
      document.addEventListener("DOMContentLoaded", this.complete.bind(this));
    }
  },
  methods: {
    complete() {
      this.$el.style.opacity = 0;
      this.$el.style.pointerEvents = "none";
      setTimeout(() => {
        this.$emit("complete");
      }, 200);
    }
  }
};
</script>

<style lang="sass" scoped>
.preloader
  z-index: 10
  position: fixed
  top: 0
  left: 0

  width: 100vw
  height: 100vh

  background: #EFE5DA
  transition: opacity 0.2s ease

.preloader img
  animation: jump 1s cubic-bezier(0.165, 0.44, 0.64, 1) 0s infinite normal forwards

@keyframes jump
  20%
    transform: translateY(2px) scaleY(0.9)
  40%
    transform: translateY(-48px) scaleY(1.2)
  50%
    transform: translateY(8px) scaleY(0.8)
  70%
    transform: translateY(-4px) scaleY(1)
  80%, 100%
    transform: translateY(0px) scaleY(1)
</style>
