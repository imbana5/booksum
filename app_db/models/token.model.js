const sql = require("../config/db.js");

const Token = function(token) {
  this.id = token.id;
  this.access_token = token.access_token;
  this.expiration = token.expiration;
  this.expires_in = token.expires_in;
  this.ims_user_id = token.ims_user_id;
  this.refresh_token = token.refresh_token;
  this.scope = token.scope;
  this.token_type = token.token_type;
};

Token.create = (newToken, result) => {
  sql.query("INSERT INTO tkn_access SET ?", newToken, (err, res) => {
    if (err) {
      console.error("error: ", err);
      result(err, null);
      return;
    }

    console.log("created board: ", { id: res.insertId, ...newToken });
    result(null, { id: res.insertId, ...newToken });
  });
};

Token.findExpiresAfter = (timestamp, result) => {
  sql.query("SELECT * FROM tkn_access WHERE expiration > ?", [timestamp], (err, res) => {
    if (err) {
      console.error("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found token: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Token.getAll = (result) => {
  const query = `SELECT * FROM tkn_access`;

  sql.query(query, (err, res) => {
    if (err) {
      console.error("error: ", err);
      result(null, err);
      return;
    }

    console.log("tokens: ", res);
    result(null, res);
  });
};

Token.removeExpiredBefore = (timestamp, result) => {
  sql.query("DELETE FROM tkn_access WHERE expiration < ?", [timestamp], (err, res) => {
    if (err) {
      console.error("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted token before timestamp: ", timestamp);
    result(null, res);
  });
};

module.exports = Token;