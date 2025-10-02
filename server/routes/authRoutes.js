const express = require("express");
const { registerUser,loginuser,googleAuth } = require("../controllers/authController");
const {userStatus,logout}= require("../controllers/userStatus")
const{bookAppointment,getUserAppointments}= require("../controllers/appointment")
const router = express.Router();

router.post("/register", registerUser);
router.post("/login",loginuser)
router.get("/status",userStatus)
router.post("/logout",logout)
router.post("/googleAuth", googleAuth)
router.post("/appointments",bookAppointment)
router.get("/getAppointments",getUserAppointments)

module.exports = router;
