
function isArray(obj){
  return Object.prototype.toString.call(obj)=== '[object Array]'
}


//存最火的5个文章

function saveHot(article_id,vis,title){
  M['content'].findOneAndUpdate({_id:content_id,"hot._id":{$ne:article_id}},{
    $push:{
      hot:{
        $each:[{_id:article_id,visits:vis,title:title}],
        $sort:{visits:-1},
        $slice:5
      }
    }
  }).exec(function(err,doc){
    if(doc == null){ //如果没有更新
      M['content'].findOneAndUpdate({_id:content_id,"hot._id":article_id},{
     "hot.$.visits":vis }).exec()
    }
  })
}

exports.isArray = isArray
exports.saveHot = saveHot
