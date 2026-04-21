const express = require("express");
const {
  createContact,
  getContacts,
  deleteContact,
  updateContactStatus,
} = require("../controllers/contactController");

const router = express.Router();

router.post("/", createContact);
router.get("/", getContacts);
router.delete("/:id", deleteContact);
router.put("/:id/status", updateContactStatus);

module.exports = router;
