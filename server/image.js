var path = require('path');
var fs = require('fs')
module.exports =function(req,res,next){
  let options = {
    root: __dirname + '/images/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
  let name  = req.params.name

  let image_base_path = path.join(__dirname,'images')
  let image_path = path.join(image_base_path,name)
  if(! fs.existsSync(image_path))
    name = '404.jpg'

  debug(name)

  res.sendFile(name, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      debug('Sent:', name);
    }
  });
}
