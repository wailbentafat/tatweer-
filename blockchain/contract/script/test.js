const hre  = require("hardhat");
 

 async function main() {
   await hre.run("compile");
    const blockchain = await hre.ethers.getContractFactory("ColdChainMonitor");
    const depoly =await blockchain.deploy();
    await depoly.deployed();    
    console.log("deployed to :",depoly.address);    
    console.log(blockchain);
 }

 main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
 });