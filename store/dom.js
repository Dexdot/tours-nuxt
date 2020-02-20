export const state = () => ({
  scrollDisabled: false,
  isMenuActive: false
});

export const getters = {
  isLight({ isLight }) {
    return isLight;
  },
  isMenuActive({ isMenuActive }) {
    return isMenuActive;
  },
  scrollDisabled({ scrollDisabled }) {
    return scrollDisabled;
  }
};

export const mutations = {
  toggleLight(state, isLight) {
    state.isLight = isLight;
  },
  disableScroll(state) {
    state.scrollDisabled = true;
  },
  enableScroll(state) {
    state.scrollDisabled = false;
  },
  toggleMenu(state) {
    state.isMenuActive = !state.isMenuActive;
  }
};

export const actions = {
  toggleLight({ commit }, isLight) {
    commit('toggleLight', isLight);
  },
  toggleMenu({ commit, state }) {
    commit('toggleMenu');

    if (!state.isMenuActive) {
      commit('disableScroll');
    } else {
      commit('enableScroll');
    }
  }
};
