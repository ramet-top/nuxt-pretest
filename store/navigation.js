export const state = () => ({
  clipped: false,
  miniVariant: false,
  drawer: false,
  title: 'Nuxt.js/Vuetify.js',

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
  ],

  credentials: {
    name: ''
  },

  fixed: false
})

export const mutations = {
  setDrawer(state, nawDrawerState) {
    state.drawer = nawDrawerState
  },

  setCredentials(state, newCredentialsState) {
    state.credentials.name = newCredentialsState
  }
}
