import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import styled, { css } from "styled-components";

interface ChartProps {
  locate: string;
  scores: number[];
}

function MyChart(props: ChartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    let myChart: Chart<"line", number[], string>;
    if (chartRef.current !== null) {
      const ctx = chartRef.current;
      ctx.style.backgroundColor = "white";
      myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["1", "2", "3", "4", "5", "6", "7"],
          datasets: [
            {
              data: props.scores,
              borderColor: ["#6627f5"],
              borderWidth: 3,
              pointBorderWidth: 2,
              pointStyle: "circle",
              pointBackgroundColor: ["#6627f5"],
              tension: 0.4,
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
    return () => {
      myChart.destroy();
    };
  }, [chartRef.current]);

  return <ChartBody ref={chartRef} {...props}></ChartBody>;
}

const ChartBody = styled.canvas`
  ${(props: ChartProps) => {
    switch (props.locate) {
      case "rankingPage": {
        return css`
          width: 30rem;
          height: 4rem !important;
        `;
      }
      case "myPage": {
        return css`
          width: 40rem;
          height: 10rem !important;
        `;
      }
      default: {
        return css`
          width: 40rem;
          height: 10rem;
        `;
      }
    }
  }}
`;

export default MyChart;
