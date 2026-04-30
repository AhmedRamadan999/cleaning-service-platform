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

        const booking = await prisma.booking.create({
            data: {
                week,
                period,
                serviceId: Number(serviceId),
                userId: Number(userId),
            },
        });

        res.status(201).json({
            message: "booking created",
            booking,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

const getBookings = async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany({
            include: {
                service: true,
                user: true,
            },
            orderBy: {
                id: "desc",
            },
        });

        res.json(bookings);
    } catch (error) {
        console.log(error);
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
        console.log(error);
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
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createBooking,
    getBookings,
    updateBookingStatus,
    deleteBooking,
};