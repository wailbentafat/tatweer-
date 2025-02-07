const redis = require("redis");
const { faker } = require("@faker-js/faker");

const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});

redisClient.on("error", (err) => console.error("Redis error:", err));

// Fonction pour générer des données de capteur
function generateSensorData() {
  return {
    sensorId: faker.string.uuid(), 
    temperature: faker.number.float({ min: -10, max: 50, precision: 0.1 }), // Température aléatoire entre -10 et 50°C
    timestamp: new Date().toISOString(),
  };
}

// Publier des événements toutes les 3 secondes
setInterval(() => {
  const sensorData = generateSensorData();
  redisClient.publish("sensor-events", JSON.stringify(sensorData));
  console.log("Événement publié:", sensorData);
}, 3000);
