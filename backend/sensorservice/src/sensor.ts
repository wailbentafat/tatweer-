import { faker } from "@faker-js/faker";
import { redisClient } from "./redis.js";

class TemperatureSensor {
    private temperatureHistory: number[] = [];

    private generateTemperature(): number {
        return faker.number.float({ min: 5, max: 30, fractionDigits: 1 });
    }

    private detectAnomalies(): string {
        if (this.temperatureHistory.length < 2) return "OK";

        const prevTemp = this.temperatureHistory[this.temperatureHistory.length - 2];
        const currTemp = this.temperatureHistory[this.temperatureHistory.length - 1];

        if (currTemp >= 24) {
            console.warn("⚠️ Warning: High temperature detected!", currTemp, "°C");
            return "ALERT";
        }

        if (prevTemp >= 24 && currTemp <= 10) {
            console.error("🚨 Critical: Sudden freeze detected!");
            return "ALERT";
        }

        return "OK";
    }

    public async trackTemperature(truckId: string) {
        const temp = this.generateTemperature();
        this.temperatureHistory.push(temp);

        const status = this.detectAnomalies();

        const eventData = {
            truckId,
            temperature: temp,
            status,
        };

        await redisClient.publish("truck-event", JSON.stringify(eventData));
        console.log(`📢 Temperature Event Sent for Truck ${truckId}`);
    }
}

export { TemperatureSensor };
