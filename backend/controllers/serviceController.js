const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getServices = async (req, res) => {
    try {
        const services = await prisma.service.findMany({
            orderBy: {
                id: "desc",
            },
        });

        res.json(services);
    } catch (error) {
        console.log("GET SERVICES ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

const getActiveServices = async (req, res) => {
    try {
        const services = await prisma.service.findMany({
            where: {
                isActive: true,
            },
            orderBy: {
                id: "desc",
            },
        });

        res.json(services);
    } catch (error) {
        console.log("GET ACTIVE SERVICES ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

const createService = async (req, res) => {
    try {
        const { title, desc, price } = req.body;

        if (!title || !desc || !price) {
            return res.status(400).json({
                error: "title, desc and price are required",
            });
        }

        const newService = await prisma.service.create({
            data: {
                title,
                desc,
                price: Number(price),
            },
        });

        res.status(201).json({
            message: "service created",
            service: newService,
        });
    } catch (error) {
        console.log("CREATE SERVICE ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

const updateServiceStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;

        if (typeof isActive !== "boolean") {
            return res.status(400).json({
                error: "isActive must be true or false",
            });
        }

        const updatedService = await prisma.service.update({
            where: {
                id: Number(id),
            },
            data: {
                isActive,
            },
        });

        res.json({
            message: "service status updated",
            service: updatedService,
        });
    } catch (error) {
        console.log("UPDATE SERVICE STATUS ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, desc, price } = req.body;

        if (!title || !desc || !price) {
            return res.status(400).json({
                error: "title, desc and price are required",
            });
        }

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
        console.log("UPDATE SERVICE ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getServices,
    getActiveServices,
    createService,
    updateServiceStatus,
    updateService,
};