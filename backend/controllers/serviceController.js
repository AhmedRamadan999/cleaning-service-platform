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


const getActiveServices = async (req, res) => {
    try {
        const services = await prisma.service.findMany({
            where: {
                isActive: true,
            },
        });
        res.json(services)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
// بتغير حالة الكرت بتسويه active او isActive استاذ خربطت بين هدول لهيك خليتهم تعليق😁
const updateServiceStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        const updatedService = await prisma.service.update({
            where: {
                id: Number(id),
            },
            data: {
                isActive,
            },
        })

        res.json({
            message: "service status updated",
            service: updatedService,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}
// عم تغير محتويات الكرت
const updateService = async (req,res) => {
    try {
        const {id} = req.params;
        const {title, desc, price} = req.body;
        const updatedService = await prisma.service.update({
            where: {
                id: Number(id),
            },
            data: {
                title,
                desc,
                price: Number(price),
            },
        });
        res.json({
            message: "service updated",
            service: updatedService,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message})
    }
}
const createService = async (req, res) => {
    try {
        const {title, desc, price} = req.body;
        const newService = await prisma.service.create({
            data: {
                title,
                desc,
                price: Number(price),
            },
        });

        res.json({
            message: "service created",
            service: newService,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message});
    }
};
module.exports = {
    getServices,
    getActiveServices,
    updateServiceStatus,
    updateService,
    createService,

}