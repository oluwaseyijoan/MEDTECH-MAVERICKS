const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Doctor = require("../models/Doctor");
const jwt = require("jsonwebtoken");
const { response } = require("express");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    const jwtToken = generateToken(user._id, user.role);
    res.cookie("token", jwtToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const loginuser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials password" });

    const jwtToken = generateToken(user._id, user.role);
    res.cookie("token", jwtToken, {
      maxAge: 15 * 60 * 1000,
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    if (user) res.status(200).json({ message: "successfully signedup" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const googleAuth = async (req, res) => {
  const { email, name } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not registered. Please sign up first." });
    }

    const doctor = await Doctor.findOne({ userId: user._id }).populate(
      "userId"
    );

    res.cookie("token", user._id.toString(), {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    if (doctor) {
      res.cookie("token", doctor._id.toString(), {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

       res.cookie("hospitalId", doctor.hospitalId, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });
    }
    
   res.json({
  name: user.name,
  email: user.email,
  role: user.role,
  doctorId: doctor ? doctor._id : null,
  hospitalId: doctor ? doctor.hospitalId : null,
});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerUser, loginuser, googleAuth };
