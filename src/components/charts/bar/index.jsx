import React from "react";
import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

const ClientEngagementChart = () => {
  return (
    <Box sx={{ width: "100%", height: 300 }}>
      <BarChart
        axisHighlight={{ x: "none", y: "none" }}
        xAxis={[
          {
            scaleType: "band",
            data: ["Unique Clients", "Repeated Clients"],
            categoryGapRatio: 0.3,
            tickLabelStyle: { fontSize: 13, fill: "#555", fontWeight: 500 },
            disableLine: true,
            disableTicks: true,
          },
        ]}
        yAxis={[
          {
            tickLabelStyle: { fontSize: 12, fill: "rgba(0, 0, 0, 1)" },
            disableLine: true,
            disableTicks: true,
          },
        ]}
        series={[
          {
            data: [40, 120],
          },
        ]}
        grid={{ horizontal: true }}
        margin={{ left: 40, right: 20, top: 20, bottom: 40 }}
        tooltip={{ trigger: "none" }}
        
        sx={{
          "& .MuiChartsGrid-line": { strokeDasharray: "4 4", stroke: "rgba(39, 36, 37, 1)" },
          
          "& .MuiBarElement-root": { 
            pointerEvents: "none",
            rx: 0,
            ry: 0,
            clipPath: "inset(0px 0px 0px 0px round 10px 10px 0px 0px)", 
          },

          "& .MuiBarElement-root:nth-of-type(1)": { fill: "#105F85" },
          "& .MuiBarElement-root:nth-of-type(2)": { fill: "#1B9ED9" },
        }}
      />
    </Box>
  );
};

export default ClientEngagementChart;