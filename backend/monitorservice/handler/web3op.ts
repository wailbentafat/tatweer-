import { ethers } from "ethers";

const RPC_URL = "http://127.0.0.1:8545";  

const PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; 


const CONTRACT_ADDRESS = "0xYourContractAddress";  


const CONTRACT_ABI = [
    {
        "inputs": [
            { "internalType": "uint256", "name": "_contractId", "type": "uint256" },
            { "internalType": "uint256", "name": "_truckNumber", "type": "uint256" },
            { "internalType": "int256", "name": "_temperature", "type": "int256" }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "markAsBroken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "checkCompliance",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getShipmentData",
        "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" },
            { "internalType": "uint256", "name": "", "type": "uint256" },
            { "internalType": "int256", "name": "", "type": "int256" },
            { "internalType": "bool", "name": "", "type": "bool" }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];


const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

console.log("✅ Connected to Blockchain at", RPC_URL);


async function createContract(contractId: number, truckNumber: number, temperature: number , isBroken: boolean) {
    const tx = await contract.createContract(contractId, truckNumber, temperature, isBroken);
    await tx.wait();
    console.log("✅ Contract created!");
}

let latestShipmentData: any = {};

async function getShipmentData() {
    try {
        const data = await contract.getShipmentData();
        latestShipmentData = {
            contractId: data[0].toString(),
            truckNumber: data[1].toString(),
            temperature: data[2].toString(),
            isBroken: data[3]
        };
        console.log("📦 Shipment Data Updated:", latestShipmentData);
        return latestShipmentData;
    } catch (error) {
        console.error("❌ Error fetching shipment data:", error);
        return null;
    }
}


// markContractAsBroken();
// getShipmentData();
export default {
    createContract,
    latestShipmentData,
     getShipmentData
}
