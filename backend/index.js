require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");

const app = express();

const prisma = new PrismaClient();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

app.use(cors());
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
        const { week, period, serviceId } = req.body;

        const booking = await prisma.booking.create({
            data: {
                week,
                period,
                serviceId
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
app.get("/bookings", async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany({
            include: {
                service: true,
            },
        });
        res.json(bookings);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
})



app.put("/bookings/:id/status", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;


        const updatedBooking = await prisma.booking.update({
            where: {
                id: Number(id),
            },
            data: {
                status,
            },

        })
        res.json({
            message: "booking status updated",
            booking: updatedBooking,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

app.delete("/bookings/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBooking = await prisma.booking.delete({
            where: {
                id: Number(id),
            },
        });
        res.json({
            message: "booking deleted",
            booking: deletedBooking,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

app.get("/services", async (req, res) => {
    try {
        const services = await prisma.service.findMany();
        res.json(services)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
})

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});