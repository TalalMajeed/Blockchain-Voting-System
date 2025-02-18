
"use client";

import React from "react";
import { Card, Button} from "antd";
import { StarOutlined} from "@ant-design/icons";

interface CandidateCardProps {
  id: number;
  name: string;
  votes: number;
  onVote: (id: number) => void; 
}

const CandidateCard: React.FC<CandidateCardProps> = ({ id, name, votes, onVote }) => {
  return (
    <Card
      bordered={true}
      hoverable
      
      className="w-[270px] rounded-[15px] shadow-md text-center overflow-hidden relative transition-transform duration-300 ease-in-out hover:shadow-lg hover:scale-105"
      
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
      }}
    >

      <div >
        <h3  className="font-semibold mb-[70px] text-[20px]">
          {name}
        </h3>

        <div
          className="flex justify-center gap-5 mt-5" //gap-20
        >
          <div className="flex gap-[5px]">
            <StarOutlined className="text-[#3dbf71] text-[14px]" />
            <p className="m-0 text-[17px]">
              <strong>Votes:</strong> {votes}
            </p>
          </div>
        </div>

        <Button
          type="primary"
          shape="round"
          size="large"
          className="mt-5 w-4/5 bg-[#3dbf71] border-0"
          onClick={() => onVote(id)} 
        >
          Vote
        </Button>
      </div>
    </Card>
  );
};

export default CandidateCard;
