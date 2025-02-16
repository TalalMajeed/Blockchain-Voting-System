
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
      style={{
        minWidth: 270,
        maxWidth: 360,
        borderRadius: 15,
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
        overflow: "hidden",
        position: "relative",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}

      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
      }}
    >

      <div style={{ marginTop: 20 }}>
        <h3 style={{ fontWeight: 600, marginBottom: 10, fontSize: "20px" }}>
          {name}
        </h3>
        <p style={{fontSize:"14px", marginBottom: 60, color: "rgba(0,0,0,0.6)"}}>Candidate id: {id}</p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: 20,
          }}
        >
          <div style={{ display: "flex", gap: "5px" }}>
            <StarOutlined style={{ color: "#3dbf71", fontSize: 14 }} />
            <p style={{ margin: 0, fontSize: "17px" }}>
              <strong>Votes:</strong> {votes}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AdminDisplayCard;
