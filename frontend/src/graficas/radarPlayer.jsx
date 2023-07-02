import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function RadarChartPlayer({ data}) {
    const chartRef = useRef();
    const chartInstance = useRef(); 
  
    useEffect(() => {
      if (chartRef.current) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
  
        const chartData = {
          labels: ['Goles', 'Pases', 'Disparos', 'Faltas', 'Intercepciones', 'Asistencias'],
          datasets: [
            {
                data: [
                    data && data.goles,
                    data && data.pases,
                    data && data.tiros,
                    data && data.faltas,
                    data && data.intercepciones,
                    data && data.asistencias
                  ],
              borderColor: '#3f51b5',
              backgroundColor: 'rgba(63, 81, 181, 0.2)',
              fill: true
            }
          ]
        };
  
        const chartOptions = {
          layout: {
            padding: 0
          },
          scales: {
            r: {
              ticks: {
                display: false,
                backdropPadding: 0
              }
            }
          },
          plugins: {
            legend: {
              display: false,
              labels: {
                padding: 0
              }
            }
          },
          elements: {
            line: {
              borderWidth: 2,
              borderColor: '#3f51b5',
              backgroundColor: 'rgba(63, 81, 181, 0.2)',
              fill: true
            },
            point: {
              radius: 0
            }
          }
        };
  
        chartInstance.current = new Chart(chartRef.current, {
          type: 'radar',
          data: chartData,
          options: chartOptions
        });
      }
    }, [data]);
  
    return (
      <div class = "radar">
        <canvas id="radar-chart" ref={chartRef}></canvas>
      </div>
    );
  }
  
  export default RadarChartPlayer;
  