export const state = () => ({
  bukzaID: "",
  scrollTop: 0,
  scrollDisabled: false,
  isMenuActive: false,
  isBukzaActive: false,
  isCallbackActive: false,
  isHeaderTransparent: false
});

export const getters = {
  bukzaID({ bukzaID }) {
    return bukzaID;
  },
  isMenuActive({ isMenuActive }) {
    return isMenuActive;
  },
  isBukzaActive({ isBukzaActive }) {
    return isBukzaActive;
  },
  isCallbackActive({ isCallbackActive }) {
    return isCallbackActive;
  },
  scrollDisabled({ scrollDisabled }) {
    return scrollDisabled;
  },
  isHeaderTransparent({ isHeaderTransparent }) {
    return isHeaderTransparent;
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
  toggleCallback(state) {
    state.isCallbackActive = !state.isCallbackActive;
  },
  setBukzaID(state, bukzaID) {
    state.bukzaID = bukzaID;
  },
  setBukzaActive(state, isActive) {
    state.isBukzaActive = isActive;
  },
  setHeaderTransparent(state, isHeaderTransparent) {
    state.isHeaderTransparent = isHeaderTransparent;
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
  toggleCallback({ commit, state }) {
    if (state.isMenuActive) {
      commit("toggleMenu");
    }

    commit("toggleCallback");

    if (state.isCallbackActive) {
      commit("disableScroll");
    } else {
      commit("enableScroll");
    }
  },
  showBukza({ commit, rootGetters }, bukzaID) {
    const id = bukzaID || rootGetters["general/data"].bukzaId;
    commit("setBukzaID", id);
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
  },
  setHeaderTransparent({ commit }, isHeaderTransparent) {
    commit("setHeaderTransparent", isHeaderTransparent);
  }
};
