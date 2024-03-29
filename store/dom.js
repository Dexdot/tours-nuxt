export const state = () => ({
  // bukzaID: "",
  bukzaID: "1683135805530",
  scrollTop: 0,
  scrollDisabled: false,
  isMenuActive: false,
  isBukzaActive: false,
  isCallbackActive: false,
  isCreditsActive: false,
  isAddReviewActive: false,
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
  isAddReviewActive({ isAddReviewActive }) {
    return isAddReviewActive;
  },
  isCreditsActive({ isCreditsActive }) {
    return isCreditsActive;
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
  toggleCredits(state) {
    state.isCreditsActive = !state.isCreditsActive;
  },
  toggleCallback(state) {
    state.isCallbackActive = !state.isCallbackActive;
  },
  toggleAddReview(state) {
    state.isAddReviewActive = !state.isAddReviewActive;
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
  toggleCredits({ commit, state }) {
    commit("toggleCredits");

    if (state.isCreditsActive) {
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
  toggleAddReview({ commit, state }) {
    if (state.isMenuActive) {
      commit("toggleMenu");
    }

    commit("toggleAddReview");
    if (state.isAddReviewActive) {
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
