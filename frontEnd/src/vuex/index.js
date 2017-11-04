import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import api from '../services/ta.js'
export default new Vuex.Store({
  state:{
    tags:[],
    category:[],
    series:[],
    hot:[],
    isGet:false,
  },
  getters:{
    tags: state=>{
      return state.tags;
    },
    series: state => {
      return state.series
    },
    category: state => {
      return state.category
    },
    hot: state => {
      return state.hot
    }
  },
  mutations:{
    getState(state){
      if(state.isGet == false){
        return api.get().then(function(data){
          state.series= data.series
          state.tags= data.tags
          state.category = data.category
          state.hot  = data.hot
          state.isGet = true;
        })
      }
    }
  }
})
