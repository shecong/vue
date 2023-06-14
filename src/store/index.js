import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        tab
    },
    state:{
        token:JSON.parse(sessionStorage.getItem('Token'))
    }, 
    mutations: {
      setSession(state, session) {
        state.session = session
        sessionStorage.setItem('Token', JSON.stringify(session))
      }
    },
    actions: {
      loadSession({ commit }) {
        const session = JSON.parse(sessionStorage.getItem('Token'))
        commit('Token', session)
      }
    }
  })
  
export default store 