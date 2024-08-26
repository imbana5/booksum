const Token = require("../models/token.model.js");

const sendErrorResponse = (res, err, message) => {
  if (err.kind === "not_found") {
    res.status(404).send({ message });
  } else {
    res.status(500).send({ message: err.message || message });
  }
};

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const token = req.body.data;

  Token.create(token, (err, data) => {
    if (err) {
      return sendErrorResponse(res, err, 
        `Some error occurred while creating the Token.`);
    }
    res.send(data);
  });
};

exports.findAll = (req, res) => {
  Token.getAll((err, data) => {
    if (err) {
      return sendErrorResponse(res, err, 
        `Some error occurred while retrieving tokens.`);
    }
    res.send({ data });
  });
};

exports.findAvailable = (req, res) => {
  let timestamp = Date.now() / 1000
  Token.findExpiresAfter(timestamp, (err, data) => {
    if (err) {
      return sendErrorResponse(res, err, 
        `Not found available Token after ${timestamp}.`);
    }
    res.send(data);
  });
};

exports.deleteNotAvailable = (req, res) => {
  let timestamp = Date.now() / 1000
  Token.removeExpiredBefore(timestamp, (err, data) => {
    if (err) {
      return sendErrorResponse(res, err, 
        `Could not delete unavailable Token before ${timestamp}`);
    }
    res.send({ message: "Token was deleted successfully!" });
  });
};