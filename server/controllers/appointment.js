const jwt = require("jsonwebtoken");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

const bookAppointment = async (req, res) => {
  try {
    
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const userId = decoded.id; 

    const { hospitalId, day, time } = req.body;
    if (!hospitalId || !day || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    const exists = await Appointment.findOne({ hospitalId, day, time });
    if (exists) {
      return res.status(400).json({ message: "This time slot is already booked" });
    }

    
    const appointment = await Appointment.create({
      userId,
      hospitalId,
      day,
      time,
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};






const getUserAppointments = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const userId = decoded.id;

    
    const appointments = await Appointment.find({ userId })
      .populate("userId", "name email");

    
    const allAppointments = await Promise.all(
      appointments.map(async (app) => {
        const doctor = await Doctor.findOne({ hospitalId: app.hospitalId })
          .populate("userId", "name email");

        return {
          ...app.toObject(),
          doctor: doctor
            ? {
                name: doctor.userId?.name,
                email: doctor.userId?.email,
                specialization: doctor.specialization,
                hospitalId: doctor.hospitalId,
              }
            : null,
        };
      })
    );

    res.json({ appointments: allAppointments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};






module.exports = { bookAppointment, getUserAppointments };
