// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract WavePortal {
    constructor() {
        console.log("Waveportal smart contract");
    }

    uint256 totalWaves;
    mapping(address => mapping(address => uint256))
        public numberOfWavesSentByAddress;
    mapping(uint256 => address) public allWavers; //array storing addresses that sent wavers

    function wave() public {
        totalWaves += 1;
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves", totalWaves);
        return totalWaves;
    }

    function getMostWavesSender(address addr) public view returns (address) {
        uint256 maxWaves = 0;
        address mostWavesSender = address(0); //iniial value = no real address

        for (uint256 i = 1; i <= totalWaves; i++) {
            address sender = allWavers[i];
            if (numberOfWavesSentByAddress[sender][addr] > maxWaves) {
                maxWaves = numberOfWavesSentByAddress[sender][addr];
                mostWavesSender = sender;
            }
        }

        console.log(
            "%s is the address that has sent the most waves to %s",
            mostWavesSender,
            addr
        );
        return mostWavesSender;
    }

    function waveTo(address to) public {
        totalWaves += 1;
        numberOfWavesSentByAddress[msg.sender][to] += 1;
        allWavers[totalWaves] = msg.sender;

        console.log("%s has waved to %s!", msg.sender, to);
    }

    function getNumberOfWavesSentByAddress(address from, address to)
        public
        view
        returns (uint256)
    {
        console.log(
            "%s has sent %d wave(s) to %s",
            from,
            numberOfWavesSentByAddress[from][to],
            to
        );
        return numberOfWavesSentByAddress[from][to];
    }
}
