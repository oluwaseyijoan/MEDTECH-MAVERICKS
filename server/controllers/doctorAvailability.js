const Doctor = require("../models/Doctor");

const doctorAvailability = async (req, res) => {
  try {
    
    const hospitalId = req.cookies.hospitalId;
    if (!hospitalId) {
      return res.status(401).json({ message: "Not logged in as doctor" });
    }

    const { day, startTime, endTime, slotDuration } = req.body;

    if (!day || !startTime || !endTime || !slotDuration) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    const doctor = await Doctor.findOne({ hospitalId });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    
    doctor.availability.push({ day, startTime, endTime, slotDuration });
    await doctor.save();

    res.json({
      message: "Availability updated successfully",
      availability: doctor.availability,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { doctorAvailability };
