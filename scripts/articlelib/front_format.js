var yaml = require('js-yaml');
var myDate = require('./time.js');
var rPrefixSep = /^(-{3,}|;{3,})/;
var rFrontMatter = /^(-{3,}|;{3,})[\n,\r]{1,2}([\s\S]+?)[\n,\r]{1,2}\1(?:$|[\n,\r]{1,2}([\s\S]*)$)/;

var rSummary = /^([\s\S])*<!--more-->/


/* 分割文件 YAML信息头 和 真实内容*/
function split(str){
  if (typeof str !== 'string') throw new TypeError('str is required!');

  if (rFrontMatter.test(str)) return splitOld(str);

  return {content: str};
}

function splitOld(str){
  var match = str.match(rFrontMatter);

  return {
    data: match[2],
    content: match[3] || '',
    separator: match[1],
    prefixSeparator: true
  };
}


/* 解析文件post 前面的YAML */
function parse(str,options){
    if (typeof str !== 'string') throw new TypeError('str is required!');

    var splitData = split(str);
    var raw = splitData.data;
    
    /* 如果没有信息头,直接返回 */
    if (!raw) return {content: str};

    var data = parseYAML(raw, options);
    if( data.tags ==null || data.tags == undefined)
      data.tags = []
    
    if (!data) return {content: str};

    /* 把时间  字符串 转换成 时间对象  */
    
    if(!data.date)
        data.date = new Date();
    else
        if(typeof(data.date) === "string" )
            data.date = myDate(data.date);

    if(!data.update)
        data.update = Date.now();
    else
        if(typeof(data.update) === "string" )
            data.update = myDate(data.update);
    data.content = splitData.content.replace(/<!--more-->/,'');

    let __content = splitData.content;
    data.summary = ''
    if( rSummary.test(__content))
    {
      data.summary =   __content.match(rSummary)[0].replace(/<!--more-->/g,'') 
    }
    else {
      data.summary =  __content.substr(0,500);
    }

    return data;
}


function escapeYAML(str){
  if (typeof str !== 'string') throw new TypeError('str is required!');

  return str.replace(/\n(\t+)/g, function(match, tabs){
    var result = '\n';

    for (var i = 0, len = tabs.length; i < len; i++){
      result += '  ';
    }

    return result;
  });
}


function parseYAML(str, options){
  var result = yaml.load(escapeYAML(str), options);
  if (typeof result !== 'object') return;

  return result;
}

exports = module.exports = parse;
exports.parse = parse;
exports.parseYAML = parseYAML;
