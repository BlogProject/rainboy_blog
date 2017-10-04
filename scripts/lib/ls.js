var fs = require('fs')
var pathFn = require('path')
module.exports = function __list(dir){

  let file_dir = fs.readdirSync(dir);
  if( file_dir.length === 0)
    return [];
  let files = []
  
  for(let i = 0 ; i < file_dir.length;i++){
    let file =  pathFn.join(dir,file_dir[i])
    let file_name = pathFn.basename(file)

    if( C.exclude.indexOf(file_name) !== -1)
      continue;

    let stats = fs.statSync(file)
    if( stats.isDirectory()){
      let file_t = __list(file)
      for(let j = 0 ; j<file_t.length;j++)
        files.push(file_t[j])
    }
    else if( stats.isFile() && pathFn.extname(file) == '.md')
      files.push(file)
  }
  return files
}
