
"use client";

import React from "react";
import { Card } from "antd";
import { StarOutlined } from "@ant-design/icons";

interface AdminDisplayCardProps {
  id: number;
  name: string;
  votes: number;
}

const AdminDisplayCard: React.FC<AdminDisplayCardProps> = ({ id, name, votes }) => {
  return (
    <Card
      bordered={true}
      hoverable

      className="min-w-[270px] max-w-[360px] rounded-[15px] shadow-[0_4px_8px_rgba(0,0,0,0.1)] text-center overflow-hidden relative transition-[transform,box-shadow] duration-300 ease-in-out"

      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
      }}
    >

      <div className="mt-5">
        <h3 className="font-semibold mb-3 text-xl">
          {name}
        </h3>
        <p className="text-sm mb-14 text-[rgba(0,0,0,0.6)]">Candidate id: {id}</p>

        <div
          className="flex justify-center gap-5 mt-5"
        >
          <div className="flex gap-[5px]">
            <StarOutlined className="text-[#3dbf71] text-sm"/>
            <p className="m-0 text-lg">
              <strong>Votes:</strong> {votes}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AdminDisplayCard;
