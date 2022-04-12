<template>
  <ul :class="['social', { 'social--white': isWhite }]">
    <li
      v-for="socialName in computedList"
      :key="socialName"
      :class="`social-li--${socialName}`"
    >
      <a class="u-center" :href="socialMap[socialName]" target="_blank">
        <svg-icon :name="socialName" />
      </a>
    </li>
    <slot></slot>
  </ul>
</template>

<script>
export default {
  props: {
    isWhite: {
      type: Boolean,
      default: false
    },
    socialLinks: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    allSocials: {
      vk: "vk",
      tripadvisor: "tripadvisor",
      whatsapp: "whatsapp",
      inst: "instagram",
      fb: "facebook",
      telegram: "t.me"
    }
  }),
  computed: {
    computedList() {
      return Object.keys(this.allSocials).filter(key =>
        this.socialLinks.some(link => link.includes(this.allSocials[key]))
      );
    },
    socialMap() {
      const socialMap = {};

      this.computedList.forEach(key => {
        const href = this.socialLinks.find(link =>
          link.includes(this.allSocials[key])
        );
        socialMap[key] = href;
      });

      return socialMap;
    }
  }
};
</script>

<style lang="sass" scoped>
.social
  display: flex
  align-items: center

  margin-top: -8px
  margin-left: -8px

.social li
  margin-top: 8px
  margin-left: 8px

.social a
  width: 32px
  height: 32px

  position: relative
  &::before
    content: ''
    position: absolute
    top: 50%
    left: 50%

    transform: translate(-50%, -50%)
    transform-origin: 50% 50%

    width: 100%
    height: 100%

    border-radius: 50%
    border: 1px solid $black
    transition: transform $trs

  &:hover::before
    transform: translate(-50%, -50%) scale(1.1)

.social--white svg
  color: #fff

.social--white a::before
  border: 1px solid #fff
</style>
