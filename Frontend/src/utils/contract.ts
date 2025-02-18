import Web3 from "web3";
import contractData from "./VotingSystem.json";

const contractAddress = "0x36fE85dF9633c4eA5F9BdDB564C52C8Fcb7681A3";
const contractABI = contractData.abi;

export const getContractInstance = (web3: Web3) => {
  return new web3.eth.Contract(contractABI, contractAddress);
};
