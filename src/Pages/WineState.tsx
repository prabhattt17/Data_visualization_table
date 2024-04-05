import React, { useState, useEffect } from "react";
import wineData from "../Data/wineData.json";
import FlavanoidsTable from "../Components/FlavanoidsStats";
import GammaTable from "../Components/GammaTable";
import "./WinseState.css";

const WineStatsComponent: React.FC = () => {
  const [flavanoidsStats, setFlavanoidsStats] = useState<{
    [key: string]: { mean: number; median: number; mode: string };
  }>({});
  const [gammaStats, setGammaStats] = useState<{
    [key: string]: { mean: number; median: number; mode: string };
  }>({});

  useEffect(() => {
    const parseNumericValue = (value: string | number): number => {
      if (typeof value === "string") {
        const numericValue = parseFloat(value.replace(/[^\d.-]/g, ""));
        return isNaN(numericValue) ? 0 : numericValue;
      }
      return value;
    };

    const uniqueClasses = Array.from(
      new Set(wineData.map((wine) => wine.Alcohol))
    );

    const calculateFlavanoidsStats = () => {
      const flavanoidsByClass: { [key: number]: number[] } = {};

      uniqueClasses.forEach((cls) => {
        const classNumber =
          typeof cls === "string" ? parseFloat(cls) : (cls as number);
        flavanoidsByClass[classNumber] = wineData
          .filter((wine) => wine.Alcohol === classNumber)
          .map((wine) => parseNumericValue(wine.Flavanoids));
      });

      const stats: {
        [key: string]: { mean: number; median: number; mode: string };
      } = {};
      uniqueClasses.forEach((cls) => {
        const flavanoids = flavanoidsByClass[cls];
        stats[cls] = {
          mean: calculateMean(flavanoids),
          median: calculateMedian(flavanoids),
          mode: calculateMode(flavanoids),
        };
      });

      setFlavanoidsStats(stats);
    };

    const calculateGammaStats = () => {
      const gammaByClass: { [key: number]: number[] } = {};

      uniqueClasses.forEach((cls) => {
        const classNumber =
          typeof cls === "string" ? parseFloat(cls) : (cls as number);
        gammaByClass[classNumber] = wineData
          .filter((wine) => wine.Alcohol === classNumber)
          .map((wine) => calculateGamma(wine));
      });

      const stats: {
        [key: string]: { mean: number; median: number; mode: string };
      } = {};
      uniqueClasses.forEach((cls) => {
        const gamma = gammaByClass[cls];
        stats[cls] = {
          mean: calculateMean(gamma),
          median: calculateMedian(gamma),
          mode: calculateMode(gamma),
        };
      });

      setGammaStats(stats);
    };

    calculateFlavanoidsStats();
    calculateGammaStats();
  }, []);

  const calculateMean = (arr: number[]): number => {
    if (arr.length === 0) return 0;
    const sum = arr.reduce((acc, val) => acc + val, 0);
    return +(sum / arr.length);
  };

  const calculateMedian = (arr: number[]): number => {
    if (arr.length === 0) return 0;
    const sortedArr = [...arr].sort((a, b) => a - b);
    const middle = Math.floor(sortedArr.length / 2);
    if (sortedArr.length % 2 === 0) {
      return (sortedArr[middle - 1] + sortedArr[middle]) / 2;
    } else {
      return +sortedArr[middle];
    }
  };

  const calculateMode = (arr: number[]): string => {
    if (arr.length === 0) return "";
    const counts: { [key: number]: number } = {};
    arr.forEach((value) => {
      counts[value] = (counts[value] || 0) + 1;
    });
    let maxCount = 0;
    let modes: number[] = [];
    for (const key in counts) {
      const count = counts[key];
      if (count > maxCount) {
        modes = [parseFloat(key)];
        maxCount = count;
      } else if (count === maxCount) {
        modes.push(parseFloat(key));
      }
    }
    return modes.map((mode) => mode).join(", ");
  };

  const calculateGamma = (wine: {
    Ash: number | string;
    Hue: number;
    Magnesium: number;
  }): number => {
    const parsedAsh =
      typeof wine.Ash === "string" ? parseFloat(wine.Ash) : wine.Ash;
    return +((parsedAsh * wine.Hue) / wine.Magnesium);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "50%",
        }}
      >
        <FlavanoidsTable stats={flavanoidsStats} />
        <GammaTable stats={gammaStats} />
      </div>
    </div>
  );
};

export default WineStatsComponent;
