const pool = require("../../config/database");

module.exports = {
  getUserById: (id, callBack) => {
    pool.query(
      `CALL getUserById(?)`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserByEmail: (creds, callBack) => {
    pool.query(
      `CALL getUserByEmail(?,?)`,
      [creds.email,creds.password],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserByEmail: (creds, callBack) => {
    pool.query(
      `CALL checkUserExistence(?)`,
      [creds.email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUsers: callBack => {
    pool.query(
      `CALL getUsers()`,
      (error, results, fields) => {
        console.log(results);
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  addUser: (user,callBack) => {
    pool.query(
      `CALL addUser(?,?,?,?,?)`,
      [user.name,user.address,user.phone,user.email,user.password],
      (error, results, fields) => {
        console.log(results);
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateUser: (user,callBack) => {
    pool.query(
      `CALL updateUser(?,?,?,?,?,?)`,
      [user.id,user.nameOfUser,user.address,user.phone,user.email,user.pwd],
      (error, results, fields) => {
        console.log(results);
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
