import Web3 from "web3";
import contractData from "./VotingSystem.json";

const contractABI = contractData.abi;

export const getContractInstance = async (web3: Web3) => {
  const overrideAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const networkId = await web3.eth.net.getId();
  const address =
    overrideAddress ?? (contractData as any)?.networks?.[String(networkId)]?.address;

  if (!address) {
    throw new Error(
      `Contract not deployed on network id ${networkId}. Check MetaMask network (Ganache is usually 5777).`,
    );
  }

  const code = await web3.eth.getCode(address);
  if (!code || code === "0x" || code === "0x0") {
    throw new Error(
      `No contract bytecode found at ${address} on network id ${networkId}. Re-deploy (e.g. \`truffle migrate --reset\`) and update the frontend artifact/address.`,
    );
  }

  return new web3.eth.Contract(contractABI as any, address);
};
