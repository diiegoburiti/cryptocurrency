import React, { useRef, useEffect, useState } from "react";
import Chartjs from "chart.js";
import { historyOptions } from "./chartConfig";
import style from "./HistoryChart.module.css";
import Button from "../Helper/Button";

const HisotryChart = ({ data }) => {
  const chartRef = useRef();
  const { day, week, year, detail } = data;
  const [timeFormat, setTimeFormat] = useState("24h");

  const determineTimeFormat = () => {
    switch (timeFormat) {
      case "24h":
        return day;
      case "week":
        return week;
      case "1y":
        return year;

      default:
        return day;
    }
  };

  useEffect(() => {
    if (chartRef && chartRef.current && detail) {
      const chartInstance = new Chartjs(chartRef.current, {
        type: "line",
        data: {
          datasets: [
            {
              label: `${detail.name} price`,
              data: determineTimeFormat(),
              backgroundColor: "rgba(32, 31, 55, 1)",
              borderColor: "rgba(239, 98, 49, 1)",
              pointRadius: 0,
            },
          ],
        },
        options: { ...historyOptions },
      });
    }
  });

  function renderPrices() {
    if (detail) {
      return (
        <>
          <p className={style.price}>
            <span className={style.price}>Price:</span>
            <strong> ${detail.current_price.toFixed(2)} </strong>
          </p>
          <p
            className={
              detail.price_change_24h < 0 ? style.textRed : style.textGreen
            }
          >
            <span className={style.percentage}>24 Hour % Change: </span>
            {detail.price_change_percentage_24h.toFixed(2)}%
          </p>
        </>
      );
    }
  }

  return (
    <div className={style.historyChart}>
      <div>{renderPrices()}</div>
      <div>
        <canvas ref={chartRef} id="myChart" width={250} height={250}></canvas>
      </div>
      <div className="chart-button mt-1">
        <Button onClick={() => setTimeFormat("24")}>24 h</Button>
        <Button onClick={() => setTimeFormat("7d")}>7d</Button>
        <Button onClick={() => setTimeFormat("1y")}>1y</Button>
      </div>
    </div>
  );
};

export default HisotryChart;
