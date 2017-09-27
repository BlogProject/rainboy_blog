var later = require('later')
var config = require('../../config.js')

//定义时间

var textSched = later.parse.text('every '+config.Sync_time+' sec')
later.date.localTime()
var Done = later.setInterval(GitSync,textSched);


function GitSync(){
}
