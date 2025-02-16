import Web3 from "web3";
import contractData from "./VotingSystem.json";

const contractAddress = "0xeE73462188d3d006c0e5C2c9FBe32a27fe02C15a";
const contractABI = contractData.abi;

export const getContractInstance = (web3: Web3) => {
  return new web3.eth.Contract(contractABI, contractAddress);
};
