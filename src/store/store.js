import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    rightWeight: 0,
    leftWeight: 0,
    deg:0
  },
  mutations: {
    addRightWeight(state, w) {
      state.rightWeight += w
    },
    addLefttWeight(state, w) {
      state.leftWeight += w
    },
    updateDeg(state, val) {
        state.deg += val
      },

  },
  actions: {
    addRightWeight({
      commit
    }, w) {
      commit('addRightWeight', w)
    },
    addLeftWeight({
      commit
    }, w) {
      commit('addLeftWeight', w)
    },
    updateDeg({
        commit
      }, val) {
        commit('updateDeg', val)
      }
  }
})
