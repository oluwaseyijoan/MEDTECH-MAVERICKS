const Doctor = require("../models/Doctor");
const User = require("../models/User");
const ValidHospitalId = require("../models/HospitalId")



const registerDoctor = async (req, res) => {
  try {
    const {  specialization, licenseNumber, phone, hospitalId } = req.body;

    const userId = await req.user._id
    if(!userId)res.status(401).json({message:"session expired, please kogin again"})
    const user = await User.findById(userId);
    
    if (!user || user.role !== "doctor") {
      return res.status(400).json({ message: "Invalid doctor account" });
    }

     const validId = await ValidHospitalId.findOne({ hospitalId });
    if (!validId) {
      return res.status(400).json({ message: "Invalid hospital ID" });
    }

    const doctorExists = await Doctor.findOne({ hospitalId });
    if (doctorExists) return res.status(400).json({ message: "Doctor already registered" });
    

    const doctor = await Doctor.create({
      userId,
      specialization,
      licenseNumber,
      hospitalId,
      phone,
     
    });

    res.status(201).json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerDoctor };
