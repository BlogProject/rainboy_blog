//文件操作
var Promise = require('bluebird');
var fs = require('fs');
var pathFn = require('path');


var join = pathFn.join;
var dirname = pathFn.dirname;
var createReadStream = fs.createReadStream;
var createWriteStream = fs.createWriteStream;


var rEOL = new RegExp('\\r\\n', 'g');


/* -------- promisify ---------- */
var mkdirAsync = function(path){ // 1 ---- 
    return new Promise( function(res,rej){
        res( mkdirsSync(path));
    });

};

var readDirSync = function(path){
    return new Promise( function(res,rej){
        res( fs.readdirSync(path));
    });

};

var statSync = function(path){
    return new Promise(function(res,rej){
        res(fs.statSync(path));
    });
};

var exists = function(path,callback){
    if (!path) throw new TypeError('path is required!');
    return new Promise(function(res,rej){
        fs.exists(path,function(exist){
            res(exist);
            if (typeof callback === 'function') callback(exist);
        });
    });
};

/* -------- promisify  End --------- */


/* -------- base function --------- */
function checkParentSync(path) {
  if (!path) throw new TypeError('path is required!');

  var parent = dirname(path);
  var exist = fs.existsSync(parent);

  if (exist) return;

  try {
    mkdirsSync(parent);
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}


function escapeEOL(str) {
  return str.replace(rEOL, '\n');
}

function escapeBOM(str) {
  return str.charCodeAt(0) === 0xFEFF ? str.substring(1) : str;
}

function escapeFileContent(content) {
  return escapeBOM(escapeEOL(content));
}

function mkdirs(path, callback) {
  if (!path) throw new TypeError('path is required!');

  var parent = dirname(path);

  return exists(parent).then(function(exist) {
    if (!exist) return mkdirs(parent);
  }).then(function() {
    return mkdirAsync(path);
  }).catch(function(err) {
    if (err) throw err;
  }).asCallback(callback);
}

function mkdirsSync(path) {
  if (!path) throw new TypeError('path is required!');

  var parent = dirname(path);
  var exist = fs.existsSync(parent);

  if (!exist) mkdirsSync(parent);
  exist = fs.existsSync(path);
  if(!exist) fs.mkdirSync(path);
}

function checkParent(path) {
  if (!path) throw new TypeError('path is required!');

  var parent = dirname(path);

  return exists(parent).then(function(exist) {
    if (!exist) return mkdirs(parent);
  });
}

function rmdirSync(path) {
  if (!path) throw new TypeError('path is required!');

  var files = fs.readdirSync(path);
  var childPath;
  var stats;

  for (var i = 0, len = files.length; i < len; i++) {
    childPath = join(path, files[i]);
    stats = fs.statSync(childPath);

    if (stats.isDirectory()) {
      rmdirSync(childPath);
    } else {
      fs.unlinkSync(childPath);
    }
  }

  fs.rmdirSync(path);
}


function reduceFiles(result, item) {
  if (Array.isArray(item)) {
    return result.concat(item);
  }

  result.push(item);
  return result;
}

function trueFn(){
    return true;
}

function ignoreHiddenFiles(ignore) {
  if (!ignore) return trueFn;

  return function(item) {
    return item[0] !== '.';
  };
}

function ignoreFilesRegex(regex) {
  if (!regex) return trueFn;

  return function(item) {
    return !regex.test(item);
  };
}


function copyFile(src, dest, callback) {
  if (!src) throw new TypeError('src is required!');
  if (!dest) throw new TypeError('dest is required!');

  return checkParent(dest).then(function() {
    return new Promise(function(resolve, reject) {
      var rs = createReadStream(src);
      var ws = createWriteStream(dest);

      rs.pipe(ws)
        .on('error', reject);

      ws.on('close', resolve)
        .on('error', reject);
    });
  }).asCallback(callback);
}


function _readAndFilterDir(path, options) {
  return readDirSync(path)
    .filter(ignoreHiddenFiles(options.ignoreHidden == null ? true : options.ignoreHidden))
    .filter(ignoreFilesRegex(options.ignorePattern))
    .map(function(item) {
      var fullPath = join(path, item);

      return statSync(fullPath).then(function(stats) {
        return {
          isDirectory: stats.isDirectory(),
          path: item,
          fullPath: fullPath
        };
      });
    });
}

var _readAndFilterDirSync = _readAndFilterDir;

function emptyDirSync(path,options,parent){
  if (!path) throw new TypeError('path is required!');
  options = options || {};
  parent = parent || '';

  return _readAndFilterDir(path,options).map(function(item){
        var childPath = item.fullPath;
        if(item.isDirectory){
            var removed = emptyDirSync(childPath,options,join(parent,item.path));

            if (!fs.readdirSync(childPath).length) {
                rmdirSync(childPath);
            }
            return removed;
        }

      fs.unlinkSync(childPath);
      return join(parent,item.path);
  }).reduce(reduceFiles,[]);

}


/* -------------- copyDir ---------------- */
function _copyDir(src, dest, options, parent) {
  options = options || {};
  parent = parent || '';

  return checkParent(dest).then(function() {
    return _readAndFilterDir(src, options);
  })
  .map(function(item) {
    var childSrc = item.fullPath;
    var childDest = join(dest, item.path);

    if (item.isDirectory) {
      return _copyDir(childSrc, childDest, options, join(parent, item.path));
    }

    return copyFile(childSrc, childDest, options)
      .thenReturn(join(parent, item.path));
  }).reduce(reduceFiles, []);
}

function copyDir(src, dest, options, callback) {
  if (!src) throw new TypeError('src is required!');
  if (!dest) throw new TypeError('dest is required!');

  if (!callback && typeof options === 'function') {
    callback = options;
    options = {};
  }

  return _copyDir(src, dest, options).asCallback(callback);
}





function readFileSync(path, options) {
  if (!path) throw new TypeError('path is required!');

  options = options || {};
  if (!options.hasOwnProperty('encoding')) options.encoding = 'utf8';

  var content = fs.readFileSync(path, options);

  if (options.escape == null || options.escape) {
    return escapeFileContent(content);
  }

  return content;
}


function writeFileSync(path, data, options) {
  if (!path) throw new TypeError('path is required!');

  checkParentSync(path);
  fs.writeFileSync(path, data, options);
}



/*-------- list dir --------*/
function _listDir(path, options, parent) {
  options = options || {};
  parent = parent || '';

  return _readAndFilterDir(path, options).map(function(item) {
    if (item.isDirectory) {
      return _listDir(item.fullPath, options, join(parent, item.path));
    }

    return join(parent, item.path);
  }).reduce(reduceFiles, []);
}

function listDir(path, options, callback) {
  if (!path) throw new TypeError('path is required!');

  if (!callback && typeof options === 'function') {
    callback = options;
    options = {};
  }

  return _listDir(path, options).asCallback(callback);
}

function listDirSync(path, options, parent) {
  if (!path) throw new TypeError('path is required!');

  options = options || {};
  parent = parent || '';

  return _readAndFilterDirSync(path, options).map(function(item) {
    if (item.isDirectory) {
      return listDirSync(item.fullPath, options, join(parent, item.path));
    }

    return join(parent, item.path);
  }).reduce(reduceFiles, []);
}

function listDirDeep1(path, options, parent) {
  if (!path) throw new TypeError('path is required!');
  options = options || {};
  parent = parent || '';

  return _readAndFilterDir(path, options).map(function(item) {
    if (item.isDirectory) {
		return ;
    }

    return join(parent, item.path);
  }).reduce(reduceFiles, []);
}



exports.emptyDirSync= emptyDirSync;
exports.copyDir= copyDir;
exports.statSync = fs.statSync;
exports.existsSync = fs.existsSync;
exports.mkdirsSync = mkdirsSync;
exports.readFileSync = readFileSync;
exports.writeFileSync = writeFileSync;


exports.copyFile = copyFile;

/* 列出所有的文件 */
exports.listDir = listDir;
exports.listDirSync = listDirSync;
exports.listDirDeep1 =listDirDeep1;
