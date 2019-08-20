const express = require("express");
const cors = require("cors");

const addWant = require("./addWant");
const deleteWant = require("./deleteWant");
const getAllWants = require("./getAllWants");

const router = express.Router();

router.use(cors());
router.use(express.urlencoded({ extended: true }));

router.get("/want/list", getAllWants);
router.post("/want/add", addWant);
router.delete("/want/delete/:id", deleteWant);

module.exports = router;
