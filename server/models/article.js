var Schema = require("mongoose").Schema
var shortid = require('shortid')

var ArticleSchema = new Schema({
  _id:{type:String,default:shortid.generate},
  title:String, //标题
  category:{type:Array,default:[]},//分类
  content:String,
  summary:String,//摘要
  md5:String,
  visits:{ type:Number, default:0 },//浏览数量
  tags:{type:Array,default:[]},
  hidden:{ type:Boolean, default:false },
  date:{type:Date,default:Date.now},
  update:{type:Date, default:Date.now },
  series:{type:String,default:'无系列'}
});


ArticleSchema.index({ctime:1,title:1,series:1})

module.exports = ArticleSchema
