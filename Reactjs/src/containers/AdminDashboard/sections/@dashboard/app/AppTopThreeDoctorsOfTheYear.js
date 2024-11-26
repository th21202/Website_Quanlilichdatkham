import React from 'react';
import { Card, CardHeader, Box } from "@mui/material";
import { FormattedMessage } from 'react-intl';
import ReactApexChart from "react-apexcharts";

export default function AppTopThreeDoctorsOfTheYear() {
  const currentYear = new Date().getFullYear();

  const chartOptions = {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: "12%", borderRadius: 4 } },
    fill: { type: ["solid", "gradient", "solid"] },
    labels: [
      "01/01/2023", "02/01/2023", "03/01/2023", "04/01/2023",
      "05/01/2023", "06/01/2023", "07/01/2023", "08/01/2023",
      "09/01/2023", "10/01/2023", "11/01/2023", "12/01/2023"
    ],
    xaxis: { type: "datetime" },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== "undefined") {
            return `${y.toFixed(0)} dolar`;
          }
          return y;
        },
      },
    },
  };

  const chartData = [
    {
      name: "Bác sĩ A",
      type: "column",
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
    },
    {
      name: "Bác sĩ B",
      type: "area",
      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 31],
    },
    {
      name: "Bác sĩ C",
      type: "line",
      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
    },
  ];

  return (
    <Card>
      <CardHeader
        title={<FormattedMessage id={"admin-dashboard.dashboard.top-3-doctors-with-the-highest-revenue-of-the-year"} />}
        subheader={currentYear}
      />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={chartData}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}
