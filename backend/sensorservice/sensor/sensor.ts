import { faker } from "@faker-js/faker";
import * as redis from "redis";

const redisClient = redis.createClient();
redisClient.connect().catch(console.error); 

class TruckTracker {
    private temperatureHistory: number[] = [];
    private latitude: number;
    private longitude: number;
    private speed: number;
    private destination: { lat: number; lon: number };
    private eta: number;
    private lastLoggedTime: number;
    private truckId: string;

    constructor(destination: { lat: number; lon: number }) {
        this.latitude = faker.location.latitude({ min: 36.6, max: 36.9 });
        this.longitude = faker.location.longitude({ min: 2.9, max: 3.2 });
        this.speed = faker.number.int({ min: 40, max: 90 });
        this.destination = destination;
        this.eta = this.calculateETA();
        this.lastLoggedTime = Date.now();
        this.truckId = faker.string.uuid();
    }

    private generateTemperature(): number {
        return faker.number.float({ min: 5, max: 30, fractionDigits: 1 });
    }

    private detectTemperatureAnomalies(): boolean {
        if (this.temperatureHistory.length < 2) return false;

        const prevTemp = this.temperatureHistory[this.temperatureHistory.length - 2];
        const currTemp = this.temperatureHistory[this.temperatureHistory.length - 1];

        if (currTemp >= 24) {
            console.warn("⚠️ Warning: High temperature detected!", currTemp, "°C");
            return true;
        }

        if (prevTemp >= 24 && currTemp <= 10) {
            console.error("🚨 Critical: Sudden freeze detected! Possible cargo damage.");
            console.error("📌 Data Log: Prev Temp =", prevTemp, "°C → Current Temp =", currTemp, "°C");
            return true;
        }

        return false;
    }

    private getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) ** 2 +
                  Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                  Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    private calculateETA(): number {
        const distance = this.getDistance(this.latitude, this.longitude, this.destination.lat, this.destination.lon);
        return Math.round(distance / this.speed * 60);
    }

    private updateLocation(): void {
        this.latitude += (Math.random() - 0.5) * 0.02;
        this.longitude += (Math.random() - 0.5) * 0.02;
        this.eta = this.calculateETA();
    }

    private checkAlerts(): boolean {
        const now = Date.now();
        if (now - this.lastLoggedTime >= 5000) {
            console.log(`[🚛 Truck ID] ${this.truckId}`);
            console.log(`[📍 GPS] Lat: ${this.latitude.toFixed(4)}, Lon: ${this.longitude.toFixed(4)}`);
            console.log(`[🔥 Temp] ${this.temperatureHistory[this.temperatureHistory.length - 1].toFixed(2)}°C`);
            console.log(`[⏳ ETA] ${this.eta} min`);
            this.lastLoggedTime = now;
        }

        if (this.eta > 120) {
            console.warn("⏳ Delay Warning: Truck is taking too long!");
            return true;
        }

        if (this.getDistance(this.latitude, this.longitude, this.destination.lat, this.destination.lon) < 1) {
            console.log("✅ Truck has arrived at the destination!");
            return true;
        }

        return false;
    }

    public track(): boolean {
        console.log("🚛 Truck tracking started...");
        const temp = this.generateTemperature();
        this.temperatureHistory.push(temp);

        const anomalyDetected = this.detectTemperatureAnomalies();
        this.updateLocation();
        const alertTriggered = this.checkAlerts();

        return anomalyDetected || alertTriggered;
    }

    public getTruckId(): string {
        return this.truckId;
    }
    
}


async function sendEvent(truck: TruckTracker) {
    try {
        const eventData = {
            truckId: truck.getTruckId(),
            status: truck.track() ? "ALERT" : "OK"
        };

        await redisClient.publish("truck-event", JSON.stringify(eventData));
        console.log(`🚛 Redis Event Sent: ${eventData.status} for Truck ${eventData.truckId}`);
    } catch (error) {
        console.error("❌ Redis Error:", error);
    }
}


async function main() {
    const destination = { lat: 37.0, lon: 3.1 };
    const truck = new TruckTracker(destination);

    setInterval(async () => {
        await sendEvent(truck);
    }, 5000); 
}


main();

export default TruckTracker;
