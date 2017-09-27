/* 全局的utils */
var log = require('./log.js')
let config = global.config

log.init(config);

if(config.debug)
  log.Error.setLevel('ALL')
else
  log.Error.setLevel('ERROR')

module.exports = {
  log: log.Error,
  fs:require('./fs.js'),
  md5:require('md5'),
  DbOpt:require('./DbOpt.js'),
  article:require('../articlelib/index.js')
}
