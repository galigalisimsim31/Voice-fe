import React from "react";
import { Box, Stack, Typography } from "@mui/material";

// --- Helper: Math to calculate coordinates on a circle ---
const getCoordinates = (cx, cy, radius, angleInDegrees) => {
  // SVG uses radians; subtract 90deg to start at 12 o'clock
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
};

const ArrowDonut = ({ data, size = 260, innerRadius = 70, outerRadius = 100 }) => {
  const cx = size / 2;
  const cy = size / 2;
  const total = data.reduce((acc, item) => acc + item.value, 0);
  
  let currentAngle = 0;

  // --- STEP 1: Calculate all geometry beforehand ---
  const segments = data.map((item) => {
    const sliceAngle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    
    // Update angle for the next loop
    currentAngle += sliceAngle;

    // 1. Arc Calculation
    const startOuter = getCoordinates(cx, cy, outerRadius, startAngle);
    const endOuter = getCoordinates(cx, cy, outerRadius, endAngle);
    const startInner = getCoordinates(cx, cy, innerRadius, startAngle);
    const endInner = getCoordinates(cx, cy, innerRadius, endAngle);
    const largeArcFlag = sliceAngle > 180 ? 1 : 0;

    // Create the main arc path
    const pathData = [
      `M ${startOuter.x} ${startOuter.y}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y}`,
      `L ${endInner.x} ${endInner.y}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${startInner.x} ${startInner.y}`,
      "Z"
    ].join(" ");

    // 2. Arrow Calculation (Tip extends 12 degrees into the next slice)
    const midRadius = innerRadius + (outerRadius - innerRadius) / 2;
    const arrowTipAngle = endAngle + 12; // Points forward
    
    const arrowTip = getCoordinates(cx, cy, midRadius, arrowTipAngle);
    const arrowOuterBase = getCoordinates(cx, cy, outerRadius, endAngle);
    const arrowInnerBase = getCoordinates(cx, cy, innerRadius, endAngle);
    
    const arrowPoints = `${arrowOuterBase.x},${arrowOuterBase.y} ${arrowTip.x},${arrowTip.y} ${arrowInnerBase.x},${arrowInnerBase.y}`;

    // 3. Label Calculation
    const midAngle = startAngle + sliceAngle / 2;
    const labelPos = getCoordinates(cx, cy, midRadius, midAngle);

    return { ...item, pathData, arrowPoints, labelPos };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      
      {/* LAYER 1: Draw ALL Arcs first (Background) */}
      {segments.map((seg, i) => (
        <path 
          key={`arc-${i}`} 
          d={seg.pathData} 
          fill={seg.color} 
          stroke="none" 
        />
      ))}

      {/* LAYER 2: Draw ALL Arrows next (Foreground) */}
      {/* This guarantees the interlocking effect works on both sides */}
      {segments.map((seg, i) => (
        <polygon 
          key={`arrow-${i}`} 
          points={seg.arrowPoints} 
          fill={seg.color} 
        />
      ))}

      {/* LAYER 3: Labels */}
      {segments.map((seg, i) => (
        <text
          key={`text-${i}`}
          x={seg.labelPos.x}
          y={seg.labelPos.y}
          fill="white"
          textAnchor="middle"
          dominantBaseline="middle"
          fontWeight="bold"
          fontSize="18"
        >
          {seg.value}
        </text>
      ))}
    </svg>
  );
};


const CallPerformanceChart = () => {
  const data = [
    { value: 200, color: "rgba(255, 90, 95, 1)", label: "Failed" }, 
    { value: 300, color: "rgba(0, 179, 105, 1)", label: "Successful" },
  ];

  return (
    <Box sx={{ width: "100%", height: 300, display: "flex", flexDirection: "column", alignItems: "center" }}>
      
      <Stack direction="column" spacing={1} sx={{ width: "100%", justifyContent: "flex-end", mb: 1, px: 2 ,marginLeft:70 }}>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Box sx={{ width: 30, height: 15, bgcolor: "rgba(0, 179, 105, 1)" }} />
          <Typography variant="caption" fontWeight="400" fontSize={15}>Successful Calls</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Box sx={{ width: 30, height: 15, bgcolor: "rgba(255, 90, 95, 1)" }} />
          <Typography variant="caption" fontWeight="400" fontSize={15}>Failed Calls</Typography>
        </Box>
      </Stack>

      <ArrowDonut 
        data={data} 
        innerRadius={80} 
        outerRadius={125} 
      />
      
    </Box>
  );
};

export default CallPerformanceChart;