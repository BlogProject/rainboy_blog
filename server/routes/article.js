var express = require('express');
var router = express.Router();
var Promise = require('bluebird')

var MA = M['article']
/* GET article listing. */
router.get('/',async function(req, res, next) {

  let page = req.query.page || 1
  let pageSize = req.query.pageSize || 10

  page = parseInt(page)
  pageSize = parseInt(pageSize)

  let query = MA.find({hidden:false})
  let query_data = {hidden:false}

  if( req.query.tags){
    debug( req.query.tags)
    let tags = []
    tags.push( req.query.tags)
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
  let data = await query.sort(sort).skip(skip).limit(limit).select("-content")

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

  doc.visits++;

  U.saveHot(doc._id,doc.visits,doc.title)

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
  let doc = await M['content'].findOne({});

  doc.status = 0
  res.json(doc)
})


router.post('/opt/upload',verifyToken,async function(req, res, next) {
  let body = req.body
  let _id = body._id
  delete body._id
  body.update = Date.now()
  //body.update = Date.now()
  //debug("body",body)
  let doc = await MA.findOneAndUpdate({_id:_id},body,{upsert:true,setDefaultsOnInsert:true})
  //debug(body.tags,body.series,body.category)

  let series
  let tags = []
  let category = []

  if(!body.series || typeof(body.series) != 'string')
    series = '无系列'
  else
    series = body.series

  if(U.isArray(body.category))  category = body.category
  debug(U.isArray(body.tags))
  if(U.isArray(body.tags))  tags = body.tags

  debug('tags:',tags)
  debug('series:',series)
  debug('category:',category)

  M['content'].updateOne({_id:content_id},{$addToSet:{
    category:{$each: category},
    tags    :{$each: tags},
    series  : series,
  }}).exec()

  res.json({
    status:0,
    doc:doc
  })

})

module.exports = router;
