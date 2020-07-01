import cookieparser from 'cookieparser'

export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    let user = null
    if (req && req.headers && req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      user = (parsed.user && JSON.parse(parsed.user)) || null
    }

    await dispatch('auth/setUser', user)
  }
}
