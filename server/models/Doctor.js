const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "User", required: true },
    specialization: { type: String, required: true },
    licenseNumber: { type: String, required: true, unique: true },
    hospitalId: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
