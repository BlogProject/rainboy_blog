/* 
 * 实现gitpull功能
 * */

var spawn = require('child_process').spawn

function spawnGit(args,workDir){
  return new Promise(function(resolve,reject){
    workDir = workDir || process.cwd()

    let git = spawn('git',args.split(' '),{
      cwd:workDir
    })

    let outData = []
    let totalLength = 0

    let err_outData = []
    let err_totalLength = 0

    git.stdout.on('data',(data)=>{
      outData.push(data)
      totalLength += data.length
    })

    git.stderr.on('data',(data)=>{
      err_outData.push(data)
      err_totalLength += data.length
    })


    git.on('close',(code)=>{
      let buA;
      if(code === 0){
        buA = Buffer.concat(outData,totalLength)
        resolve( buA.toString('utf-8') )
      }
      else{
        buA = Buffer.concat(err_outData,err_totalLength)
        reject({
          code:code,
          message: buA.toString('utf-8') 
        })
      }
    })
  })

}

//spawnGit('clone https://git.coding.net/Rainboy/jandan-girls-pic.git','/home/rainboy/tmp_files/test')
  //.then((ans)=>{
    //console.log(ans)
  //})
  //.catch((err)=>{
    //console.log(err)
  //})
module.exports = spawnGit
