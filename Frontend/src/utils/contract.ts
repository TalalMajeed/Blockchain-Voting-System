import Web3 from "web3";
import contractData from "./VotingSystem.json";

const contractAddress = "0x0dF4E87541224ceb676219B9819B027a491b038e";
const contractABI = contractData.abi;

export const getContractInstance = (web3: Web3) => {
  return new web3.eth.Contract(contractABI, contractAddress);
};
