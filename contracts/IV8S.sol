// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IV8S {
    function projects(uint projectId) external view returns (string memory);
    function addProject(string memory url) external returns (uint);
}
