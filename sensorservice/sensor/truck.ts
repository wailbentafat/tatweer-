import { faker } from "@faker-js/faker";

// Simulated Truck Class
class TruckTracker {
    private temperatureHistory: number[] = [];
    private latitude: number;
    private longitude: number;
    private speed: number;
    private destination: { lat: number; lon: number };
    private eta: number;
    private lastLoggedTime: number;

    constructor(destination: { lat: number; lon: number }) {
        this.latitude = faker.location.latitude({ min: 36.6, max: 36.9 });
        this.longitude = faker.location.longitude({ min: 2.9, max: 3.2 });        
        this.speed = faker.number.int({ min: 40, max: 90 }); // Random speed between 40-90 km/h
        this.destination = destination;
        this.eta = this.calculateETA();
        this.lastLoggedTime = Date.now();
    }

    // Generates temperature readings
    private generateTemperature(): number {
        return faker.number.float({ min: 5, max: 30, fractionDigits: 1 });
    }

    // Detects temperature anomalies
    private detectTemperatureAnomalies(): void {
        if (this.temperatureHistory.length < 2) return;

        const prevTemp = this.temperatureHistory[this.temperatureHistory.length - 2];
        const currTemp = this.temperatureHistory[this.temperatureHistory.length - 1];

        if (currTemp >= 24) {
            console.warn("⚠️ Warning: High temperature detected! Current:", currTemp, "°C");
        }

        if (prevTemp >= 24 && currTemp <= 10) {
            console.error("🚨 Critical: Sudden freeze detected! Possible cargo damage.");
            console.error("📌 Data Log: Prev Temp =", prevTemp, "°C → Current Temp =", currTemp, "°C");
        }
    }

    // Calculates distance between two lat/lon points
    private getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371; // Radius of Earth in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    }

    // Estimates ETA based on distance and speed
    private calculateETA(): number {
        const distance = this.getDistance(
            this.latitude, this.longitude,
            this.destination.lat, this.destination.lon
        );
        return Math.round(distance / this.speed * 60); // ETA in minutes
    }

    // Updates truck's GPS location
    private updateLocation(): void {
        this.latitude += (Math.random() - 0.5) * 0.02;
        this.longitude += (Math.random() - 0.5) * 0.02;
        this.eta = this.calculateETA();
    }

    // Logs status and triggers alerts
    private checkAlerts(): void {
        const now = Date.now();
        if (now - this.lastLoggedTime >= 5000) { // Log every 5 seconds
            console.log(`[📍 GPS] Lat: ${this.latitude.toFixed(4)}, Lon: ${this.longitude.toFixed(4)}`);
            console.log(`[🔥 Temp] ${this.temperatureHistory[this.temperatureHistory.length - 1].toFixed(2)}°C`);
            console.log(`[⏳ ETA] ${this.eta} min`);
            this.lastLoggedTime = now;
        }

        if (this.eta > 120) console.warn("⏳ Delay Warning: Truck is taking too long!");
        if (this.getDistance(this.latitude, this.longitude, this.destination.lat, this.destination.lon) < 1) {
            console.log("✅ Truck has arrived at the destination!");
            process.exit(0);
        }
    }

    // Starts real-time tracking
    public startTracking(): void {
        console.log("🚛 Truck tracking started...");
        setInterval(() => {
            const temp = this.generateTemperature();
            this.temperatureHistory.push(temp);
            this.detectTemperatureAnomalies();
            this.updateLocation();
            this.checkAlerts();
        }, 3000);
    }
}

// Define destination (Example: Algiers)
const destination = { lat: 36.75, lon: 3.06 };

// Start tracking
const tracker = new TruckTracker(destination);
tracker.startTracking();
