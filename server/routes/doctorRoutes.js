const express = require("express");
const { registerDoctor , getAllDoctors, getAvailability} = require("../controllers/doctorController");
const { doctorDashboard } = require("../controllers/doctorDashboard")
const {protect} = require("../middleware/authMiddleware");
const {authorize} = require("../middleware/authorize");
const {loginDoctor}= require("../controllers/doctorLogin")
const {doctorAvailability}= require("../controllers/doctorAvailability")


const router = express.Router();

router.get("/", getAllDoctors)
router.post("/register", protect, registerDoctor);
router.post("/login",loginDoctor );
router.get("/dashboard", doctorDashboard );
router.post("/availability",doctorAvailability);
router.get("/:hospitalId/availability",getAvailability);





module.exports = router;
