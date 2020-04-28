
const LRU = require('./lruCache')

let lruCache = new LRU(3);

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
  lruCache.write(key, data);
  res.send(data)
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

function isAvailable(key) {
  const isAvailable = lruCache.checkKey(key);
  console.log("check is avaible-->",isAvailable)
  return isAvailable;
}

function get(key) {
  return lruCache.read(key);
}

module.exports = { before , after }