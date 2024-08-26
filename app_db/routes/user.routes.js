module.exports = app => {
  const users = require("../controllers/user.controller.js");

  let router = require("express").Router();

  router.post('/', users.create);
  router.get('/', users.findAll);
  router.get('/:id', users.findOne);
  router.get('/email/:email', users.findOneByEmail);
  router.put('/:id', users.update);
  router.put('/reset-password/:id', users.resetPassword);
  router.delete('/:id', users.delete);

  app.use('/api-db/users', router);
};