import express from "express";
import cors from "cors";

import addWant from "./addWant";
import deleteWant from "./deleteWant";
import getAllWants from "./getAllWants";

const router = express.Router();

router.use(cors());
router.use(express.urlencoded({ extended: true }));

router.get("/want/list", getAllWants);
router.post("/want/add", addWant);
router.delete("/want/delete/:id", deleteWant);

export default router;
