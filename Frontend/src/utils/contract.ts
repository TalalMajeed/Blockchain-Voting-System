import Web3 from "web3";
import contractData from "./VotingSystem.json";

const contractAddress = "0x1863F93d36720194e5AC53aE4F9062F063675E57";
const contractABI = contractData.abi;

export const getContractInstance = (web3: Web3) => {
  return new web3.eth.Contract(contractABI, contractAddress);
};
