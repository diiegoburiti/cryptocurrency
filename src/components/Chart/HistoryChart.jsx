import React, { useRef, useEffect } from "react";
import Chartjs from "chart.js";
import { historyOptions } from "./chartConfig";

const HisotryChart = ({ data }) => {
  const chartRef = useRef();
  const { day, week, year, detail } = data;
  const [timeFormat, setTimeFormat] = React.useState("24h");

  const determineTimeFormat = () => {
    switch (timeFormat) {
      case "24h":
        return day;
      case "7d":
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
              backgroundColor: "rgba(174, 305, 194, 0.6)",
              borderColor: "rgba(174, 305, 194, 0.4)",
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
          <p className="my-0">
            <strong> ${detail.current_price.toFixed(2)} </strong>
          </p>
          <p
            className={
              detail.price_change_24h < 0
                ? "text-danger my-0"
                : "text-success my-0"
            }
          >
            {detail.price_change_percentage_24h.toFixed(2)}%
          </p>
        </>
      );
    }
  }

  return (
    <div className="bg-white border mt-2 rounded p-3 max">
      <div>{renderPrices()}</div>
      <div>
        <canvas ref={chartRef} id="myChart" width={250} height={250}></canvas>
        <div className="chart-button mt-1">
          <button
            onClick={() => setTimeFormat("24")}
            className="btn btn-outline-secondary btn-sm"
          >
            24h
          </button>
          <button
            onClick={() => setTimeFormat("week")}
            className="btn btn-outline-secondary btn-sm"
          >
            7d
          </button>

          <button
            onClick={() => setTimeFormat("1y")}
            className="btn btn-outline-secondary btn-sm"
          >
            1y
          </button>
        </div>
      </div>
    </div>
  );
};

export default HisotryChart;
