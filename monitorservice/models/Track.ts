import mongoose from "mongoose";

const TrackSchema = new mongoose.Schema({
  trackId: String,
  status: String,
  currentLocation: String,
  destination: String,
  totalShipment: Number,
  temperature: Number,
  humidity: Number,
});

export default mongoose.model("Track", TrackSchema);
