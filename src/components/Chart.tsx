import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import styled from "styled-components";

function MyChart() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (chartRef.current !== null) {
      const ctx = chartRef.current;
      ctx.style.backgroundColor = "white";
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["1", "2", "3", "4", "5", "6", "7"],
          datasets: [
            {
              data: [12, 30, 3, 5, 2, 3, 7],
              borderColor: ["#6627f5"],
              borderWidth: 2,
              pointBorderWidth: 0,
            },
          ],
        },
        options: {
          responsive: false,
          scales: {
            y: {
              beginAtZero: true,
              display: false,
            },
            x: {
              display: false,
            },
          },

          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }
  }, [chartRef.current]);
  return <ChartBody ref={chartRef}></ChartBody>;
}

const ChartBody = styled.canvas`
  width: 400px;
  height: 100px !important;
`;

export default MyChart;
