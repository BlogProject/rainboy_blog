var express = require('express');
var router = express.Router();
var Promise = require('bluebird')

var MA = M['article']
/* GET article listing. */
router.get('/',async function(req, res, next) {

  let page = req.query.page || 1
  let pageSize = req.query.pageSize || 10

  let query = MA.find({hidden:false})

  if( req.query.tags){
    debug("tags:",tags)
    let tags = req.query.tags.split("|")
    debug("tags:",tags)
    query  = query.where("tags").in(tags)
  }


  if(req.query.category){
    let category = req.query.category
    debug("category:",category)
    query  = query.where('category').equals(category)
  }

  let sort = "-date"
  if(req.query.sort == '1'){
    sort = "date"
    debug("sort:",sort)
    query = query.sort(sort)
  }

  let count = await query.count()

  let skip= Math.ceil(page-1)*pageSize
  let limit = pageSize
  let data = await query.skip(skip).limit(limit).select("-content")

  res.json({
    page:page,
    pageSize:pageSize,
    count:count,
    data:data
  })

});

router.get('/:id',async function(req, res, next) {
  let doc = await MA.findeOne({_id:req.params.id,hidden:false})

  if(doc == null){
    return json({
      status:-1,
      message:"not found"
    })
  }
  else {
    return json({
      status:0,
      doc:doc
    })
  }
});


router.get('/opt/cst',async function(req,res,next){
  let docs = await MA.find({}).select("title tags")
  let category_set = new Set();
  let tags_set = new Set();
  let series_set = new Set();

  await Promise.map(docs,function(data){
    if( typeof(data.category) == 'object')
    data.category.forEach(function(_data){ category_set.add(_data)})
    if( typeof(data.tags) == 'object')
    data.tags.forEach(function(_data){ tags_set.add(_data)})
    if( data.series !== null && data.series !== undefined )
    series_set.add(data.series)
  })
  res.json({
    status:0,
    category:Array.from(category_set),
    tags:Array.from(tags_set),
    series:Array.from(series_set)
  })
})


router.post('/opt/upload',verifyToken,async function(req, res, next) {
  let body = req.body
  let _id = body._id
  delete body._id
  let doc = await MA.findOneAndUpdate({_id:_id},body,{upsert:true})
  res.json({
    status:0,
    doc:doc
  })

})

//router.delete('/:id',verifyToken,async function(req, res, next) {
//})

module.exports = router;
