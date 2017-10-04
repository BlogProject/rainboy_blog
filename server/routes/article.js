var express = require('express');
var router = express.Router();
var Promise = require('bluebird')

var MA = M['article']
/* GET article listing. */
router.get('/',async function(req, res, next) {

  let page = req.query.page || 1
  let pageSize = req.query.pageSize || 10

  let query = MA.find({hidden:false})
  let query_data = {hidden:false}

  if( req.query.tags){
    debug( req.query.tags)
    let tags = []
    tags.push( req.query.tags)
    console.log(tags)
    debug("tags:",tags)
    query  = query.where("tags").in(tags)
    query_data.tags = {"$in":tags}
  }


  if(req.query.category){
    let category = []
    category.push(req.query.category)
    debug("category:",category)
    query  = query.where('category').in(category)
    query_data.category = {"$in":category}
  }

  let sort = "-update"
  if(req.query.sort == '1'){
    sort = "update"
    debug("sort:",sort)
    query = query.sort(sort)
  }

  let count = await MA.find(query_data).count()

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
  //let doc = await MA.findOne({_id:req.params.id,hidden:false})
  //let nn = await MA.findOneAndUpdate({_id:req.params.id},{"$inc":{visits:1}})
  let doc = await MA.findOneAndUpdate({_id:req.params.id,hidden:false},{"$inc":{visits:1}})

  if(doc == null){
    res.json({
      status:-1,
      message:"not found"
    })
  }
  else {
    res.json({
      status:0,
      doc:doc
    })
  }
});


router.get('/opt/cst',async function(req,res,next){
  let docs = await MA.find({hidden:false}).select("title tags category series")
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
  //let doc = await MA.findOne({_id:_id})

  //if(doc == null){
    //doc = await MA.create(body)
    //res.json({
      //status:0,
      //doc:doc
    //})
    //return 
  //}

  //if( doc.md5 === body.md5){
    //res.json({
      //status:0,
      //doc:doc
    //})
    //return 
  //}

  delete body._id
  doc = await MA.findOneAndUpdate({_id:_id},body,{upsert:true,setDefaultsOnInsert:true})
  res.json({
    status:0,
    doc:doc
  })

})

module.exports = router;
