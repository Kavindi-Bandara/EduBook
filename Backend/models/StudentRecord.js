const mongoose = require("mongoose");

const studentRecordSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    attendance: [
      {
        date: { type: Date, required: true },
        status: { type: String, enum: ["Present", "Absent"], required: true }
      }
    ],

    grades: [
      {
        subject: { type: String, required: true },
        term: { type: String, default: "Term 1" },
        score: { type: Number, required: true }
      }
    ],

    reports: [
      {
        title: { type: String, required: true },
        comment: { type: String, default: "" },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudentRecord", studentRecordSchema);
