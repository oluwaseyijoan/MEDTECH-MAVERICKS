const express = require("express");
const { registerDoctor } = require("../controllers/doctorController");
const { doctorDashboard } = require("../controllers/doctorDashboard")
const {protect} = require("../middleware/authMiddleware");
const {authorize} = require("../middleware/authorize");
const {loginDoctor}= require("../controllers/doctorLogin")


const router = express.Router();

router.post("/register", protect, registerDoctor);
router.post("/login",loginDoctor );
router.get("/dashboard", doctorDashboard );



module.exports = router;
