const express = require("express");
const router = express.Router();

console.log("authRoutes loaded (routes/authRoutes.js)");

// THIS MUST WORK if this file is the one being used
router.get("/test", (req, res) => {
  return res.status(200).json({ message: "/auth/test working" });
});

// keep your real routes too
const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

module.exports = router;

