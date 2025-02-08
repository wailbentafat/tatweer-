// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Test, console} from "forge-std/Test.sol";
import {Monitor} from "../src/Monitor.sol";

contract MonitorTest is Test {
    Monitor public monitor;

    function setUp() public {
        uint256 contractId = 0;
        uint256 truckNumber = 0;
        int16 temperature = 12;

        monitor = new Monitor(contractId, truckNumber, temperature);
    }

    function test_setBroken() public {
        assertEq(monitor.isBroken(), false);
        monitor.setBroken();
        assertEq(monitor.isBroken(), true);
    }

    // DEV: Tests are very important in smart contracts, the more tests the better! Run `forge coverage` to see how much your code is tested.
}
