var md5  = require('md5')
var moment = require('moment')

function timeFormat(time,format){
  let _format = format || 'YYYY MM D HH:mm'
  return moment(time).format(_format);
}

export {
  md5,
  timeFormat
}

