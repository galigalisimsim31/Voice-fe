import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { ChartsReferenceLine } from '@mui/x-charts/ChartsReferenceLine';
import { Box } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const xAxisData = [
  '10am',
  '11am',
  '12am',
  '01am',
  '02:30am',
  '04am',
  '05am',
  '06am',
  '07am',
  '07:30am',
];

const seriesData = [
  {
    id: 'green-series',
    data: [54, 31, 58, null, null, null, null, null, null, null],
    color: '#009045',
    showArea: true,
    type: 'line', // ✅ important
    areaStyle: { fill: 'rgba(9, 255, 128, 1)' }, // ✅ translucent fill
    connectNulls: true,
    showMark: ({ index }) => [2].includes(index),
  },
  {
    id: 'red-series',
    data: [null, null, 58, 36, 50, 14, 35, null, null, null],
    color: '#FF4D4D',
    showArea: true,
    type: 'line', // ✅
    areaStyle: { fill: 'rgba(255, 77, 77, 0.2)' },
    connectNulls: true,
    showMark: ({ index }) => [2, 3, 4, 6].includes(index),
  },
  {
    id: 'yellow-series',
    data: [null, null, null, null, null, null, 35, 68, 55, 74],
    color: '#FFAB02',
    showArea: true,
    type: 'line', 
    areaStyle: { fill: 'rgba(255, 171, 2, 0.25)' },
    connectNulls: true,
    showMark: ({ index }) => [6, 7].includes(index),
  },
];


export default function LineChartComponent() {
  return (
    <Box sx={{ height: 300, fontFamily: 'Inter, sans-serif' }}>
      <LineChart
        xAxis={[
          {
            data: xAxisData,
            scaleType: 'point',
            disableLine: true,
            disableTicks: false,
            valueFormatter: (value) => (value.endsWith('m') ? value : ''),
            tickLabelStyle: {
              fill: '#666',
              fontWeight: 500,
              fontSize: '0.85rem',
            },
          },
        ]}
        yAxis={[
          {
            min: 0,
            max: 110,
            disableLine: true,
            disableTicks: true,
            tickLabelStyle: {
              fill: '#666',
              fontWeight: 500,
              fontSize: '0.85rem',
            },
          },
        ]}
        series={seriesData}
        height={300}
        grid={{ horizontal: false, vertical: false }}
        legend={{ hidden: true }}
        sx={{
          '& .MuiLineElement-root': { strokeWidth: 3 },
          '& .MuiMarkElement-root': {
            strokeWidth: 2,
            fill: '#fff',
            r: 5,
          },
          '& .MuiLineElement-series-green-series .MuiMarkElement-root': {
            stroke: '#009045',
          },
          '& .MuiLineElement-series-red-series .MuiMarkElement-root': {
            stroke: '#FF4D4D',
          },
          '& .MuiLineElement-series-yellow-series .MuiMarkElement-root': {
            stroke: '#FFAB02',
          },
          '& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel': {
            fontFamily: 'Inter, sans-serif',
            fill: '#888',
          },
          '& .MuiChartsAxis-left .MuiChartsAxis-tickLabel': {
            transform: 'translateX(-5px)',
          },
          '& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': {
            transform: 'translateY(5px)',
          },
        }}
        tooltip={{ trigger: 'item' }}
        slotProps={{
          tooltip: {
            paper: {
              sx: {
                backgroundColor: '#222',
                color: 'white',
                borderRadius: '8px',
                padding: '8px 12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              },
            },
            arrow: {
              sx: { color: '#222' },
            },
          },
        }}
      >
        <ChartsReferenceLine
          x="12am"
          lineStyle={{
            stroke: 'rgba(0, 144, 69, 0.4)',
            strokeDasharray: '4 4',
          }}
        />
        <ChartsReferenceLine
          x="02:30am"
          lineStyle={{
            stroke: 'rgba(136, 132, 216, 0.6)',
            strokeDasharray: '4 4',
          }}
        />
        <ChartsReferenceLine
          x="05am"
          lineStyle={{
            stroke: 'rgba(255, 171, 2, 0.12)',
          }}
        />
      </LineChart>
    </Box>
  );
}
