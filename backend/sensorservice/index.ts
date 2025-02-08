import TruckTracker from "./sensor/sensor.ts";

// Define destination (Example: Algiers)
const destination = { lat: 36.75, lon: 3.06 };
const tracker = new TruckTracker(destination);

// Run tracking every 3 seconds
setInterval(() => {
    const status = tracker.track();
    if (status) {
        console.log("🚨 An issue was detected, check the logs.");
    }
}, 3000);
