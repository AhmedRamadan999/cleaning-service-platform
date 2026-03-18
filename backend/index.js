require("dotenv").config();
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");

const app = express();

const prisma = new PrismaClient();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

app.use(express.json());

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

app.post("/bookings", async (req, res) => {
    try {
        const { week, period } = req.body;

        const booking = await prisma.booking.create({
            data: {
                week,
                period,
            },
        });

        res.json({
            message: "booking created",
            booking,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});