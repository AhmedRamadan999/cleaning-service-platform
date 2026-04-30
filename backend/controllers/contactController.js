const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: "Bitte füllen Sie alle Felder aus.",
      });
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    res.status(201).json({
      message: "Nachricht erfolgreich gesendet!",
      contact,
    });
  } catch (error) {
    console.log("CREATE CONTACT ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(contacts);
  } catch (error) {
    console.log("GET CONTACTS ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res.status(400).json({
        error: "Invalid contact id",
      });
    }

    const contact = await prisma.contact.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Contact deleted",
      contact,
    });
  } catch (error) {
    console.log("DELETE CONTACT ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (isNaN(Number(id))) {
      return res.status(400).json({
        error: "Invalid contact id",
      });
    }

    if (!status) {
      return res.status(400).json({
        error: "Status is required",
      });
    }

    const allowedStatus = ["pending", "replied"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        error: "Invalid status",
      });
    }

    const contact = await prisma.contact.update({
      where: {
        id: Number(id),
      },
      data: {
        status,
      },
    });

    res.json({
      message: "Status updated",
      contact,
    });
  } catch (error) {
    console.log("UPDATE CONTACT STATUS ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createContact,
  getContacts,
  deleteContact,
  updateContactStatus,
};