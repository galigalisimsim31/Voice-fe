import React from 'react';
import { PieChart } from '@mui/x-charts'; 
import { Box, Typography } from '@mui/material';

const chartData = [
  { id: 0, value: 40, label: 'US East', color: '#F76C9B' }, 
  { id: 1, value: 30, label: 'US West', color: '#42A5F5' }, 
  { id: 2, value: 20, label: 'Europe', color: '#FFC107' },  
  { id: 3, value: 15, label: 'Asia', color: '#4DB6AC' },    
  { id: 4, value: 5, label: 'Other', color: '#9575CD' },    
];

export default function BotDistributionChart() {
  return (
    <Box sx={{ 
      p: 2, // ✅ REDUCED padding
      width: '100%', 
      height: '100%',
      boxSizing: 'border-box' // Ensures padding is included in size
    }}> 
      
      <Typography 
        variant="h6" 
        align="center" 
        gutterBottom 
        sx={{ fontWeight: 'bold', mb: 1, color:'grey', fontSize:15 }}
      >
        Bot Distribution by Region
      </Typography>

      <PieChart
        series={[
          {
            data: chartData,
            innerRadius: 40,   // ✅ REDUCED size
            outerRadius: 100,  // ✅ REDUCED size
            paddingAngle: 0,   // ✅ FIXED typo (removed 'c')
            cornerRadius: 1,  
          },
        ]}
        height={200} // ✅ REDUCED height to fit
        
        slotProps={{
          legend: {
            direction: 'row', 
            position: { vertical: 'bottom', horizontal: 'middle' }, 
            padding: 0,
            itemMarkWidth: 10, 
            itemMarkHeight: 10,
            markGap: 1,    
            itemGap: 20, 
          },
        }}
      >
      </PieChart>
    </Box>
  );
}