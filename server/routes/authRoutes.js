const express = require("express");
const { registerUser,loginuser,googleAuth } = require("../controllers/authController");
const {userStatus,logout}= require("../controllers/userStatus")

const router = express.Router();

router.post("/register", registerUser);
router.post("/login",loginuser)
router.get("/status",userStatus)
router.post("/logout",logout)
router.post("/googleAuth", googleAuth)

module.exports = router;
