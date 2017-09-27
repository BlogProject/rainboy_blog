
var config = require('../config.js')
var rq = require('request-promise')
function get(){

}

async function post(data){

  let opts = {
    uri:config.server_url+'/article/opt/upload',
    headers:{
      token:config.token
    },
    method:'POST',
    body:data,
    json:true
  }

  let res = await rq(opts)
}

exports.post = post
