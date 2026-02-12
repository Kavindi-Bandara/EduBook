const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },

    // MUST match frontend: "Teacher" | "Student"
    role: { type: String, enum: ["Teacher", "Student"], default: "Student" },

    // optional for later
    studentId: { type: String, default: "" },
    className: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
