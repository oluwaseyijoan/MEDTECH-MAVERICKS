const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    },
  startTime: { type: String, required: true }, 
  endTime: { type: String, required: true },   
  slotDuration: { type: Number, required: true, default: 30 }, 
});

const doctorSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "User", required: true },
    specialization: { type: String, required: true },
    licenseNumber: { type: String, required: true, unique: true },
    hospitalId: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    
    availability: [availabilitySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
