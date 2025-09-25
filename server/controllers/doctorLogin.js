const bcrypt = require("bcryptjs");
const Doctor = require("../models/Doctor");
const User = require("../models/User");


const loginDoctor = async (req, res) => {
  try {
    const { hospitalId, password } = req.body;

   
    const doctor = await Doctor.findOne({ hospitalId }).populate("userId");
    if (!doctor) {
      return res.status(400).json({ message: "Invalid hospital ID" });
    }

   
    const user = doctor.userId;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    
    res.cookie("token", doctor._id.toString(), {
      httpOnly: true,    
      secure: false,    
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000 
    });

    res.json({
      message: "Doctor login successful",
      doctorId: doctor._id, 
      name: user.name,
      email: user.email
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { loginDoctor };
