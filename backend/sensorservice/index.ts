import { TruckTracker } from "./src/trucks.js";


// async function getDestination(truckId: string) {
//     try {
//         const response = await fetch(`http://localhost:8000/truck/${truckId}`);
//         if (!response.ok) throw new Error(`Failed to fetch destination: ${response.statusText}`);

//         const data = await response.json();
//         return { lat: data.latitude, lon: data.longitude };
//     } catch (error) {
//         console.error("❌ Error fetching destination:", error);
//         return null;
//     }
// }
const truck = new TruckTracker({ lat: 37.7750, lon: -122.4183 }); // Destination

setInterval(async () => {
    await truck.track();
}, 5000);
