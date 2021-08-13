const router = require("express").Router();
const { getUsers, getUserById,addUser, updateUser,getUserByEmail,checkEmail } = require("./user.controller");


router.get("/", getUsers);
router.post("/login", getUserByEmail);
router.get("/:id", getUserById);
router.post("/", addUser);
router.put("/", updateUser);
router.post("/checkEmail", getUserByEmail);




module.exports = router;
