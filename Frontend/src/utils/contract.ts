import Web3 from "web3";
import contractData from "./VotingSystem.json";

const contractAddress = "0x2197a9BEE9ac87dfB88eF09F8218E66fD780f1D2";
const contractABI = contractData.abi;

export const getContractInstance = (web3: Web3) => {
  return new web3.eth.Contract(contractABI, contractAddress);
};
