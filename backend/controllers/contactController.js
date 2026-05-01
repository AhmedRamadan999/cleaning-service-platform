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

    const rows = await prisma.$queryRaw`
      INSERT INTO "Contact" ("name", "email", "subject", "message", "status")
      VALUES (${name}, ${email}, ${subject}, ${message}, 'pending')
      RETURNING id, name, email, subject, message, status, "createdAt"
    `;

    res.status(201).json({
      message: "Nachricht erfolgreich gesendet!",
      contact: rows[0],
    });
  } catch (error) {
    console.log("CREATE CONTACT ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await prisma.$queryRaw`
      SELECT id, name, email, subject, message, status, "createdAt"
      FROM "Contact"
      ORDER BY "createdAt" DESC
    `;

    res.json(contacts);
  } catch (error) {
    console.log("GET CONTACTS ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const rows = await prisma.$queryRaw`
      DELETE FROM "Contact"
      WHERE id = ${Number(id)}
      RETURNING id, name, email, subject, message, status, "createdAt"
    `;

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Contact not found",
      });
    }

    res.json({
      message: "Contact deleted",
      contact: rows[0],
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

    if (!status) {
      return res.status(400).json({
        error: "Status ist erforderlich.",
      });
    }

    const rows = await prisma.$queryRaw`
      UPDATE "Contact"
      SET status = ${status}
      WHERE id = ${Number(id)}
      RETURNING id, name, email, subject, message, status, "createdAt"
    `;

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Contact not found",
      });
    }

    res.json({
      message: "Status updated",
      contact: rows[0],
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