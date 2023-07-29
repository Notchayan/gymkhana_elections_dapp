// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract Election {
    struct Voter {
        bool registered;
        bool voted;
    }

    struct Candidate {
        string name;
        uint votes;
    }

    address public electionAdmin;
    mapping(address => Voter) public electorate;
    Candidate[] public candidates;
    uint public electionEndTime;

    constructor(string[] memory candidateNames, uint duration) {
        electionAdmin = msg.sender;
        electorate[electionAdmin].registered = true;
        for (uint i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate({name: candidateNames[i], votes: 0}));
        }
        electionEndTime = block.timestamp + duration;
    }

    function registerVoter(address voterAddress) external {
        require(msg.sender == electionAdmin, "Only the election admin can register voters.");
        require(!electorate[voterAddress].voted, "Voter already voted.");
        require(!electorate[voterAddress].registered, "Voter is already registered.");
        electorate[voterAddress].registered = true;
    }

    function registerCandidate(string memory candidateName) external {
        require(msg.sender == electionAdmin, "Only the election admin can register candidates.");
        candidates.push(Candidate({name: candidateName, votes: 0}));
    }

    function castVote(uint firstChoice, uint secondChoice, uint thirdChoice) external {
        require(block.timestamp <= electionEndTime, "Voting period is over.");
        Voter storage voter = electorate[msg.sender];
        require(voter.registered, "Voter is not registered.");
        require(!voter.voted, "Voter already cast their vote.");
        candidates[firstChoice].votes += 5;
        candidates[secondChoice].votes += 3;
        candidates[thirdChoice].votes += 1;
        voter.voted = true;
    }

    function declareWinner() public view returns (string memory) {
        require(block.timestamp > electionEndTime, "Election is not yet over.");
        uint maxVotes = 0;
        uint winnerIndex = 0;
        for (uint i = 0; i < candidates.length; i++) {
            if (candidates[i].votes > maxVotes) {
                maxVotes = candidates[i].votes;
                winnerIndex = i;
            }
        }
        return candidates[winnerIndex].name;
    }

    function getResults() public view returns (Candidate[] memory) {
        return candidates;
    }   
}

