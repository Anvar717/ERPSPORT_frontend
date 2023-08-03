
const state = () => ({
  translates: {
    oz: {},
    ru: {},
    uz: {}
  },
  locales: [
    { key: 'oz', name: 'O\'zbek' },
    { key: 'uz', name: 'Ўзбек' },
    { key: 'ru', name: 'Рус' }
  ]
})

const mutations = { 
  SET_LOCALE: (state, locale) => (state.locale = locale),
  SET_TRANSLATES: (state, data) => {
    data.forEach(item => {
      try {
        let a = item
      } catch (e) {
        console.log(item)
      }
      state.translates.oz[item.key] = item.oz ? item.oz : item.key
      state.translates.ru[item.key] = item.ru ? item.ru : item.key
      state.translates.uz[item.key] = item.uz ? item.uz : item.key
    })
  }
}
const getters = {
  LOCALE: (state) => state.locale,
  LOCALES: (state) => state.locales,
  TRANSLATES: (state) => state.translates
}
const actions = {
  getTranslates({ commit }) {
    fetch('https://opensheet.elk.sh/1Xz89_Vhw-mSz4OLEoQneW5I4i7VkSWT_ivfg7gMO0Yc/1')
    .then((res) => res.json())
    .then((data) => {
      commit('SET_TRANSLATES', data)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
