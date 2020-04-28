'use strict';
const testController = require('../controllers/controller');
const cache = require('../middlewares/cache');
const lruCache = require('../middlewares/lruCacheImplementation');

module.exports = function (app) {
  const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(error => {
        console.log(error)
        //error.status = util.validateStatusCode(error.status)
        let date = new Date();
        if (process.env.DEBUG == 1) {
          console.log(JSON.stringify({ date, error }));
        }
        res.status(error.status).json(error);
      });
  };

  app.get('/repos/:username', cache.get, asyncMiddleware(async (req, res, next) => {
    let resp = await testController.getdata(req);
    res.json(resp);
  }), cache.set);

  app.post('/postctdata', cache.before, asyncMiddleware(async (req, res, next) => {
    let resp = await testController.getctdatawithmarket(req);
    req.dataobject = resp
    next();
  }),cache.after);

  app.get('/getctdata', cache.before, asyncMiddleware(async (req, res, next) => {
    let resp = await testController.getctdata(req);
    req.dataobject = resp
    next();
  }), cache.after);


  app.get('/getctdata-lru', lruCache.before, asyncMiddleware(async (req, res, next) => {
    let resp = await testController.getctdata(req);
    req.dataobject = resp
    next();
  }), lruCache.after);

  app.post('/getctdata-lru', lruCache.before, asyncMiddleware(async (req, res, next) => {
    let resp = await testController.getctdata(req);
    req.dataobject = resp
    next();
  }), lruCache.after);

  app.get('/testdata', cache.before, asyncMiddleware(async (req, res, next) => {
    req.dataobject = "abc"
    next();
  }), cache.after);


  app.get('/hasKey', asyncMiddleware(async (req, res, next) => {
    let resp = await testController.hasKey(req);
    res.json(resp);
  }));

  app.get('/getStats', asyncMiddleware(async (req, res, next) => {
    let resp = await testController.getStats();
    res.json(resp);
  }));

  app.get('/flushallcache', asyncMiddleware(async (req, res, next) => {
    let resp = await testController.flushallcache();
    res.json(resp);
  }));

};