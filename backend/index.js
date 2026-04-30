require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const contactRoutes = require("./routes/contactRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use("/contact", contactRoutes);
app.use("/bookings", bookingRoutes);
app.use("/services", serviceRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Backend working ✅");
});

app.get("/db-test", async (req, res) => {
    try {
        await prisma.$connect();

        res.json({
            message: "Database connected ✅",
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