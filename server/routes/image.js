var express = require('express');
var router = express.Router();

var multer  = require('multer')

var storage = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹会自动创建。
  destination: function (req, file, cb) {
    cb(null, './images')
  }, 
  //给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null,file.originalname );
  }
});  
//添加配置文件到muler对象。
var upload = multer({
  storage: storage
});


//上传图片
router.post('/upload',verifyToken,upload.single('file'), function(req, res, next) {
  debug(req.file)
  res.json({
    status:0,
    message:'ok'
  })
});

module.exports = router;
