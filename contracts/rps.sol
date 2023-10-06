// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Demo {//0xa3E23216d968162e555EF382896EABc0F2d8E21A
    string public playersChoose = "";
    constructor () {
        playersChoose = "";
    }

    function getPlayersChoose() view public returns(string memory) {
        return playersChoose;
    }
    function changeToRock() external {
        playersChoose = "rock";
    }
    function changeToPaper() external {
        playersChoose = "paper";
    }
    function changeToScissors() external {
        playersChoose = "scissors";
    }

    function deposit() external payable {}

    function withdraw(address payable _to, uint _amount) external {
        _to.transfer(_amount * 1000000000000000000);
    }
    function getBalance() external view returns(uint) {
        return address(this).balance;
    }

    function getAddress() external view returns(address) {
        return address(this);
    }
}
