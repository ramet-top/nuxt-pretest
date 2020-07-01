import Cookies from 'js-cookie'

export const state = () => {}

export const mutations = {
  SET_USER(state, user) {
    state.user = user
    Cookies.set('user', user)
  },
  SET_USER_LOGOUT(state) {
    state.user = null
    Cookies.set('user', null)
  }
}

export const actions = {
  setUser({ commit }, newUserState) {
    commit('SET_USER', newUserState)
  },
  setUserLogout({ commit }) {
    commit('SET_USER_LOGOUT')
  }
}

export const getters = {
  loggedInUser: state => {
    return state.user
  }
}
