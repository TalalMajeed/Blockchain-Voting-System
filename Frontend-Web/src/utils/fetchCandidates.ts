
import { getContractInstance } from "./contract";

export interface Candidate {
  id: number;
  name: string;
  votes: number;
}

export const fetchCandidatesUtil = async (web3: any): Promise<Candidate[]> => {
  if (!web3) return [];
  try {
    const contract = getContractInstance(web3);
    const candidatesData = await contract.methods.getAllCandidates().call();

    const formattedCandidates = Array.isArray(candidatesData)
      ? candidatesData.map((c: any) => ({
          id: Number(c.id),
          name: c.name,
          votes: Number(c.votes),
        }))
      : [];

    return formattedCandidates.filter((candidate) => candidate.name !== "");
  } catch (error) {
    console.error("Failed to fetch candidates:", error);
    return [];
  }
};
