import { GPS } from "./gps.js";
import { TemperatureSensor } from "./sensor.js";
import { faker } from "@faker-js/faker";

class TruckTracker {
    private truckId: string;
    private gps: GPS;
    private sensor: TemperatureSensor;

    constructor(destination: { lat: number; lon: number }) {
        this.truckId = faker.string.uuid();
        this.gps = new GPS(destination);
        this.sensor = new TemperatureSensor();
    }

    public async track() {
        await this.gps.trackGPS(this.truckId);
        await this.sensor.trackTemperature(this.truckId);
    }

    public getTruckId(): string {
        return this.truckId;
    }
}

export { TruckTracker };
