var fs  =require("fs")
var path = require("path")
var mongoose = require("mongoose")
mongoose.Promise = require('bluebird');

// 连接数据库
//mongoose.connect(C.mongoConfig.url, C.mongoConfig.options)
mongoose.connect(C.DB.addr,C.DB.opts)

mongoose.connection.on('open',function(){
  console.log('数据库打开成功')
})



var base= path.join(__dirname,"..");
function loadModels(_path){
  let files = fs.readdirSync(_path)
  files.forEach( function(file){
    if(  file == "except") return;

    let file_path = path.join(_path,file)
    let stat = fs.statSync(file_path)

    if( stat.isFile() && path.extname(file) == '.js'){
      let basename = path.basename(file,'.js')
      //建立model
      M[basename] = mongoose.model(basename,require(file_path),basename)
    }
    else if(stat.isDirectory())
      loadModels(file_path)
  })
}

loadModels(base)
