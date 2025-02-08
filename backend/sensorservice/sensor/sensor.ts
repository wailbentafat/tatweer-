import * as redis from "redis";
// import axios from "axios";
import WebSocket from "ws";

const redisClient = redis.createClient();
redisClient.connect().catch(console.error);

class TruckTracker {
    private truckId: string;
    private latitude?: number;
    private longitude?: number;
    private destination?: { lat: number; lon: number };
    private ws?: WebSocket;

    constructor(truckId: string) {
        this.truckId = truckId;
    }

    // async fetchDestination(): Promise<void> {
    //     try {
    //         const response = await axios.get(`https://api.example.com/trucks/${this.truckId}/destination`);
    //         this.destination = response.data; // API returns { lat: number, lon: number }
    //         console.log(`📍 Destination set for Truck ${this.truckId}:`, this.destination);
    //     } catch (error) {
    //         console.error("❌ Failed to fetch destination:", error);
    //     }
    // }

    startTracking(): void {
        this.ws = new WebSocket("ws://localhost:3000/gps");

        this.ws.on("message", (data) => {
            const gpsData = JSON.parse(data.toString());
            this.latitude = gpsData.latitude;
            this.longitude = gpsData.longitude;

            console.log(`🚛 Truck ${this.truckId} | GPS: ${this.latitude}, ${this.longitude}`);
            this.checkArrival();
        });

        this.ws.on("error", (err) => console.error("❌ WebSocket Error:", err));
        this.ws.on("close", () => console.warn("⚠️ GPS WebSocket Closed"));
    }

    private getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371; // Earth radius in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) ** 2 +
                  Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                  Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    private checkArrival(): void {
        if (!this.latitude || !this.longitude || !this.destination) return;

        const distance = this.getDistance(this.latitude, this.longitude, this.destination.lat, this.destination.lon);
        if (distance < 1) {
            console.log(`✅ Truck ${this.truckId} has arrived at the destination!`);
            this.sendEvent("DESTINATION_REACHED");
        }
    }

    private async sendEvent(status: string): Promise<void> {
        try {
            const eventData = { truckId: this.truckId, status };
            await redisClient.publish("truck-event", JSON.stringify(eventData));
            console.log(`🚛 Redis Event Sent: ${status} for Truck ${this.truckId}`);
        } catch (error) {
            console.error("❌ Redis Error:", error);
        }
    }
}

export default TruckTracker;
