import React from 'react'
import {Card} from "antd"

interface CandidateCardProps {
    id: number;
    name: string;
    votes: number;
}

const CandidateCard: React.FC<CandidateCardProps> = ({id, name, votes}) => {
  return (
    <>
        <Card title={name} bordered={true} style={{ width: 300, borderRadius: 10, boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", margin: 10 }}>
        <p><strong>ID:</strong>{id}</p>
        <p><strong>Votes</strong>{votes}</p>
        </Card>
    </>
    
  )
}

export default CandidateCard