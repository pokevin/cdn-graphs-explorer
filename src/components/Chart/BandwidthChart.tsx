import "chart.js/auto";
import { useMemo } from "react";
import { Chart } from "./Chart.styled";
import {
  fullDateFormatter,
  shortDateFormatter,
  toGigaByte,
} from "./Chart.utils";
import type { BandwidthResponse } from "../../libs/cdn/cdn-provider";

type BandwithChartProps = {
  data?: BandwidthResponse;
};

export const BandwithChart = ({ data }: BandwithChartProps) => {
  const maxValues = useMemo(
    () => ({
      p2p: data ? Math.max(...data.p2p.map(([, val]) => val)) : 0,
      cdn: data ? Math.max(...data.cdn.map(([, val]) => val)) : 0,
    }),
    [data?.cdn[0][0], data?.p2p[0][0]]
  );

  if (!data) {
    return <Chart type="line" data={{ labels: [], datasets: [] }} />;
  }

  const { p2p, cdn } = data;

  return (
    <Chart
      type="line"
      title=""
      data={{
        labels: p2p.map(([time]) => time),
        datasets: [
          {
            label: "P2P",
            data: p2p.map(([, value]) => toGigaByte(value)),
            fill: true,
            borderColor: "orange",
            backgroundColor: "orange",
            tension: 0.8,
          },
          {
            label: "HTTP",
            data: cdn.map(([, value]) => toGigaByte(value)),
            fill: true,
            borderColor: "rgb(179, 116, 0)",
            backgroundColor: "rgb(179, 116, 0)",
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
              callback: (_, index) => shortDateFormatter(p2p[index][0]),
            },
          },
          y: {
            ticks: {
              callback: (val) => `${val} Gbps`,
            },
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        plugins: {
          title: {
            display: true,
            text: "Capacity offload",
          },
          tooltip: {
            callbacks: {
              title: (args) =>
                fullDateFormatter(new Date(parseInt(args[0].label, 10))),
              afterBody: () => [
                `Max P2P: ${toGigaByte(maxValues.p2p).toFixed(3)} Gbps`,
                `Max HTTP: ${toGigaByte(maxValues.cdn).toFixed(3)} Gbps`,
              ],
              afterFooter: (args) =>
                `Total: ${args
                  .reduce((acc, { raw }) => acc + (raw as number), 0)
                  .toFixed(3)} Gbps`,
            },
          },
        },
      }}
    />
  );
};
