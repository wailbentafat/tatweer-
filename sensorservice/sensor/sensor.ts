import { createClient } from "redis";
import { faker } from "@faker-js/faker";

// Création du client Redis
const redisClient = createClient({
  url: "redis://localhost:6379",
});

redisClient.on("error", (err) => console.error("Redis error:", err));

// Connexion au serveur Redis
await redisClient.connect();

// Fonction pour générer des données de capteur
function generateSensorData() {
  return {
    sensorId: faker.string.uuid(),
    temperature: faker.number.float({ min: -10, max: 50, fractionDigits: 0.1 }),
    timestamp: new Date().toISOString(),
  };
}

// Publier des événements toutes les 3 secondes
setInterval(async () => {
  const sensorData = generateSensorData();
  try {
    await redisClient.publish("sensor-events", JSON.stringify(sensorData));
    console.log("Événement publié:", sensorData);
  } catch (err) {
    console.error("Erreur lors de l'envoi à Redis :", err);
  }
}, 3000);

// Ne pas fermer la connexion Redis immédiatement !
