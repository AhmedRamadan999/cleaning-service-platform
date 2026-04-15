require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const contactRoutes = require("./routes/contactRoutes");
const bookingRoutes = require("./routes/bookingRoutes")
const app = express();
const serviceRoutes = require("./routes/serviceRoutes")
const authRoutes = require("./routes/authRoutes")

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

app.use(cors());
app.use(express.json());
app.use("/contact", contactRoutes);
app.use("/bookings", bookingRoutes);
app.use("/services", serviceRoutes);
app.use("/auth", authRoutes)
app.get("/", (req, res) => {
    res.send("Backend working ✅");
});

app.post("/test", (req, res) => {
    console.log(req.body);
    res.json({
        message: "Data received",
        data: req.body,
    });
});

app.post("/create-users-table", async (req, res) => {
    try {
        const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        age INT,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

        await pool.query(sql);

        res.json({ message: "users table created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
