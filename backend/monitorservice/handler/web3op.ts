import { ethers } from "ethers";

const RPC_URL = "http://127.0.0.1:8546";  
const PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; 
const CONTRACT_ADDRESS = "0xYourContractAddress";  

const CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "getShipmentData",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256", 
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256" 
      },
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Create provider and wallet using Ethers v6 syntax
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

console.log("✅ Connected to Blockchain at", RPC_URL);

async function getShipmentData() {
    try {
        const data = await contract.getShipmentData();
        return {
            contractId: data[0].toString(),
            truckNumber: data[1].toString(),
            temperature: data[2].toString(),
            isBroken: data[3]
        };
    } catch (error) {
        console.error("❌ Error fetching shipment data:", error);
        return null;
    }
}

export default { getShipmentData };
