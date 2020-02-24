export const state = () => ({
  scrollDisabled: false,
  isMenuActive: false
});

export const getters = {
  isMenuActive({ isMenuActive }) {
    return isMenuActive;
  },
  scrollDisabled({ scrollDisabled }) {
    return scrollDisabled;
  }
};

export const mutations = {
  disableScroll(state) {
    state.scrollDisabled = true;
    document.body.classList.add("no-scroll");
  },
  enableScroll(state) {
    state.scrollDisabled = false;
    document.body.classList.remove("no-scroll");
  },
  toggleMenu(state) {
    state.isMenuActive = !state.isMenuActive;
  }
};

export const actions = {
  toggleMenu({ commit, state }) {
    commit("toggleMenu");

    if (state.isMenuActive) {
      commit("disableScroll");
    } else {
      commit("enableScroll");
    }
  }
};
