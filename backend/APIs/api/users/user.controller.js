const {
  getUserById,
  getUsers,
  addUser,
  updateUser,
  getUserByEmail,
  checkEmail
} = require("./user.service");

module.exports = {
  getUserById: (req, res) => {
    const id = req.params.id;
    getUserById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "User record not found!"
        });
      }
      if (results[0].length == 0) {
        return res.json({
          success: 0,
          message: "User not Found"
        });
      }
      return res.json({
        success: 1,
        data:results[0]
      });
    });
  },
  getUserByEmail: (req, res) => {
    const creds = req.body;
    console.log("======>",req.body);
    getUserByEmail(creds, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "User record not found!"
        });
      }
      if (results[0].length == 0) {
        return res.json({
          success: 0,
          message: "User not Found"
        });
      }
      return res.json({
        success: 1,
        data:results[0]
      });
    });
  },
  checkEmail: (req, res) => {
    const creds = req.body;
    console.log("======>",req.body);
    checkEmail(creds, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "User record not found!"
        });
      }
      if (results[0].length == 0) {
        return res.json({
          success: 0,
          message: "User not Found"
        });
      }
      return res.json({
        success: 1,
        data:results[0]
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (results[0].length == 0) {
        return res.json({
          success: 0,
          message: "Users not Found"
        });
      }
      return res.json({
        success: 1,
        data:results[0]
      });
    });
  },
  addUser: (req, res) => {
    const body = req.body;
    console.log("=======>",body);
    addUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data:results[0]
      });
    });
  },
  updateUser: (req, res) => {
    const user = req.body;
    console.log("======> update",user);
    updateUser(user, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data:"User details updated succesfully!"
      });
    });
  },

};
