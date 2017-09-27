var base = require('./base.js')

async function post_article(data){
  await base.post(data)
}

exports.post_article = post_article
