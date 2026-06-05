// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract OreForgeTreasury {
    address public owner;
    uint256 public totalDeposits;

    mapping(address => uint256) public credits;

    event Deposited(address indexed user, uint256 amount);
    event RewardMinted(address indexed user, uint256 amount);
    event Claimed(address indexed user, uint256 amount);
    event Withdrawn(address indexed owner, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function deposit() external payable {
        require(msg.value > 0, "Zero deposit");
        totalDeposits += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    function mintCredits(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Zero address");
        require(amount > 0, "Zero amount");

        credits[to] += amount;
        emit RewardMinted(to, amount);
    }

    function claimCredits(uint256 amount) external {
        require(amount > 0, "Zero amount");
        require(credits[msg.sender] >= amount, "Insufficient credits");

        credits[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);

        emit Claimed(msg.sender, amount);
    }

    function withdrawTreasury(uint256 amount) external onlyOwner {
        require(amount > 0, "Zero amount");
        require(amount <= address(this).balance, "Insufficient balance");

        payable(owner).transfer(amount);
        emit Withdrawn(owner, amount);
    }
}
