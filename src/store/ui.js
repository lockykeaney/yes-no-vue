// initial state
const state = {
    menuOpen: false,
    submitOpen: false,
    onboardingComplete: false
}

// getters
const getters = {
    isMenuOpen: state => state.menuOpen,
    isSubmitOpen: state => state.submitOpen,
    isOnboardingComplete: state => state.onboardingComplete
}

// actions
const actions = {
    openMenu ({ commit, state }) {
        commit('UPDATE_MENU_OPEN', true)
    },
    closeMenu ({ commit, state }) {
        commit('UPDATE_MENU_OPEN', false)
    },
    toggleMenu ({ commit, state }) {
        commit('UPDATE_MENU_OPEN', !state.menuOpen)
    },
    openSubmit ({ commit, state }) {
        commit('UPDATE_SUBMIT_OPEN', true)
    },
    closeSubmit ({ commit, state }) {
        commit('UPDATE_SUBMIT_OPEN', false)
    },
    toggleSubmit ({ commit, state }) {
        commit('TOGGLE_SUBMIT', !state.submitOpen)
    },
    updateOnboarding ({ commit, state }) {
        commit('UPDATE_ONBOARDING', true)
    }
}

// mutations
const mutations = {
    /* eslint-disable no-useless-computed-key */
    ['UPDATE_MENU_OPEN'] (state, menuOpen) {
        state.menuOpen = menuOpen
    },
    ['UPDATE_ONBOARDING'] (state, onboardingComplete) {
        state.onboardingComplete = onboardingComplete
    },
    ['TOGGLE_SUBMIT'] (state, submitOpen) {
        state.submitOpen = submitOpen
    }
}

// export the store module
export default {
    state,
    getters,
    actions,
    mutations
}
