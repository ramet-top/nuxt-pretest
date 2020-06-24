export const state = () => ({
  counter: 0,
  drawer: false
})

export const mutations = {
  increment(state) {
    state.counter++
  },

  setDrawer(state, nawDrawerState) {
    state.drawer = nawDrawerState
    console.log('state new drawer', nawDrawerState)
  }
}
