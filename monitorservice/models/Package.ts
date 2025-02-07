import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema({
  packageId: String,
  weight: Number,
  stock: Number,
  productType: String,
  temperature: Number,
  humidity: Number,
  trackId: String,
});

export default mongoose.model("Package", PackageSchema);
