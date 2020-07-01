export const state = () => ({
  drawer: false,
  fixed: false,
  dialog: false,
  title: 'Nuxt.js/Vuetify.js',
  credentials: {
    name: ''
  },

  items: [
    {
      icon: 'fas fa-home',
      title: 'Welcome',
      to: '/'
    },
    {
      icon: 'fas fa-swatchbook',
      title: 'Public Page',
      to: '/inspire'
    },
    {
      icon: 'fas fa-users',
      title: 'Lists User',
      to: '/lists'
    },
    {
      icon: 'fas fa-user',
      title: 'Single Detail',
      to: '/lists/:id'
    }
  ]
})

export const mutations = {
  SET_DRAWER(state, nawDrawerState) {
    state.drawer = nawDrawerState
  },

  SET_CREDENTIALS(state, newCredentialsState) {
    state.credentials.name = newCredentialsState
  },

  SET_DIALOG(state, newDialogState) {
    state.dialog = newDialogState
  }
}

export const actions = {
  setDrawer({ commit }, nawDrawerState) {
    commit('SET_DRAWER', nawDrawerState)
  },
  setCredentials({ commit }, newCredentialsState) {
    commit('setCredentials', newCredentialsState)
  },
  setDialog({ commit }, newDialogState) {
    commit('SET_DIALOG', newDialogState)
  }
}

export const getters = {
  drawer: state => {
    return state.drawer
  },
  fixed: state => {
    return state.fixed
  },
  dialog: state => {
    return state.dialog
  },
  title: state => {
    return state.title
  },
  items: state => {
    return state.items
  }
}
