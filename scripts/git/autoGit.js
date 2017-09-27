'use strict'

global.config = require('../../config.js')
global.utils = require('./utils/index.js')
var shortid  = require('shortid')

let fs = utils.fs

var git = require('./gitlib/GitSync.js')

async function autoGit(){

  //更新git
  try {
    utils.log.info('开始更新Git仓库:',config.remote)
    let ans = await git()
  }
  catch(e){
    utils.log.error(e)
    return ;
  }
  utils.log.info('更新Git仓库完毕!')

  let baseDir = config.local;
  let ls = await fs.listDirSync(baseDir+'_posts')
  //分析 _post 得到数据
  for(let i = 0 ;i< ls.length;i++){

    utils.log.info('开始分析: '+ls[i])

    let _content = fs.readFileSync( baseDir +'_posts/'+ ls[i],{encoding:'utf8'})
    let con =  utils.article.parse(_content)
    let md5 = utils.md5(_content)
    let find = await utils.DbOpt.findOne(con._id)

    if(find === null){
      con.md5 = md5
      con.hidden = false
      await utils.DbOpt.updateOne(con)
      utils.log.info('加入数据库完毕: '+ls[i])
    }
    else if(find.md5 === md5){ //不用更新
      utils.log.info('不用更新数据库: '+ls[i])
    }
    else { //更新
      con.md5 = md5
      await utils.DbOpt.updateOne(con)
      utils.log.info('更新数据库完毕: '+ls[i])
    }
  }

  //把_trash文件下的 hidden
  let ls_t = await fs.listDirSync(baseDir+'_trash')
  for(let i = 0 ;i <ls_t.length;i++){
    let _content = fs.readFileSync( baseDir+'_trash/' + ls_t[i],{encoding:'utf8'})
    let con =  utils.article.parse(_content)
    await utils.DbOpt.updateOne({_id:con._id,hidden:true})
  }
  
  utils.log.info('更新完毕');
}

autoGit()
//引入
//var later = require('later')
//later.date.localTime()
//var sched = later.parse.text('every '+config.Sync_time+' mins')
//
//let t  = later.setInterval(function(){
//  autoGit()
//},sched)
