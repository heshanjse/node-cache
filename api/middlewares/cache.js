const NodeCache = require('node-cache')

// stdTTL: time to live in seconds for every generated cache element.
const cache = new NodeCache({ stdTTL: 5*60 })

function getUrlFromRequest(req) {
  console.log('host-->',req.headers.host )
  console.log('orginalhost-->',req.originalUrl)
  const url = req.protocol + '://' + req.headers.host + req.originalUrl
  return url
}

function getkey(req) {
  console.log('host-->',req.headers.host )
  let key = req.originalUrl;
  key = key.replace(/\//g,"");
  console.log("isss",req.body.markets)
  //need to imporve
  key = (req.body.markets)? key+"market"+req.body.markets:key;
  console.log("key",key);
  return key;
}

function before(req, res, next) {
  console.log("body2-->",req.body)
  const key = getkey(req);
  if (isAvailable(key)){
    console.log("is available");
    res.send(get(key));
  }else {
    console.log("no data in cache")
    next();
  }
  
}

function after(req, res, next) {
  const key = getkey(req)
  const data = req.dataobject;
  set(key,data);
  res.send(data)
}


function set(key,data) {
  return cache.set(key, data);
}

function get(key) {
  return cache.get(key);
}

function isAvailable(key) {
  return cache.has(key);
}

function flushAll() {
  return cache.flushAll();
}


//need to fix
function hasKey(req) {
  const key = getkey(req);
  const isExists = cache.has(key);
  return isExists
}

function getStats() {
  const stats = cache.getStats();
  return stats;
}

module.exports = { get, set ,hasKey ,getStats,before,after,flushAll }