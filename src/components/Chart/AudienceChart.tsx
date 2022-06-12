import "chart.js/auto";
import { Chart } from "./Chart.styled";
import { fullDateFormatter, shortDateFormatter } from "./Chart.utils";
import type { AudienceResponse } from "../../libs/cdn/cdn-provider";

type AudienceChartProps = {
  data?: AudienceResponse;
};

export const AudienceChart = ({ data }: AudienceChartProps) => {
  if (!data) {
    return (
      <Chart
        type="line"
        title="Concurent viewers"
        data={{ labels: [], datasets: [] }}
      />
    );
  }

  const { audience } = data;

  return (
    <Chart
      type="line"
      title="Concurent viewers"
      data={{
        labels: audience.map(([time]) => time),
        datasets: [
          {
            label: "Audience",
            data: audience.map(([, value]) => value),
            fill: true,
            borderColor: "green",
            backgroundColor: "green",
            tension: 0.8,
          },
        ],
      }}
      options={{
        elements: {
          point: {
            radius: 1,
          },
        },
        scales: {
          x: {
            ticks: {
              callback: (_, index) => shortDateFormatter(audience[index][0]),
            },
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: (args) =>
                fullDateFormatter(new Date(parseInt(args[0].label, 10))),
            },
          },
        },
      }}
    />
  );
};
