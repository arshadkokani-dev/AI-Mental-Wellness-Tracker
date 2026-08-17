import express from "express";
import { createWellnessEntry, getWellnessEntries, updateWellnessEntry, deleteWellnessEntry } from "../controllers/wellnessController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createWellnessEntry);
router.get("/", protect, getWellnessEntries);
router.put("/:id", protect, updateWellnessEntry);
router.delete("/:id", protect, deleteWellnessEntry);

export default router;