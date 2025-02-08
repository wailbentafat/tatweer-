import { createServer } from "http";
import { WebSocketServer } from "ws";
import { redisClient } from "./redis.js";

const server = createServer();
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
    console.log("🔗 Client connected to WebSocket");
    ws.send(JSON.stringify({ message: "Connected to GPS WebSocket" }));

    ws.on("close", () => console.log("❌ Client disconnected"));
});

redisClient.subscribe("truck-event", (message) => {
    wss.clients.forEach((client) => {
        if (client.readyState === 1) {
            client.send(message);
        }
    });
});

server.listen(8080, () => console.log("🚀 WebSocket Server running on ws://localhost:8080"));

export { server };
