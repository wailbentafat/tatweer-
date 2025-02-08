import { createClient } from "redis";

const redisClient = createClient();
redisClient.connect().catch(console.error);

export { redisClient };
