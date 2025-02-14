import React, { createContext, useContext, useState, useEffect } from "react";
import Web3 from "web3";

interface Web3ContextType {
  web3: Web3 | null;
  account: string | null;
  isConnecting: boolean;
  setWeb3: (web3: Web3) => void;
  setAccount: (account: string) => void;
  setIsConnecting: (isConnecting: boolean) => void;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      const web3Instance = new Web3((window as any).ethereum);
      setWeb3(web3Instance);
    }
  }, []);

  return (
    <Web3Context.Provider
      value={{
        web3,
        account,
        isConnecting,
        setWeb3,
        setAccount,
        setIsConnecting,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};
