module.exports = app => {
  const tokens = require("../controllers/token.controller.js");

  let router = require("express").Router();

  router.post('/', tokens.create);
  router.get('/', tokens.findAll);
  router.get('/available', tokens.findAvailable);
  router.delete('/', tokens.deleteNotAvailable);

  app.use('/api-db/tokens', router);
};