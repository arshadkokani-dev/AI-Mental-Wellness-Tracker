import express from "express";
import {
  createCBTJournal,
  getCBTJournals,
} from "../controllers/cbtController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createCBTJournal);
router.get("/", protect, getCBTJournals);

export default router;