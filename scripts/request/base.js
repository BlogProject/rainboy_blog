
var rq = require('request-promise')
function get(){

}

async function post(data){

  let opts = {
    uri:C.server_url+'/article/opt/upload',
    headers:{
      token:C.token
    },
    method:'POST',
    body:data,
    json:true
  }

  let res = await rq(opts)
}

exports.post = post
