var express = require('express');
var router = express.Router();

var MA = M['article']
/* GET article listing. */
router.get('/',verifyToken,async function(req, res, next) {

  let page = req.query.page || 1
  let pageSize = req.query.pageSize || 10

  let query = MA.find({hidden:false})

  if( req.query.tags){
    console.log(tags)
    let tags = req.query.tags.split("|")
    debug("tags:",tags)
    query  = query.where("tags").in(tags)
  }


  if(req.query.category){
    let category = req.query.category
    debug("category:",category)
    query  = query.where('category').equals(category)
  }

  let sort = "-ctime"
  if(req.query.sort == '1'){
    sort = "ctime"
    debug("sort:",sort)
    query = query.sort(sort)
  }

  let count = await query.count()

  let skip= Math.ceil(page-1)*pageSize
  let limit = pageSize
  let data = await query.skip(skip).limit(limit)

  res.json({
    page:page,
    pageSize:pageSize,
    count:count,
    data:data
  })

});

router.get('/:id',verifyToken,async function(req, res, next) {
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

router.get('/isExit',verifyToken,async function(req, res, next) {
  let _id = req.query._id

  let doc = await MA.findOne({_id:_id}).select('-content')

  if( doc === null)
    res.json({
      status:-1,
      doc:null
    })
  else
    res.json({
      status:0,
      doc:doc
    })
})

module.exports = router;
