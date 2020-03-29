const fetch = require('node-fetch');
const dal = require('../dal/dal');
const cache = require('../middlewares/cache');


exports.getctdata = async(req,res) => {
  const ctdata = await dal.getAvgCloseCTdaysdata();
  return ctdata;
}

exports.getctdatawithmarket = async(req,res) => {
  console.log("markets",req.body.markets)
  const ctdata = await dal.getAvgCloseCTdaysdata(req.body.markets);
  return ctdata;
}

exports.getStats = async() => {
  const stats = await cache.getStats();
  return stats;
}
//need to fix
exports.hasKey = async(key) => {
  const status = await cache.hasKey(key);
  return status;
}

exports.flushallcache = async() => {
  const status = await cache.flushAll();
  return await cache.getStats();
}