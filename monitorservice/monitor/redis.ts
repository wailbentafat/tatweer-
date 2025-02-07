import { createClient } from "redis";

const redisC = createClient({
    url: "redis://localhost:6379",
});

redisC.on("error", (err) => console.error("Redis error:", err));

await redisC.connect();


const subscriber = redisC.duplicate();
await subscriber.connect();

console.log("✅ Subscribed to 'sensor-events'");

async function listenToRedis() {
    try {
      
        await subscriber.subscribe("sensor-events", (message, channel) => {
            console.log(`📡 Message received on ${channel}: ${message}`);
        });
    } catch (error) {
        console.error("❌ Error in Redis subscription:", error);
    }
}

listenToRedis();
