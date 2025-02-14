"use client";
import { useWeb3 } from "../../../context/Web3Context";
import { useUser } from "../../../context/UserContext";

export default function Cast() {
  const { web3, account } = useWeb3();
  const { email, phone } = useUser();
  return (
    <div>
      <h1>Cast Your Vote</h1>
      <p>Account: {account}</p>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
    </div>
  );
}
