import transitions from '~/assets/scripts/transitions/index';

export default {
  mode: 'out-in',
  async enter(el, done) {
    await transitions.cover.enter(el);
    done();
  },
  leave(el, done) {
    const isMenuActive = this.$store.getters['dom/isMenuActive'];
    const delay = isMenuActive ? 1040 : 0;
    if (isMenuActive) this.$store.dispatch('dom/toggleMenu');

    // timeout - transition-duration
    setTimeout(async () => {
      await transitions.cover.leave(el);

      // Scroll reset
      document.querySelector('.scroll-container').style.transform = '';
      window.scrollTo(0, 0);

      done();
    }, delay);
  }
};
