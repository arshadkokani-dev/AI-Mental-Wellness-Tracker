import express from "express";
import { generateAIReflection } from "../controllers/aiReflectionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/reflection", protect, generateAIReflection);

export default router;