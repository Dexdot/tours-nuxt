export const state = () => ({
  scrollTop: 0,
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
  disableScroll({ commit }) {
    commit("disableScroll");
  },
  enableScroll({ commit }) {
    commit("enableScroll");
  }
};
