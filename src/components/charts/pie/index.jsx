import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const colorList = ["#6031FE", "#95A4FC", "#B1E3FF"];

function useWindowWidth() {
  const [w, setW] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1920
  );
  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return w;
}

const PieChartComponent = ({ data }) => {
  const width = useWindowWidth();
  const legendBottom = width <= 1365;

  const pieData = (data || []).map((item, index) => ({
    name: item?.type,
    value: item?.percent,
    color: colorList[index % colorList.length],
  }));

  // More height when legend is bottom so it has room
  const containerHeight = legendBottom ? 315 : 200;

  return (
    <div style={{ width: "100%", height: `${containerHeight}px` }}>
      <ResponsiveContainer>
        <PieChart
          margin={
            legendBottom
              ? { top: 12, right: 12, bottom: 30, left: 12 }
              : { top: 12, right: 0, bottom: 0, left: 0 }
          }
        >
          <Tooltip
            formatter={(value, name) => [`${value}%`, name]}
            cursor={{ fill: "rgba(0,0,0,0.04)" }}
          />

          <Legend
            layout={legendBottom ? "horizontal" : "vertical"}
            verticalAlign={legendBottom ? "bottom" : "middle"}
            align={legendBottom ? "left" : "right"}
            iconType="circle"
            wrapperStyle={
              legendBottom
                ? { paddingTop: 20 } // small gap above bottom legend
                : { right: -15, lineHeight: "28px" }
            }
            formatter={(value, entry) => `${value} — ${entry?.payload?.value ?? 0}%`}
          />

          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="52%"
            cy={legendBottom ? "45%" : "50%"} // nudge up a bit when legend at bottom
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            cornerRadius={6}
            stroke="none"
            labelLine={false}
            isAnimationActive
          >
            {pieData.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
