const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:5173" })); // Vite
app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));
