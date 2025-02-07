// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ColdChainMonitor {
    uint256 public contractId;
    uint256 public truckNumber;
    int256 public temperature;
    bool public isBroken;

    event ContractDeployed(
        uint256 contractId,
        uint256 truckNumber,
        int256 temperature
    );
    event ContractBroken(uint256 contractId);

    constructor(
        uint256 _contractId,
        uint256 _truckNumber,
        int256 _temperature
    ) {
        contractId = _contractId;
        truckNumber = _truckNumber;
        temperature = _temperature;
        isBroken = false;

        emit ContractDeployed(contractId, truckNumber, temperature);
    }

    
    function markAsBroken() external {
        isBroken = true;
        emit ContractBroken(contractId);
    }

 
    function checkCompliance() external view returns (bool) {
        return !isBroken;
    }

  
    function getShipmentData()
        external
        view
        returns (uint256, uint256, int256, bool)
    {
        return (contractId, truckNumber, temperature, isBroken);
    }
}
