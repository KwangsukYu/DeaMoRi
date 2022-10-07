// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LeagueContract {
    address public  _owner;
    address public  creator;
    bool public isOpened;
    address public  A;
    address public B;

    constructor(address creatorAddress, address teamA, address teamB) {
        _owner = msg.sender;
        creator = creatorAddress;
        A = teamA;
        B = teamB;
        isOpened = true;
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Only onwer");
        _;
    }

    modifier onlyCreator() {
        require(msg.sender == creator, "Only creator");
        _;
    }

    function ended(ERC20 token, uint256 winner, uint256 amount) public onlyCreator {
        uint256 erc20balance = token.balanceOf(address(this));
        require(amount <= erc20balance, "balance is low");
        if (winner == 0) {
            token.transfer(A, amount);
        } else if (winner == 1) {
            token.transfer(B, amount);
        }
        isOpened = false;
    }

    function cancled(ERC20 token, uint256 amount) public  onlyOwner {
        uint256 erc20balance = token.balanceOf(address(this));
        require(amount <= erc20balance, "balance is low");
        token.transfer(_owner, amount);
        isOpened = false;
    }
}