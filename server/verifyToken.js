var fs = require("fs")
var path = require("path")

var Gtoken = fs.readFileSync(path.join(__dirname,'token.txt'),{encoding:'utf-8'})
Gtoken = Gtoken.trim()
debug("token:",Gtoken)

module.exports = async function(req,res,next){

  let token = req.headers["token"]
  if(token === undefined){
    next({
      status:-1,
      message:"need token"
    })
  }

  debug("请求的token:",token)
  debug("是否相等:",token == Gtoken)
  debug(token.length)
  debug(Gtoken.length)

  if(Gtoken === token){
    next()
  }
  else {
    next({
      status:-1,
      message:"token error"
    })
  }

}
