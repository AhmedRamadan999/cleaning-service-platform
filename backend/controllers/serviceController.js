const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getServices = async (req, res) => {
    try {
        const services = await prisma.service.findMany();
        res.json(services)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}




module.exports = {
    getServices,
    
}