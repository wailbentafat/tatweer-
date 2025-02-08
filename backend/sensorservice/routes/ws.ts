import { generateGpsData } from "../sensor/gps.js";

export const gpsWs = async (socket: WebSocket) => {
    const sensorData = generateGpsData();
    socket.send(JSON.stringify(sensorData));
    setInterval(() => {
        const sensorData = generateGpsData();
        socket.send(JSON.stringify(sensorData));
    }, 3000);
};

