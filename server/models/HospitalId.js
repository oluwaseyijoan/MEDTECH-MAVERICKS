const mongoose = require("mongoose");

const hospitalIdSchema = new mongoose.Schema({
  hospitalId: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("ValidHospitalId", hospitalIdSchema);
