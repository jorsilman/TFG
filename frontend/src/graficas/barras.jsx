import React, { useState, useEffect, useRef } from "react";
import { Chart } from 'chart.js';

export function BarrasGoles({events}) {
    const chartRef = useRef();

    useEffect(() => {
        if (events.length > 0) {
            const data = {
            labels: events.map((event) => event.min),
            datasets: [
                {
                label: 'Goles',
                data: events.map((event) => event.goles),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                },
            ],
            };

            const myChart = new Chart(chartRef.current, {
            type: 'bar',
            data: data,
            options: {
                scales: {
                yAxes: [
                    {
                    ticks: {
                        beginAtZero: true,
                        precision: 0,
                    },
                    },
                ],
                },
                plugins: {
                    legend: {
                      display: false,
                    },
                }
            },
            });
            return () => {
                myChart.destroy();
            };
        }
    }, [events]);
        
    return (
        <div>
          <canvas ref={chartRef} />
        </div>
    );
        
}

export function BarrasFaltas({events}) {
    const chartRef = useRef();

    useEffect(() => {
        if (events.length > 0) {
            const data = {
            labels: events.map((event) => event.min),
            datasets: [
                {
                label: 'Faltas',
                data: events.map((event) => event.faltas),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                },
            ],
            };

            const myChart = new Chart(chartRef.current, {
            type: 'bar',
            data: data,
            options: {
                scales: {
                yAxes: [
                    {
                    ticks: {
                        beginAtZero: true,
                        precision: 0,
                    },
                    },
                ],
                },
                plugins: {
                    legend: {
                      display: false,
                    },
                }
            },
            });
            return () => {
                myChart.destroy();
            };
        }
    }, [events]);
        
    return (
        <div>
          <canvas ref={chartRef} />
        </div>
    );
        
}

