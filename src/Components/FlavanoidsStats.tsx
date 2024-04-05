import React from "react";

interface FlavanoidsTableProps {
  stats: { [key: string]: { mean: number; median: number; mode: string } };
}

const FlavanoidsTable: React.FC<FlavanoidsTableProps> = ({ stats }) => {
  return (
    <div>
      <h1 style={{color:"grey",fontWeight:"600",textTransform:"uppercase"}}>Flavanoid Stats</h1>
      <table>
        <thead>
          <tr>
            <th>Measure</th>
            {Object.keys(stats).map((cls) => (
              <th key={cls}>Class {cls}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Flavanoids Mean</td>
            {Object.keys(stats).map((cls) => (
              <td key={cls}>{stats[cls].mean.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Flavanoids Median</td>
            {Object.keys(stats).map((cls) => (
              <td key={cls}>{stats[cls].median.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Flavanoids Mode</td>
            {Object.keys(stats).map((cls) => (
              <td key={cls}>{stats[cls].mode}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FlavanoidsTable;
