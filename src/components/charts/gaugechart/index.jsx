import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { purple } from "@mui/material/colors";

export default function ThreeArcGauge() {
  const data = [
    { id: 0, value: 33, color: "#FF6767" }, // Red
    { id: 1, value: 33, color: "#F3CA4F" }, // Yellow
    { id: 2, value: 34, color: "#6AFF1A" }, // Green
  ];

  return (
    <div
      style={{
        position: "relative",
        width: 280,
        height: 220,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* --- Arc Semi Circle --- */}
      <PieChart
        series={[
          {
            startAngle: -120,
            endAngle: 120,
            data,
            innerRadius: "80%",
            outerRadius: "90%",
            cornerRadius: 10,
            paddingAngle: 4, // tiny gap for neat join, no white border
          },
        ]}
        width={220}
        height={220}
        slotProps={{ legend: { hidden: true } }}
        sx={{
          position: "absolute",
          top: 100, 
          "& path": {
            stroke: "none", // <-- removes white border
          },// moves entire arc slightly down for better alignment
        }}
      />

      {/* --- Center Circle --- */}
     <div
  style={{
    position: "absolute",
    bottom: 25,
    top:150,
    width: 110,
    height: 110,
    borderRadius: "50%",
    background: "#C073FF",
    border: "6px solid black",
    boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  {/* --- Small Triangle Pointer --- */}
 <div
    style={{
      position: "absolute",
      left: -20,               // places triangle just outside the circle
      top: "50%",
      transform: "translateY(-50%)",
      width: 0,
      height: 0,
      borderTop: "8px solid transparent",
      borderBottom: "8px solid transparent",
      borderRight: "16px solid #C073FF", // same purple color
      filter: "drop-shadow(0px 1px 2px rgba(0,0,0,0.2))",
      zIndex: 2, // ensure it's above the background
    }}
  ></div>

  {/* --- Center Text --- */}
  <div style={{ fontSize: 32, fontWeight: "bold", color: "#333" }}>00</div>
  <div style={{ fontSize: 14, fontWeight: "bold", color: "#333" }}>/100</div>
  <div style={{ marginTop: 4, fontSize: 16, color: "#333" }}>---</div>
</div>


      {/* --- Pointer Circle --- */}
      <div
        style={{
          position: "absolute",
          width: 14,
          height: 14,
          background: "black",
          borderRadius: "50%",
          border:'2px solid purple',
          left: 30,
          bottom:10
        }}
      ></div>
    </div>
  );
}
