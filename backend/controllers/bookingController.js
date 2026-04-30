const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createBooking = async (req, res) => {
    try {
        const { week, period, serviceId, userId } = req.body;

        if (!week || !period || !serviceId || !userId) {
            return res.status(400).json({
                error: "week, period, serviceId und userId sind erforderlich.",
            });
        }

        const serviceIdNumber = Number(serviceId);
        const userIdNumber = Number(userId);

        const rows = await prisma.$queryRaw`
      INSERT INTO "Booking" ("week", "period", "serviceId", "userId")
      VALUES (${week}, ${period}, ${serviceIdNumber}, ${userIdNumber})
      RETURNING id, week, period, status, "serviceId", "userId", "createdAt"
    `;

        const createdBooking = rows[0];

        res.status(201).json({
            message: "booking created",
            booking: createdBooking,
        });
    } catch (error) {
        console.log("CREATE BOOKING ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

const getBookings = async (req, res) => {
    try {
        const rows = await prisma.$queryRaw`
      SELECT
        b.id,
        b.week,
        b.period,
        b.status,
        b."serviceId",
        b."userId",
        b."createdAt",

        s.id AS "service_id",
        s.title AS "service_title",
        s."desc" AS "service_desc",
        s.price AS "service_price",
        s."isActive" AS "service_isActive",

        u.id AS "user_id",
        u.name AS "user_name",
        u.email AS "user_email",
        u.role AS "user_role"
      FROM "Booking" b
      LEFT JOIN "Service" s ON b."serviceId" = s.id
      LEFT JOIN "User" u ON b."userId" = u.id
      ORDER BY b.id DESC
    `;

        const bookings = rows.map((row) => ({
            id: row.id,
            week: row.week,
            period: row.period,
            status: row.status,
            serviceId: row.serviceId,
            userId: row.userId,
            createdAt: row.createdAt,

            service: row.service_id
                ? {
                    id: row.service_id,
                    title: row.service_title,
                    desc: row.service_desc,
                    price: row.service_price,
                    isActive: row.service_isActive,
                }
                : null,

            user: row.user_id
                ? {
                    id: row.user_id,
                    name: row.user_name,
                    email: row.user_email,
                    role: row.user_role,
                }
                : null,
        }));

        res.json(bookings);
    } catch (error) {
        console.log("GET BOOKINGS ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                error: "Status ist erforderlich.",
            });
        }

        const updatedBooking = await prisma.booking.update({
            where: {
                id: Number(id),
            },
            data: {
                status,
            },
        });

        res.json({
            message: "booking status updated",
            booking: updatedBooking,
        });
    } catch (error) {
        console.log("UPDATE BOOKING STATUS ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

const deleteBooking = async (req, res) => {
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
        console.log("DELETE BOOKING ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createBooking,
    getBookings,
    updateBookingStatus,
    deleteBooking,
};