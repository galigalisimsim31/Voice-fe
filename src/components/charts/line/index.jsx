import React from 'react';
import {
    AreaChart, XAxis, YAxis, Tooltip,
    ResponsiveContainer, ReferenceLine, Area, Line
} from 'recharts';

// const data = [
//     { time: '4:00', ping: 4 },
//     { time: '6', ping: 2 },
//     { time: '8', ping: 3 },
//     { time: '10', ping: 1 },
//     { time: '13', ping: 3 },
//     { time: '14', ping: 0 },
//     { time: '16', ping: -5 },
//     { time: '19', ping: 5 },
// ];

const LineChartComponent = ({ history, height = 200 }) => {
    // Convert and sort
    const data = history
        .map(item => {
            const date = new Date(item.timestamp);
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return {
                time: `${hours}:${minutes}`,
                ping: item.ping,
            };
        })
        .sort((a, b) => {
            const [h1, m1] = a.time.split(":").map(Number);
            const [h2, m2] = b.time.split(":").map(Number);
            return h1 * 60 + m1 - (h2 * 60 + m2);
        });
    return (
        <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data} margin={{ top: 0, right: 0, left: -60, bottom: 0 }}>

                {/* Dashed axis lines at Y=0 and X=0 */}
                {/* <ReferenceLine y={0} stroke="#ccc" strokeDasharray="10 2" strokeWidth={1} />
                <ReferenceLine x={"0"} stroke="#ccc" strokeDasharray="10 2" strokeWidth={1} /> */}

                {/* Hide axis labels */}
                <XAxis
                    dataKey="time"
                    tick={false}
                    axisLine={false}
                    tickLine={false}
                />
                <YAxis
                    tick={false}
                    domain={['auto', 'auto']}
                    axisLine={false}
                    tickLine={false}
                />

                {/* Fill below the line */}
                <defs>
                    <linearGradient id="colorPing" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#B700F4" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#B700F4" stopOpacity={0} />
                    </linearGradient>
                </defs>

                <Area
                    type="monotone"
                    dataKey="ping"
                    stroke="none"
                    fill="url(#colorPing)"
                    isAnimationActive={true}
                    baseValue="dataMin"
                />

                {/* Actual visible line on top of area */}
                <Line
                    type="monotone"
                    dataKey="ping"
                    stroke="#B700F4"
                    strokeWidth={2}
                    strokeDasharray="10 2"
                    dot={{ r: 3, fill: '#B700F4' }}
                    activeDot={{ r: 4 }}
                    isAnimationActive={false}
                />

                <Tooltip
                    cursor={{
                        stroke: "#B700F4",
                        strokeDasharray: "4 2",
                        strokeWidth: 1,
                    }}
                    content={<CustomTooltip />}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default LineChartComponent;


const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: 'white',
                border: '1px solid #ccc',
                padding: '6px 10px',
                borderRadius: '4px',
                fontSize: '12px',
                color: '#333'
            }}>
                <div>Time: {label}</div>
                <div>Ping: {payload[0].value}</div>
            </div>
        );
    }

    return null;
};