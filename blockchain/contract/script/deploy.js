const hre = require("hardhat");

async function main() {
  const ColdChainMonitor = await hre.ethers.getContractFactory("ColdChainMonitor");

  
  const contractId = 1; 
  const truckNumber = 101;
  const temperature = 5; 

  const coldChainMonitor = await ColdChainMonitor.deploy(contractId, truckNumber, temperature);

  await coldChainMonitor.deployed();

  console.log("ColdChainMonitor deployed to:", coldChainMonitor.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
