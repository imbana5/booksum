const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");

const sendErrorResponse = (res, err, message) => {
  if (err.kind === "not_found") {
    res.status(404).send({ message });
  } else {
    res.status(500).send({ message: err.message || message });
  }
};

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }

  const { name, email, pwd } = req.body.data;

  bcrypt.hash(pwd, 10)
    .then(hash => {
      const user = new User({
        name,
        email,
        pwd: hash,
        created_at: new Date(),
        updated_at: new Date()
      });

      User.create(user, (err, data) => {
        if (err) return sendErrorResponse(res, err, "Some error occurred while creating the User.");
        res.send(data);
      });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  const orderBy = req.query.order_by || "updated_at";
  const sort = req.query.sort || "DESC";

  User.getAll(orderBy, sort, (err, data) => {
    if (err) return sendErrorResponse(res, err, "Some error occurred while retrieving users.");
    res.send({ data, order_by: orderBy, sort });
  });
};

exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) return sendErrorResponse(res, err, `Not found User with id ${req.params.id}.`);
    res.send(data);
  });
};

exports.findOneByEmail = (req, res) => {
  User.findByEmail(req.params.email, (err, data) => {
    if (err) return sendErrorResponse(res, err, `Not found User with Email ${req.params.email}.`);
    res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }

  const { name, email } = req.body.data;
  const user = new User({
    id: req.params.id,
    name,
    email,
    updated_at: new Date()
  });

  User.updateByid(req.params.id, user, (err, data) => {
    if (err) return sendErrorResponse(res, err, `Error updating User with id ${req.params.id}`);
    res.send(data);
  });
};

exports.resetPassword = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }

  const { id, pwd } = req.body.data;

  bcrypt.hash(pwd, 10)
    .then(hash => {
      User.updatePasswordByid(id, hash, (err, data) => {
        if (err) return sendErrorResponse(res, err, `Error updating User with id ${id}`);
        res.status(200).send({ message: "Password reset successfully!" });
      });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) return sendErrorResponse(res, err, `Could not delete User with id ${req.params.id}`);
    res.send({ message: "User was deleted successfully!" });
  });
};