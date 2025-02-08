import * as redis from "redis";
import web3op from "./web3op";
import WebSocket, { WebSocket as WebSocketClient } from 'ws';

const subscriber = redis.createClient();

const wss = new WebSocket.Server({ port: 8080 });

let hasHadAlert = false;

async function setupSubscriber() {
    try {
        await subscriber.connect();
        console.log("📡 Redis Subscriber Connected. Listening for events...");
        console.log("🔌 WebSocket server running on ws://localhost:8080");

        wss.on('connection', (ws: WebSocketClient) => {
            console.log('New WebSocket client connected');
        });
        
        await subscriber.subscribe("truck-event", (message) => {
            console.log(`📩 Received Event: ${message}`);

            if (message === "ALERT") {
                console.warn("🚨 Action Required: High Temperature or Delay Detected!");
                triggerEmergencyProtocol();
                hasHadAlert = true;
                
                
                wss.clients.forEach((client: WebSocketClient) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            type: 'ALERT',
                            message: 'High Temperature or Delay Detected!',
                            timestamp: new Date().toISOString()
                        }));
                    }
                });
            }

            else if (message === "OK") {
                console.log("✅ Everything is normal.");
                wss.clients.forEach((client: WebSocketClient) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            type: 'OK',
                            message: 'Everything is normal',
                            timestamp: new Date().toISOString()
                        }));
                    }
                });
            }

            else if (message === "destinationReached") {
                console.log("🎯 Truck has reached its destination!");
                handleDestinationReached();
                wss.clients.forEach((client: WebSocketClient) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            type: 'DESTINATION_REACHED',
                            message: 'Truck has reached its destination!',
                            timestamp: new Date().toISOString()
                        }));
                    }
                });
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
        isdown(1, 1, 0); 
    } else {
        console.log("✅ Journey completed successfully without alerts");
        isup(1, 1, 0); 
    }
    hasHadAlert = false; 
}

setupSubscriber();

function isdown(contractId: number, truckNumber: number, temperature: number) {
   web3op.createContract(contractId, truckNumber, temperature, true);
}
function isup(contractId: number, truckNumber: number, temperature: number) {
    web3op.createContract(contractId, truckNumber, temperature, false);
}

export {
    isdown,
    isup,
    setupSubscriber
}
