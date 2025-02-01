"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "@/app/utils/contractConfig";

export default function AdminPanel() {
    const [candidates, setCandidates] = useState([]);
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        async function connectBlockchain() {
            if (typeof window !== "undefined") {
                console.log(window.ethereum);
                if (window.ethereum) {
                    try {
                        const provider = new ethers.providers.Web3Provider(window.ethereum);
                        await window.ethereum.request({ method: "eth_requestAccounts" });

                        const network = await provider.getNetwork();
                        if (network.chainId !== 1337) {
                            alert("Please connect to the Ganache network.");
                            return;
                        }

                        const signer = provider.getSigner();
                        const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
                        
                        // Update state with contract and account information
                        setContract(contractInstance);
                        const userAccount = await signer.getAddress();
                        setAccount(userAccount);

                        // Fetch candidates after contract is set
                        fetchCandidates(contractInstance);
                    } catch (error) {
                        console.error("Error connecting to MetaMask:", error);
                        alert("There was an error connecting to MetaMask. Please check your MetaMask connection.");
                    }
                } else {
                    alert("Please install MetaMask.");
                }
            }
        }
        connectBlockchain();
    }, []);

    // Fetch candidates after contract is set
    async function fetchCandidates(contractInstance) {
        try {
            if (!contractInstance) return;
            const result = await contractInstance.getAllCandidates();
            setCandidates(result);
        } catch (error) {
            console.error("Error fetching candidates:", error);
        }
    }

    // Add candidate to blockchain
    async function addCandidate() {
        if (!contract || !name || !id) return alert("Enter valid details");

        try {
            const tx = await contract.addCandidate(name, parseInt(id));
            await tx.wait();
            alert("Candidate added successfully!");
            fetchCandidates(contract); // Re-fetch candidates after adding one
        } catch (error) {
            console.error("Error adding candidate:", error);
        }
    }

    // Remove candidate from blockchain
    async function removeCandidate(candidateId) {
        if (!contract) return;
        
        try {
            const tx = await contract.removeCandidate(candidateId);
            await tx.wait();
            alert("Candidate removed successfully!");
            fetchCandidates(contract); // Re-fetch candidates after removal
        } catch (error) {
            console.error("Error removing candidate:", error);
        }
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
            <p className="mb-2">Connected Wallet: {account || "Not connected"}</p>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Candidate Name"
                    className="p-2 border rounded mr-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Candidate ID"
                    className="p-2 border rounded mr-2"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <button onClick={addCandidate} className="p-2 bg-blue-500 text-white rounded">Add</button>
            </div>
            <ul className="bg-white p-4 shadow rounded">
                {candidates.map((candidate) => (
                    <li key={candidate.id.toString()} className="flex justify-between p-2 border-b">
                        {candidate.name} (ID: {candidate.id.toString()})
                        <button
                            onClick={() => removeCandidate(candidate.id)}
                            className="p-1 bg-red-500 text-white rounded"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
