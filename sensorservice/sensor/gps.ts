import { Faker } from "@faker-js/faker";



const generateGpsData = () => {
    return {
        latitude: Faker.location.latitude(),
        longitude: Faker.location.longitude(),
        altitude: Faker.number.float({ min: -50, max: 100, fractionDigits: 1 }),
        timestamp: new Date().toISOString(),
    };
};  

export { generateGpsData };