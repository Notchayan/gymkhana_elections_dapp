// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract Poll {

    struct Voter {
        bool registered;
        bool voted;
    }

    struct Nominee {
        string name;
        uint count;
    }

    address public pollAdmin;
    mapping(address => Voter) public electorate;
    Nominee[] public nominees;
    uint public end;

    constructor(string[] memory nomineeNames, uint period) {
        pollAdmin = msg.sender;
        electorate[pollAdmin].registered = true;
        for (uint i = 0; i < nomineeNames.length; i++) {
            nominees.push(Nominee({name: nomineeNames[i], count: 0}));
        }
        end = block.timestamp + period;
    }

    modifier onlyAdmin() {
        require(msg.sender == pollAdmin, "Only the poll admin can perform this.");
        _;
    }

    modifier beforePollEnd() {
        require(block.timestamp <= end, "Polling period is over.");
        _;
    }

    modifier afterPollEnd() {
        require(block.timestamp > end, "Polling is not yet over.");
        _;
    }

    function enrolVoter(address voter) external onlyAdmin {
        require(!electorate[voter].voted, "Voter has already voted.");
        require(!electorate[voter].registered, "Voter is already registered.");
        electorate[voter].registered = true;
    }

    function addNominee(string memory nomineeName) external onlyAdmin {
        nominees.push(Nominee({name: nomineeName, count: 0}));
    }

    function vote(uint first, uint second, uint third) external beforePollEnd {
        Voter storage voter = electorate[msg.sender];
        require(voter.registered, "Voter is not registered.");
        require(!voter.voted, "Voter has already voted.");
        nominees[first].count += 5;
        nominees[second].count += 3;
        nominees[third].count += 1;
        voter.voted = true;
    }

    function getWinner() public view afterPollEnd returns (string memory) {
        uint max = 0;
        uint winnerIndex = 0;
        for (uint i = 0; i < nominees.length; i++) {
            if (nominees[i].count > max) {
                max = nominees[i].count;
                winnerIndex = i;
            }
        }
        return nominees[winnerIndex].name;
    }

    function results() public view returns (Nominee[] memory) {
        return nominees;
    }
}
