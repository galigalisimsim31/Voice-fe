import React from "react";
import { Box } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

const CallVolumeChart = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const callData = [0, 60, 100, 147, 175, 195, 250];

  return (
    <Box sx={{ width: "100%", height: 300 }}>
      <LineChart
        xAxis={[
          {
            data: days,
            scaleType: "point",
            label: "No. of Days",
            tickLabelStyle: { fill: "#666", fontSize: 12 },
          },
        ]}
        yAxis={[{ label: "No. of Calls" }]}
        series={[
          {
            data: callData,
            color: "#4FC3F7",
            showMark: true,
            valueFormatter: (v) => `${v} Calls`,
            curve: "catmullRom", 
          },
        ]}
        grid={{ horizontal: true }}
        
        sx={{
          "& .MuiMarkElement-root": {
            fill: "#0288D1",
            stroke: "#fff",
            strokeWidth: 2,
            transform: "scale(0.8)", 
            transformOrigin: "center", 
            transformBox: "fill-box", 
          },
        }}

        margin={{ left: 50, right: 20, top: 20, bottom: 30 }}
      />
    </Box>
  );
};

export default CallVolumeChart;