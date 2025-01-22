// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract VotingSystem {
    struct Candidate {
        string name;
        uint id;
    }

    mapping(uint => Candidate) public candidates;
    uint[] private candidateIDs;
    mapping(uint => bool) private candidateExists;

    mapping(address => string) private emails;
    mapping(string => address) private emailToAddress;

    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    event CandidateAdded(uint id, string name);
    event CandidateRemoved(uint id, string name);

    // Constructor with "public" visibility for Solidity <0.7.0
    constructor() public {
        owner = msg.sender;
    }

    function addCandidate(string memory _name, uint _id) public onlyOwner {
        require(bytes(_name).length > 0, "Candidate name cannot be empty");
        require(!candidateExists[_id], "Candidate ID already exists");

        candidates[_id] = Candidate(_name, _id);
        candidateIDs.push(_id);
        candidateExists[_id] = true;

        emit CandidateAdded(_id, _name);
    }

    function removeCandidate(uint _id) public onlyOwner {
        require(candidateExists[_id], "Candidate does not exist");

        emit CandidateRemoved(_id, candidates[_id].name);

        delete candidates[_id];
        candidateExists[_id] = false;
    }

    function registerEmail(string memory _email) public {
        require(bytes(_email).length > 0, "Email cannot be empty");
        require(emailToAddress[_email] == address(0), "Email already registered");

        emails[msg.sender] = _email;
        emailToAddress[_email] = msg.sender;
    }

    function getEmail() public view returns (string memory) {
        require(bytes(emails[msg.sender]).length > 0, "Email not registered");
        return emails[msg.sender];
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        uint count = candidateIDs.length;
        Candidate[] memory allCandidates = new Candidate[](count);
        uint index = 0;

        for (uint i = 0; i < count; i++) {
            uint id = candidateIDs[i];
            if (candidateExists[id]) {
                allCandidates[index] = candidates[id];
                index++;
            }
        }

        return allCandidates;
    }

    function getCandidateCount() public view returns (uint) {
        return candidateIDs.length;
    }
}
