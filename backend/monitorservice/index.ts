import express from "express";
import cors from "cors";
import { setupSubscriber } from "./handler/redis";
import web3op from "./handler/web3op";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

console.log("🚀 Starting the application...");


setupSubscriber();


app.get("/shipment", async (req, res) => {
    const data = await web3op.getShipmentData();
    if (data) {
        res.json({ success: true, shipment: data });
    } else {
        res.status(500).json({ success: false, message: "Failed to fetch shipment data" });
    }
});


app.listen(PORT, () => {
    console.log(`🌍 Server running on http://localhost:${PORT}`);
});
