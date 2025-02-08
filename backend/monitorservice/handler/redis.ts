import * as redis from "redis";
import web3op from "./web3op";


const subscriber = redis.createClient();

let hasHadAlert = false;

async function setupSubscriber() {
    try {
        await subscriber.connect();
        console.log("📡 Redis Subscriber Connected. Listening for events...");

        
        await subscriber.subscribe("truck-event", (message) => {
            console.log(`📩 Received Event: ${message}`);

           
            if (message === "ALERT") {
                console.warn("🚨 Action Required: High Temperature or Delay Detected!");
                triggerEmergencyProtocol();
                hasHadAlert = true;
            }

            else if (message === "OK") {
                console.log("✅ Everything is normal.");
            }

            else if (message === "destinationReached") {
                console.log("🎯 Truck has reached its destination!");
                handleDestinationReached();
            }
        });

    } catch (error) {
        console.error("❌ Redis Subscriber Error:", error);
    }
}

function triggerEmergencyProtocol() {
    console.log("⚠️ 🚛 Dispatching a Maintenance Team... Notifying Authorities!");
}

function handleDestinationReached() {
    console.log("📍 Delivery completed");
    if (hasHadAlert) {
        console.log("❌ Journey had alerts - marking contract as broken");
        isdown(1, 1, 0); //test with those values instaed of calling the django server to egt the valuse 
    } else {
        console.log("✅ Journey completed successfully without alerts");
        isup(1, 1, 0); 
    }
    hasHadAlert = false; 
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
