const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    // ✅ which teacher created/owns this student
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },

    rollNo: { type: String, required: true, trim: true },
    className: { type: String, required: true, trim: true },

    parentName: { type: String, required: true, trim: true },
    parentPhone: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// ✅ prevent duplicate emails per teacher
studentSchema.index({ teacher: 1, email: 1 }, { unique: true });

// ✅ prevent duplicate roll numbers per teacher
studentSchema.index({ teacher: 1, rollNo: 1 }, { unique: true });

module.exports = mongoose.model("Student", studentSchema);
