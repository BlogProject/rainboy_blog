var Schema = require("mongoose").Schema
var ContentSchema = new Schema({
  _id:{type:String},
  category:{type:Array,default:[]},
  tags:{type:Array,default:[]},
  series:{type:Array,default:[]},
  hot:{type:Array,default:[]}
});


module.exports = ContentSchema
