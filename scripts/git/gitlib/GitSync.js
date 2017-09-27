///自动同步
//
'use strict'
var fs =  require('fs')
var git = require('./spawnGit.js')

let config = global.config
let utils = global.utils
let log = utils.log


var GitSync = async function(){
  let remoteAddr = config.remote
  let branch = config.branch
  let localDir = config.local

  //检查本地文件夹是否存存
  let exits=true
  let stat
  try{
    stat = fs.statSync(localDir)
  }
  catch(e){
    exits = false
  }

  //不存在,开始进行clone
  if(!exits || (exits && !stat.isDirectory())){ 
    console.log('start in')
    let args = 'clone -b '+branch+' '+remoteAddr+' '+localDir;
    try {
        await git(args)
    }
    catch(err){
        log.error(err)
        return ;
    }
    log.info('clone -b '+ config.branch+' '+ config.remote +' ok')
  }
  else { //git pull 更新
    let args = 'pull origin '+branch
    let res
    try {
      res = await git(args,localDir)
    }
    catch(e){
      log.error(e)
    }
    log.info(res)
  }
}

module.exports = GitSync
