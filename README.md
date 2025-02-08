# Raqeeb

## Overview

Raqeeb is a backend system that integrates IoT sensor data, smart contracts, and a dashboard for logistics management. It consists of three servers, each handling a distinct aspect of the system.

## Architecture

Raqeeb is built using three different backend technologies:

1. **Sensor Server (TypeScript)**

   - Handles sensor data from trucks.
   - Provides a `GET` request to retrieve the truck destination.
   - Sends real-time GPS data via WebSocket.
   - Calls the Django server to determine the destination.
   - Logs all events in Redis for event-driven architecture.

2. **Contract Server (Express + Ethereum.js)**

   - Manages Ethereum smart contracts.
   - Handles three main events:
     - `route_end`: Signals the completion of a shipment.
     - `alert`: Sends real-time WebSocket alerts.
     - `ok`: Verifies shipment completion and creates a smart contract.
   - Uses Solidity for smart contract development.
   - Utilizes Foundry for running and deploying contracts locally.
   - Provides two main API routes:
     - `GET /route` - Retrieves the latest shipment data.
     - `WS /alert` - Provides real-time WebSocket alerts.

3. **Dashboard Server (Django)**

   - Provides CRUD operations (`GET`, `POST`, `PUT`) for trucks and packages.
   - Serves as the central dashboard for logistics management.
   - Implements authentication with MetaMask using Wagmi.

## Tech Stack

- **TypeScript** (Sensor Server)
- **Express + Ethereum.js + Solidity** (Contract Server)
- **Django** (Dashboard Server)
- **Redis** (Event-driven architecture)
- **Foundry** (Smart contract deployment and testing)
- **Wagmi** (MetaMask authentication and Ethereum interactions)

## Setup and Installation

### Prerequisites

- Node.js
- Python + Django
- Redis
- Foundry
- Ethereum.js

### Installation Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/wailbentafat/Tatweer-
   cd raqeeb
   ```
2. Install dependencies for each server:
   - **Sensor Server** (TypeScript)
     ```sh
     cd sensor-server
     npm install
     ```
   - **Contract Server** (Express + Ethereum.js)
     ```sh
     cd contract-server
     npm install
     ```
   - **Dashboard Server** (Django)
     ```sh
     cd dashboard-server
     run django
     ```
3. Start Redis:
   ```sh
   redis-server
   ```
4. Start each server:
   - **Sensor Server:**
     ```sh
     suive bun run protocole
     ```
   - **Contract Server:**
     ```sh
     suivre bun run protocole 
     ```
   - **Dashboard Server:**
     ```sh
     python manage.py runserver
     ```

## API Endpoints

### Sensor Server (TypeScript)

- `GET /destination` - Retrieves truck destination.
- `WS /ws` - WebSocket route that provides real-time GPS data.

### Contract Server (Express + Ethereum.js)

- `GET /route` - Retrieves latest shipment data.
- `WS /alert` - Real-time WebSocket alerts.

### Dashboard Server (Django)

- `crud /truck` - Retrieves truck data.
.
- `crud /package` - Adds a package.
 ### Authentification and landingpage 
 -build with wagmi and next and metamask 

## Smart Contract

- Written in Solidity.
- Deployed using Foundry.
- Handles shipment validation and verification.

## Event-Driven Architecture

- Redis is used for logging events.
- WebSockets are used for real-time tracking and alerts.

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature-branch
   ```
3. Commit changes:
   ```sh
   git commit -m "Your message"
   ```
4. Push and create a pull request.

## License

MIT License

