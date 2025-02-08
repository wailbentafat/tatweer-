import * as redis from "redis";
import web3op from "./web3op";


const subscriber = redis.createClient();

async function setupSubscriber() {
    try {
        await subscriber.connect();
        console.log("📡 Redis Subscriber Connected. Listening for events...");

        
        await subscriber.subscribe("truck-event", (message) => {
            console.log(`📩 Received Event: ${message}`);

           
            if (message === "ALERT") {
                console.warn("🚨 Action Required: High Temperature or Delay Detected!");
                triggerEmergencyProtocol();

            }

         else if (message === "OK") {
                console.log("✅ Everything is normal.");
            }
        });

    } catch (error) {
        console.error("❌ Redis Subscriber Error:", error);
    }
}

function triggerEmergencyProtocol() {
    console.log("⚠️ 🚛 Dispatching a Maintenance Team... Notifying Authorities!");
}

setupSubscriber();


function isdown ( contractId: number, truckNumber: number, temperature: number) {
   web3op.createContract(contractId, truckNumber, temperature, true);
}
function isup ( contractId: number, truckNumber: number, temperature: number) {
    web3op.createContract(contractId, truckNumber, temperature, false);
}

export {
    isdown,
    isup,
    setupSubscriber
}
