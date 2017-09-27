'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema
let config = require('../../../config.js')



//加载model
let article =  require('../../models/article.js')
var ArticleModel = mongoose.model('Article',new Schema(article({})),'article')
let c = mongoose.connect(config.DB.addr,config.DB.opts)
mongoose.connection.on('open',function(){
  console.log('打开数据库成功')
})




/* 查找一篇文章 */
async function findOne(id){
  let one = await ArticleModel.findOne({_id:id,hidden:false}).select('md5')
  return one;
}


/* 更新一篇文章,如果没有就插入 */
async function updateOne(obj){
  let _id = obj._id
  delete obj._id
  await ArticleModel.update({_id:_id},obj,{upsert:true})
}


module.exports = {
  findOne:findOne,
  updateOne:updateOne
}
