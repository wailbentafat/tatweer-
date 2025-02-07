import mongoose from "mongoose";

const RiskAlertSchema = new mongoose.Schema({
  trackingId: String,
  alert: String,
  description: String,
  shipper: String,
  date: Date,
});

export default mongoose.model("RiskAlert", RiskAlertSchema);
