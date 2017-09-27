//检查文件是否存在

var path  = require('path')
var fs = require('fs')
module.exports = function(file_path){

  if(path.extname(file_path) !== '.md')
  {
    console.log('Error:',file_path,'文件后缀名不是md')
    return 0;
  }

  if(fs.existsSync(file_path) == false)
  {
    console.log('Error:',file_path,'文件不存在')
    return 0;
  }

  let file_state = fs.statSync(file_path)

  if( file_state.isDirectory()){
    console.log('Error:',file_path,'是一个文件夹')
    return 0;
  }

  return true;

}
