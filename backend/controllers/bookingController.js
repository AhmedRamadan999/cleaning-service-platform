const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();


const createBooking = async (req, res) => {
    try {
        const {week, period, serviceId} = req.body;

        const booking = await prisma.booking.create({
            data: {
                week,
                period,
                serviceId,
            },
        });
        
        res.json({
            message: "booking created",
            booking,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
};
module.exports = {
    createBooking,
}