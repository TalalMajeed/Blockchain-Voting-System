import Web3 from "web3";
import contractData from "./VotingSystem.json";

const contractAddress = "0xd412F364D9F8B8E93681912CEdFA5171EE7d0215";
const contractABI = contractData.abi;

export const getContractInstance = (web3: Web3) => {
  return new web3.eth.Contract(contractABI, contractAddress);
};
