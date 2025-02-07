import { faker } from "@faker-js/faker";

// Simulates temperature readings
function generateTemperature(): number {
  return faker.number.float({ min: 5, max: 30, fractionDigits: 1 });
}

// Function to detect critical scenarios
function detectAnomalies(tempHistory: number[]): void {
  if (tempHistory.length < 2) return; // Need at least 2 readings to detect changes

  const prevTemp = tempHistory[tempHistory.length - 2];
  const currTemp = tempHistory[tempHistory.length - 1];

  if (currTemp >= 24) {
    console.log("⚠️ Warning: Temperature is approaching the danger zone! Current:", currTemp, "°C");
  }

  if (prevTemp >= 24 && currTemp <= 10) {
    console.log("🚨 Critical: Sudden freeze detected! Possible damage.");
    console.log("📌 Data Log: Prev Temp =", prevTemp, "°C → Current Temp =", currTemp, "°C");
  }
}

// Simulate real-time data stream
const tempHistory: number[] = [];

setInterval(() => {
  const temp = generateTemperature();
  tempHistory.push(temp);

  console.log("🌡️ Temperature Reading:", temp, "°C");
  detectAnomalies(tempHistory);
}, 3000);
