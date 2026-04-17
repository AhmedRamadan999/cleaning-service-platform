const express = require("express")
const router = express.Router();

const { getServices, getActiveServices, updateServiceStatus, updateService, createService } = require("../controllers/serviceController")

router.get("/", getServices);
router.get("/active", getActiveServices);
router.put("/:id/status", updateServiceStatus);
router.put("/:id", updateService);
router.post("/", createService);
module.exports = router;