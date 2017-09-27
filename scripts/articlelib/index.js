//对一篇文章进行分析


var fs = require('fs')
var parse = require('./front_format.js')
var md5 = require('md5')

module.exports  = function(file_path){
  let _str = fs.readFileSync(file_path,{encoding:'utf-8'})

  let res =  parse(_str)
  res.md5 = md5(_str)

  return res
}
