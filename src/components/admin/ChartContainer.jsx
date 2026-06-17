import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

// 1. Revenue Area Chart (SVG based)
export function RevenueChart() {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const { reportsData } = useApp();
  const data = reportsData?.revenueOverview || [];
  
  // Chart dimensions
  const width = 500;
  const height = 200;
  const padding = 30;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Max value to scale coordinates
  const maxVal = Math.max(...data.map(d => d.amount)) * 1.1; // 10% headroom

  // Calculate coordinates
  const points = data.map((d, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth;
    const y = padding + chartHeight - (d.amount / maxVal) * chartHeight;
    return { x, y, ...d };
  });

  // SVG Path strings
  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = `
    ${pathD} 
    L ${points[points.length - 1].x} ${height - padding} 
    L ${points[0].x} ${height - padding} Z
  `;

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82c4" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b82c4" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3b82c4" />
            <stop offset="100%" stopColor="#527e68" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const yVal = padding + chartHeight * ratio;
          return (
            <line
              key={i}
              x1={padding}
              y1={yVal}
              x2={width - padding}
              y2={yVal}
              className="stroke-stone-150 dark:stroke-sage-900/60"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Area Path */}
        <path d={areaD} fill="url(#areaGrad)" />

        {/* Line Path */}
        <path
          d={pathD}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points & Hover Interactivity */}
        {points.map((p, i) => (
          <g key={i} className="cursor-pointer">
            <circle
              cx={p.x}
              cy={p.y}
              r={hoveredPoint && hoveredPoint.month === p.month ? 7 : 4}
              className="fill-white dark:fill-sage-950 stroke-softblue-500 transition-all duration-200"
              strokeWidth="2.5"
              onMouseEnter={() => setHoveredPoint(p)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
          </g>
        ))}

        {/* X Axis Labels */}
        {points.map((p, i) => (
          <text
            key={i}
            x={p.x}
            y={height - padding + 18}
            textAnchor="middle"
            className="fill-stone-400 dark:fill-sage-500 font-sans text-[10px] font-semibold"
          >
            {p.month}
          </text>
        ))}
      </svg>

      {/* Floating Tooltip HTML Overlay */}
      {hoveredPoint && (
        <div
          className="absolute bg-stone-900 text-white dark:bg-white dark:text-stone-900 text-xs px-3 py-1.5 rounded-lg shadow-lg border border-white/10 dark:border-stone-200 pointer-events-none transition-all duration-150"
          style={{
            left: `${(hoveredPoint.x / width) * 100}%`,
            top: `${(hoveredPoint.y / height) * 100 - 22}%`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <span className="font-semibold">{hoveredPoint.month}:</span> ₹{hoveredPoint.amount}
        </div>
      )}
    </div>
  );
}

// 2. Appointments per Service Bar Chart (SVG based)
export function ServicesChart() {
  const [hoveredBar, setHoveredBar] = useState(null);
  const { reportsData } = useApp();
  const data = reportsData?.appointmentsOverview || [];

  // Chart dimensions
  const width = 500;
  const height = 200;
  const padding = 30;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const maxVal = Math.max(...data.map(d => d.count)) * 1.1;
  const barWidth = (chartWidth / data.length) * 0.6;
  const gap = (chartWidth / data.length) * 0.4;

  const resolvedBars = data.map((d, index) => {
    const x = padding + index * (barWidth + gap) + gap / 2;
    const barHeight = (d.count / maxVal) * chartHeight;
    const y = padding + chartHeight - barHeight;
    return { x, y, barHeight, ...d };
  });

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        {/* Grids */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const yVal = padding + chartHeight * ratio;
          return (
            <line
              key={i}
              x1={padding}
              y1={yVal}
              x2={width - padding}
              y2={yVal}
              className="stroke-stone-150 dark:stroke-sage-900/60"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Rounded Bars */}
        {resolvedBars.map((bar, i) => {
          const isHovered = hoveredBar && hoveredBar.service === bar.service;
          return (
            <g key={i} className="cursor-pointer">
              <rect
                x={bar.x}
                y={bar.y}
                width={barWidth}
                height={bar.barHeight}
                rx="5"
                ry="5"
                className={`fill-sage-500/70 hover:fill-sage-600 dark:fill-sage-400/60 dark:hover:fill-sage-500 transition-all duration-200 ${
                  isHovered ? 'opacity-100 shadow-md' : 'opacity-85'
                }`}
                onMouseEnter={() => setHoveredBar(bar)}
                onMouseLeave={() => setHoveredBar(null)}
              />
            </g>
          );
        })}

        {/* X Axis Labels (Truncated acronyms/first word for layout) */}
        {resolvedBars.map((bar, i) => (
          <text
            key={i}
            x={bar.x + barWidth / 2}
            y={height - padding + 18}
            textAnchor="middle"
            className="fill-stone-400 dark:fill-sage-500 font-sans text-[9px] font-semibold"
          >
            {bar.service.split(' ')[0]}
          </text>
        ))}
      </svg>

      {/* Floating Tooltip */}
      {hoveredBar && (
        <div
          className="absolute bg-stone-900 text-white dark:bg-white dark:text-stone-900 text-xs px-3 py-1.5 rounded-lg shadow-lg border border-white/10 dark:border-stone-200 pointer-events-none transition-all duration-150"
          style={{
            left: `${((hoveredBar.x + barWidth / 2) / width) * 100}%`,
            top: `${(hoveredBar.y / height) * 100 - 15}%`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="font-semibold text-center">{hoveredBar.service}</div>
          <div className="text-center text-[10px] text-stone-300 dark:text-stone-600 mt-0.5">
            {hoveredBar.count} Sessions
          </div>
        </div>
      )}
    </div>
  );
}
