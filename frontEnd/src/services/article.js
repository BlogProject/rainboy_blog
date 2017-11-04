import api from './index.js'

export default {
  get(id,force){
    let params = {}
    if( force === true){
        params.force = 'true'
    }
    return api.get('article/'+id,params)
  },
  list(params,force){
    if( force === true){
        params.force = 'true'
    }
    return api.get('article',params)
  }
}
