const router = require("express").Router();

const auth = require("../middleware/auth");
const { allowRoles } = require("../middleware/role");

const {
  //  Student list CRUD
  listStudents,
  createStudent,
  updateStudent,
  deleteStudent,

  //  record functions
  createRecord,
  addAttendance,
  addGrade,
  getMyRecord,
  getRecordByStudent
} = require("../controllers/recordsController");

// Student gets own record
router.get("/me", auth, allowRoles("Student"), getMyRecord);

// ===========================
// Teacher: Student List CRUD (for MyStudents page)
// ===========================
router.get("/", auth, allowRoles("Teacher"), listStudents);
router.post("/", auth, allowRoles("Teacher"), createStudent);
router.put("/:id", auth, allowRoles("Teacher"), updateStudent);
router.delete("/:id", auth, allowRoles("Teacher"), deleteStudent);

// ===========================
// Teacher: Academic Record routes (your old ones)
// ===========================
router.post("/record", auth, allowRoles("Teacher"), createRecord);
router.get("/student/:studentId", auth, allowRoles("Teacher"), getRecordByStudent);
router.post("/:recordId/attendance", auth, allowRoles("Teacher"), addAttendance);
router.post("/:recordId/grades", auth, allowRoles("Teacher"), addGrade);

module.exports = router;
