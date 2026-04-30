require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const contactRoutes = require("./routes/contactRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/contact", contactRoutes);
app.use("/bookings", bookingRoutes);
app.use("/services", serviceRoutes);
app.use("/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Backend working ✅");
});

// Database test route
app.get("/db-test", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            message: "Database connected ✅",
            time: result.rows[0],
        });
    } catch (error) {
        console.log("DB ERROR:", error);

        res.status(500).json({
            error: "Database connection failed",
            details: error.message,
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});