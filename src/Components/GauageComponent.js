import React from "react";

const CircularGauge = ({ value, limit }) => {
    const strokeWidth = 1;
    const radius = 60; // Adjusted radius for better visibility
    const centerX = 70; // Center of the SVG in the X-axis
    const centerY = 70; // Center of the SVG in the Y-axis
    const circumference = 2 * Math.PI * radius;
    const progress = (value / limit) * 100;
  
    // Determine the color based on the comparison of value and limit
    const color = value < limit ? "#2ECC71" : "#FF4433";
  
    return (
      <svg width="200" height="200" viewBox="0 0 150 150">
        {/* Background Circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="#d9d9d9"
          strokeWidth={strokeWidth}
        />
  
        {/* Progress Circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
        //   strokeDashoffset={circumference - (progress / 100) * circumference}
        />
  
        {/* Text */}
        <text x={centerX} y={centerY} textAnchor="middle" dy="0.3em" fontSize="15" fill={color}>
          {`${value} / ${limit}`}
        </text>
      </svg>
    );
  };
    
    
const GaugeComponent = ({

currentValue, 

limitValue



}) => {

  return (
    <div>
      <CircularGauge value={currentValue} limit={limitValue} />
    </div>
  );
};

export default GaugeComponent;