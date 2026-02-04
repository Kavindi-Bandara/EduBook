const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { signToken } = require("../utils/token");

function sanitizeUser(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    studentId: user.studentId || "",
    className: user.className || ""
  };
}

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!["Teacher", "Student"].includes(role)) {
      return res.status(400).json({ message: "Role must be Teacher or Student." });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ message: "Email already exists." });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashed,
      role
    });

    const token = signToken({ id: user._id, role: user.role });

    return res.status(201).json({
      message: "Registered successfully",
      token,
      user: sanitizeUser(user)
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Email, password and role are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: "Invalid email or password." });

    // role check based on frontend dropdown
    if (user.role !== role) {
      return res.status(401).json({ message: `You are not registered as ${role}.` });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid email or password." });

    const token = signToken({ id: user._id, role: user.role });

    return res.json({
      message: "Login successful",
      token,
      user: sanitizeUser(user)
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { register, login };
