// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract VotingSystem {
    struct Candidate {
        string name;
        uint id;
        uint votes;
    }

    mapping(uint => Candidate) public candidates;
    mapping(uint => bool) private candidateExists;

    uint public candidateCount;
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    event CandidateAdded(uint id, string name);
    event CandidateRemoved(uint id, string name);
    event Voted(address voter, uint candidateId);

    constructor() public{
        owner = msg.sender;
        candidateCount = 0;
    }

    
    function addCandidate(string memory _name) public onlyOwner {
        require(bytes(_name).length > 0, "Candidate name cannot be empty");

        uint newId = candidateCount; 
        candidates[newId] = Candidate(_name, newId, 0);
        candidateExists[newId] = true;
        candidateCount++; 

        emit CandidateAdded(newId, _name);
    }

    
    function removeCandidate(uint _id) public onlyOwner {
        require(candidateExists[_id], "Candidate does not exist");

        emit CandidateRemoved(_id, candidates[_id].name);

        delete candidates[_id];
        delete candidateExists[_id];
    }

    //whether a person has already voted or not is checked by the frontend
    function vote(uint _candidateId) public {
        require(candidateExists[_candidateId], "Candidate does not exist");

        
        candidates[_candidateId].votes++;
        
        //update database to store the address of the user who casted vote
        emit Voted(msg.sender, _candidateId);
    }

    
    function isOwner(address user) public view returns (bool) {
        return user == owner;
    }

    
    function getAllCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory allCandidates = new Candidate[](candidateCount);
        uint index = 0;

       
        for (uint i = 0; i < candidateCount; i++) {
            if (candidateExists[i]) {
                allCandidates[index] = candidates[i];
                index++;
            }
        }

        return allCandidates;
    }
}