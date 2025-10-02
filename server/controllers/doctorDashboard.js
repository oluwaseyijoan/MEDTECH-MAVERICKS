const Doctor = require("../models/Doctor");

const doctorDashboard = async (req, res) => {
  try {
    const doctorId = req.cookies.token; 
    if (!doctorId) {
      return res.status(401).json({ message: "Not logged in as doctor" });
    }

    
    const populatedDoctor = await Doctor.findById(doctorId)
      .populate("userId", "name email role");

    if (!populatedDoctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    res.json(populatedDoctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { doctorDashboard };
