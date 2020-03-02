export const state = () => ({
  scrollTop: 0,
  scrollDisabled: false,
  isMenuActive: false,
  isBukzaActive: false
});

export const getters = {
  isMenuActive({ isMenuActive }) {
    return isMenuActive;
  },
  isBukzaActive({ isBukzaActive }) {
    return isBukzaActive;
  },
  scrollDisabled({ scrollDisabled }) {
    return scrollDisabled;
  }
};

export const mutations = {
  disableScroll(state) {
    if (state.scrollDisabled) return false;
    state.scrollDisabled = true;

    const { body } = document;
    state.scrollTop = window.pageYOffset;
    body.style.top = `-${state.scrollTop}px`;
    body.classList.add("no-scroll");
  },
  enableScroll(state) {
    if (!state.scrollDisabled) return true;
    state.scrollDisabled = false;

    const { body } = document;
    body.style.top = "";
    body.classList.remove("no-scroll");

    setTimeout(() => {
      window.scrollTo(0, state.scrollTop);
    }, 0);
  },
  toggleMenu(state) {
    state.isMenuActive = !state.isMenuActive;
  },
  setBukzaActive(state, isActive) {
    state.isBukzaActive = isActive;
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
  },
  showBukza({ commit }) {
    commit("setBukzaActive", true);
  },
  hideBukza({ commit }) {
    commit("setBukzaActive", false);
  },
  disableScroll({ commit }) {
    commit("disableScroll");
  },
  enableScroll({ commit }) {
    commit("enableScroll");
  }
};
