const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// إنشاء رسالة تواصل جديدة
const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res
        .status(400)
        .json({ error: "Bitte füllen Sie alle Felder aus." });
    }

    const contact = await prisma.contact.create({
      data: { name, email, subject, message },
    });

    res.status(201).json({
      message: "Nachricht erfolgreich gesendet!",
      contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// جيب كل الرسائل
const getContacts = async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// حذف رسالة
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await prisma.contact.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Contact deleted", contact });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createContact, getContacts, deleteContact };
