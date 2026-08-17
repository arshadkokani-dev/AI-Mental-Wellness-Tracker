import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import "./models/User.js";
import "./models/WellnessEntry.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Mental Wellness Tracker API is running");
});

mongoose
  .connect(process.env.MONGO_URI,
    {
        serverSelectionTimeoutMS: 5000, // Set a timeout for server selection
    })
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });