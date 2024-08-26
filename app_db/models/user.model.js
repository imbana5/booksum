const sql = require("../config/db.js");

const User = function(user) {
  this.id = user.id;
  this.name = user.name;
  this.email = user.email;
  this.pwd = user.pwd;
  this.created_at = user.created_at;
  this.updated_at = user.updated_at;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO usr_users SET ?", newUser, (err, res) => {
    if (err) {
      console.error("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (id, result) => {
  sql.query("SELECT * FROM usr_users WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.error("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.findByEmail = (email, result) => {
  sql.query("SELECT * FROM usr_users WHERE email = ?", [email], (err, res) => {
    if (err) {
      console.error("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Not found User with the email
    result({ kind: "not_found" }, null);
  });
};

User.getAll = (orderBy = "updated_at", sort = "DESC", result) => {
  const query = `SELECT * FROM usr_users ORDER BY ${orderBy} ${sort}`;

  sql.query(query, [orderBy, sort], (err, res) => {
    if (err) {
      console.error("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE usr_users SET name = ?, email = ?, updated_at = ? WHERE id = ?",
    [user.name, user.email, new Date(), id],
    (err, res) => {
      if (err) {
        console.error("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // Not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id, ...user });
      result(null, { id, ...user });
    }
  );
};

User.updatePasswordById = (id, pwd, result) => {
  sql.query(
    "UPDATE usr_users SET pwd = ?, updated_at = ? WHERE id = ?",
    [pwd, new Date(), id],
    (err, res) => {
      if (err) {
        console.error("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // Not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user password for id: ", id);
      result(null, { id });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM usr_users WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.error("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // Not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

module.exports = User;