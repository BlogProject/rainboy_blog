var log4js = require('log4js');
var mkdirpSync = require('mkdirp').sync
var join = require('path').join


module.exports.init = function (config){
  //生成文件夹
  mkdirpSync( join(config.logPath,'Error'))
  log4js.configure({
    appenders: [
      { type: 'console' },
      { 
        type:'dateFile',
        absolute:true,
        maxLogSize:1024,
        alwaysIncludePattern:true,
        filename:config.logPath,
        pattern:"Error/MM-dd-hh.log",
        category: 'Error'
      }
    ]
  });
}

module.exports.Error = log4js.getLogger('Error')
