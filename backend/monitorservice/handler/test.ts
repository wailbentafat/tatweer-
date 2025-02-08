
import  {hardhat }from "hardhat";


import { abi } from "./artifacts/contracts/Lock.sol/ColdChainMonitor.dbg.json";
import { bytecode } from "./artifacts/build-info/d7bb035ee58034ab1d933d779069a688.json";

async function heyy() {
    const name = new ethers.ContractFactory("ColdChainMonitor", abi, bytecode);
}