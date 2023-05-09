import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

export function TopScorersChart({data}) {
  

  if (!data) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: data.map((player) => `${player.player}`),
    datasets: [
      {
        label: "Goles",
        data: data.map((player) => player.goles),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
}

export function TopAssistantsChart({data}) {
  

  if (!data) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: data.map((player) => `${player.player}`),
    datasets: [
      {
        label: "Asistencias",
        data: data.map((player) => player.asistencias),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
}


