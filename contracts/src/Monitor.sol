// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

event ContractBroken(uint256 contractId);

contract Monitor {

    // DEV: Why deploying a contarct for each id? Consider tracking all ids in a `mapping` in one contract. See here for mapping: https://solidity-by-example.org/mapping/.
    // Something like this: `mapping(uint256 id => Data data)` public monitor; where Data is a `struct` with the other things needed (truckNumber, temperature, isBroken ...etc).

    uint256 public contractId;
    uint256 public truckNumber;
    int16 public temperature;
    bool public isBroken;

    constructor(
        uint256 _contractId,
        uint256 _truckNumber,
        int16 _temperature
    ) {
        contractId = _contractId;
        truckNumber = _truckNumber;
        temperature = _temperature;
        // DEV: No need to init `isBroken`. All variables are null by default, e.g. all `bool` are false by default.
    }

    function setBroken() external {
        // DEV: Anyone can mark contract as broken, add access control. See: https://docs.openzeppelin.com/contracts/2.x/access-control.
        isBroken = true;
        emit ContractBroken(contractId);
    }

    function getBroken() external view returns (bool) {
        // DEV: No need for this getter. All public variables have a getter by default.
        return isBroken;
    }

    function getShipmentData()
        external
        view
        returns (uint256, uint256, int256, bool)
    {
        return (contractId, truckNumber, temperature, isBroken);
    }
}
