import Web3 from "web3";
import contractData from "./VotingSystem.json";

const contractAddress = "0xbb0F8879B8b37a3ca243a21AAb5a3f2c2081759e";
const contractABI = contractData.abi;

export const getContractInstance = (web3: Web3) => {
  return new web3.eth.Contract(contractABI, contractAddress);
};
