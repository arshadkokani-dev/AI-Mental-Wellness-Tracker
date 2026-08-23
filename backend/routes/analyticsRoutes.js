import express from "express";
import { getWellnessAnalytics } from "../controllers/analyticsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getWellnessAnalytics);

export default router;