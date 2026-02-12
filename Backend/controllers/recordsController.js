const User = require("../models/User");
const StudentRecord = require("../models/StudentRecord");
const Student = require("../models/Student");

// ===========================
// ✅ TEACHER: STUDENT LIST CRUD
// ===========================

// GET /records  (Teacher only) -> list students created by logged teacher
const listStudents = async (req, res) => {
  try {
    const students = await Student.find({ teacher: req.user._id }).sort({ createdAt: -1 });
    return res.json(students);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// POST /records  (Teacher only) -> create student
const createStudent = async (req, res) => {
  try {
    const { name, email, rollNo, className, parentName, parentPhone } = req.body;

    if (!name || !email || !rollNo || !className || !parentName || !parentPhone) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const student = await Student.create({
      teacher: req.user._id,
      name,
      email,
      rollNo,
      className,
      parentName,
      parentPhone,
    });

    return res.status(201).json(student);
  } catch (err) {
    // duplicate key error
    if (err.code === 11000) {
      return res.status(409).json({ message: "Email or RollNo already exists." });
    }
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// PUT /records/:id  (Teacher only) -> update student
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Student.findOneAndUpdate(
      { _id: id, teacher: req.user._id }, // ✅ teacher can only update own students
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Student not found." });

    return res.json(updated);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Email or RollNo already exists." });
    }
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE /records/:id  (Teacher only) -> delete student
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Student.findOneAndDelete({ _id: id, teacher: req.user._id });

    if (!deleted) return res.status(404).json({ message: "Student not found." });

    return res.json({ message: "Student deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ===========================
// ✅ YOUR OLD RECORD FUNCTIONS (KEEP)
// ===========================

// TEACHER: create record for a student userId
const createRecord = async (req, res) => {
  try {
    const { studentId } = req.body;
    if (!studentId) return res.status(400).json({ message: "studentId is required" });

    const student = await User.findById(studentId);
    if (!student || student.role !== "Student") {
      return res.status(404).json({ message: "Student not found" });
    }

    const existing = await StudentRecord.findOne({ student: student._id });
    if (existing) return res.status(409).json({ message: "Record already exists for this student" });

    const record = await StudentRecord.create({ student: student._id });
    return res.status(201).json(record);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// TEACHER: add attendance
const addAttendance = async (req, res) => {
  try {
    const { recordId } = req.params;
    const { date, status } = req.body;

    if (!date || !status) return res.status(400).json({ message: "date and status required" });

    const record = await StudentRecord.findById(recordId);
    if (!record) return res.status(404).json({ message: "Record not found" });

    record.attendance.push({ date: new Date(date), status });
    await record.save();

    return res.json(record);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// TEACHER: add grade
const addGrade = async (req, res) => {
  try {
    const { recordId } = req.params;
    const { subject, term, score } = req.body;

    if (!subject || score === undefined) {
      return res.status(400).json({ message: "subject and score required" });
    }

    const record = await StudentRecord.findById(recordId);
    if (!record) return res.status(404).json({ message: "Record not found" });

    record.grades.push({ subject, term: term || "Term 1", score: Number(score) });
    await record.save();

    return res.json(record);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// STUDENT: get my record
const getMyRecord = async (req, res) => {
  try {
    const record = await StudentRecord.findOne({ student: req.user._id }).populate(
      "student",
      "name email role"
    );

    if (!record) return res.status(404).json({ message: "No record found for you" });
    return res.json(record);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// TEACHER: get any student record by student userId
const getRecordByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const record = await StudentRecord.findOne({ student: studentId }).populate(
      "student",
      "name email role"
    );

    if (!record) return res.status(404).json({ message: "Record not found" });
    return res.json(record);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  // ✅ student list CRUD
  listStudents,
  createStudent,
  updateStudent,
  deleteStudent,

  // ✅ old record functions
  createRecord,
  addAttendance,
  addGrade,
  getMyRecord,
  getRecordByStudent,
};
