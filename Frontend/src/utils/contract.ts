import Web3 from "web3";
import contractData from "./VotingSystem.json";

const contractAddress = "0x1F97dCA1FEF579e80d3273229A6Be7C6dC5B9a25";
const contractABI = contractData.abi;

export const getContractInstance = (web3: Web3) => {
  return new web3.eth.Contract(contractABI, contractAddress);
};
