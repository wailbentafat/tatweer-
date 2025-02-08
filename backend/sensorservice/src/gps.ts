import { faker } from "@faker-js/faker";
import { redisClient } from "./redis.js";

class GPS {
    private latitude: number;
    private longitude: number;
    private destination: { lat: number; lon: number };

    constructor(destination: { lat: number; lon: number }) {
        this.latitude = faker.location.latitude();
        this.longitude = faker.location.longitude();
        this.destination = destination;
    }

    private getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371000; // Earth's radius in meters
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);

        const a = Math.sin(dLat / 2) ** 2 +
                  Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                  Math.sin(dLon / 2) ** 2;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in meters
    }

    private updateLocation() {
        this.latitude += (this.destination.lat - this.latitude) * 0.01;
        this.longitude += (this.destination.lon - this.longitude) * 0.01;
    }

    public async trackGPS(truckId: string) {
        this.updateLocation();
        const distance = this.getDistance(this.latitude, this.longitude, this.destination.lat, this.destination.lon);

        console.log(`🚚 Distance to destination: ${distance.toFixed(2)} meters`);

        const eventData = {
            truckId,
            latitude: this.latitude,
            longitude: this.longitude,
            status: distance < 50 ? "destinationReached" : "inTransit",
        };

        await redisClient.publish("truck-event", JSON.stringify(eventData));
        console.log(`📢 GPS Event Sent for Truck ${truckId}`);
    }
}

export { GPS };
