import React from 'react';
import styles from "./index.module.css";

const CircularMeter = ({ value = 18.67, max = 100, label = "%", heading = "Meter" }) => {
    const startAngle = 155;
    const endAngle = 385;
    const sweepAngle = endAngle - startAngle;

    const clampedValue = Math.min(Math.max(value, 0), max);
    const angle = (clampedValue / max) * sweepAngle + startAngle;

    return (
        <div className={styles.meter_container}>
            <div className={styles.meter_heading}>{heading}</div>

            <svg viewBox="0 0 200 200" className={styles.meter_svg}>
                <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#B700F4" />
                        <stop offset="100%" stopColor="#B700F4" />
                    </linearGradient>

                    <linearGradient
                        id="needleGradient"
                        gradientUnits="userSpaceOnUse"
                        x1="100"
                        y1="120"
                        x2={100 + 40 * Math.cos((angle * Math.PI) / 180)}
                        y2={120 + 40 * Math.sin((angle * Math.PI) / 180)}
                    >
                        <stop offset="0%" stopColor="#BD74F5" stopOpacity="0" />
                        <stop offset="100%" stopColor="#BD74F5" stopOpacity="1" />
                    </linearGradient>
                </defs>

                {/* Background Arc */}
                <path
                    d={describeArc(100, 100, 60, startAngle, endAngle)}
                    stroke="var(--text-color)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                />

                {/* Active Arc */}
                <path
                    d={describeArc(100, 100, 60, startAngle, angle)}
                    stroke="url(#gaugeGradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                />

                {/* Ticks (every 13.5° = 20 ticks total for 270°) */}
                {[...Array(15)].map((_, i) => {
                    const tickAngle = startAngle + (i * (sweepAngle / 14));
                    const a = (tickAngle * Math.PI) / 180;
                    const r1 = 45;
                    const r2 = 50;
                    const x1 = 100 + r1 * Math.cos(a);
                    const y1 = 100 + r1 * Math.sin(a);
                    const x2 = 100 + r2 * Math.cos(a);
                    const y2 = 100 + r2 * Math.sin(a);
                    return (
                        <line
                            key={i}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="var(--text-color)"
                            strokeWidth="2"
                        />
                    );
                })}

                {/* Needle */}
                {/* <line
                    x1="100"
                    y1="120"
                    x2={100 + 40 * Math.cos((angle * Math.PI) / 180)}
                    y2={100 + 40 * Math.sin((angle * Math.PI) / 180)}
                    stroke="#B700F4"
                    strokeWidth="3"
                /> */}
                {renderNeedle(100, 120, angle)}

                {/* Center hub */}
                <circle cx="100" cy="120" r="8" fill="var(--bg-color)" stroke="#B700F4" strokeWidth="4" />
            </svg>

            {/* Value */}
            <div className={styles.meter_value}>{value.toFixed(2)}{label}</div>
        </div>
    );
};

export default CircularMeter;

// Helper: Arc description
function describeArc(x, y, radius, startAngle, endAngle) {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
        'M', start.x, start.y,
        'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    ].join(' ');
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = ((angleInDegrees) * Math.PI) / 180.0;
    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
    };
}

function renderNeedle(centerX, centerY, angle, length = 35, baseWidth = 13) {
    const angleRad = angle * Math.PI / 180;

    const tipX = centerX + length * Math.cos((angle * Math.PI) / 180);
    // centerX + length * Math.cos(angleRad);
    const tipY = centerX + length * Math.sin((angle * Math.PI) / 180);
    // centerY + length * Math.sin(angleRad);

    const perpAngle = angleRad + Math.PI / 2;
    const baseLeftX = centerX + (baseWidth / 2) * Math.cos(perpAngle);
    const baseLeftY = centerY + (baseWidth / 2) * Math.sin(perpAngle);
    const baseRightX = centerX - (baseWidth / 2) * Math.cos(perpAngle);
    const baseRightY = centerY - (baseWidth / 2) * Math.sin(perpAngle);

    return (
        <polygon
            points={`${baseLeftX},${baseLeftY} ${baseRightX},${baseRightY} ${tipX},${tipY}`}
            fill="url(#needleGradient)"
        />
    );
}





