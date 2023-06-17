const router = require("express").Router();

const {
  managerRegister,
  userRegister,
  login,
} = require("../Controllers/login&RegController");

//Registration Route

router.post("/manager_register", managerRegister);

router.post("/user_register", userRegister);

//Login Route

router.post("/login", login);

module.exports = router;
