import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"; // ✅ Use ES module import

import trackRoutes from "./routes/trackRoutes";
import riskAlertRoutes from "./routes/riskAlertRoutes";
import packageRoutes from "./routes/packageRoutes";

dotenv.config(); // ✅ Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MongoDB connection URI is missing. Set MONGO_URI in .env");
  process.exit(1);
}

app.use(cors());
app.use(express.json());

// Routes
app.use("/tracks", trackRoutes);
app.use("/risk-alerts", riskAlertRoutes);
app.use("/packages", packageRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((error) => console.error("❌ MongoDB Connection Error:", error));

export default app;
