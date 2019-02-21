import Vue from 'vue'
import Vuex from 'vuex'
import { setNYTimes } from './mutations'
import { getNYTimes } from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    times: null,
    pagination: 0
  },
  mutations: {
    setNYTimes
  },
  actions: {
    getNYTimes
  }
})
