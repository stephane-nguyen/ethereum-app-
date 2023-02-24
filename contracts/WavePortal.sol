// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract WavePortal {
    constructor() {
        console.log("Waveportal smart contract");
    }

    uint256 totalWaves;
    mapping(address => uint256) public waves;

    function wave() public {
        totalWaves += 1;
        waves[msg.sender] += 1;
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves", totalWaves);
        return totalWaves;
    }

    function getWavesForAddress(address _address)
        public
        view
        returns (uint256)
    {
        return waves[_address];
    }
}
