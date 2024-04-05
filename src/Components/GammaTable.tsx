import React from "react";

interface GammaTableProps {
  stats: { [key: string]: { mean: number; median: number; mode: string } };
}

const GammaTable: React.FC<GammaTableProps> = ({ stats }) => {
  return (
    <div>
      <h1
        style={{ color: "grey", fontWeight: "600", textTransform: "uppercase" }}
      >
        Gamma Stats
      </h1>
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
            <td>Gamma Mean</td>
            {Object.keys(stats).map((cls) => (
              <td key={cls}>{stats[cls].mean.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma Median</td>
            {Object.keys(stats).map((cls) => (
              <td key={cls}>{stats[cls].median.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma Mode</td>
            {Object.keys(stats).map((cls) => (
              <td key={cls}>{parseFloat(stats[cls].mode).toFixed(3)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GammaTable;
