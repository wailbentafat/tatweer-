import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://localhost:6379" // Ensure Redis is running at this address
});

redisClient.on("error", (err) => console.error("Redis error:", err));

(async () => {
  try {
    await redisClient.connect();
    console.log("🚀 Redis connected!");

    // Test Redis: Set and Get a value
    await redisClient.set("test_key", "Hello, Redis!");
    const value = await redisClient.get("test_key");
    console.log("✅ Stored value in Redis:", value);

  } catch (error) {
    console.error("❌ Redis connection failed:", error);
  }
})();
