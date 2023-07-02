import React, {useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function RadarChart({data}) {

    const chartRef = useRef();
    const chartInstance = useRef(); // Definir la variable chartInstance aquí
  
    
  
    useEffect(() => {
      if (chartRef.current) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
  
        const chartData = {
          labels: ['Goles', 'Pases', 'Disparos', 'Faltas', 'Intercepciones'],
          datasets: [
            {
                data: [
                    data && data.goles,
                    data && data.pases,
                    data && data.tiros,
                    data && data.faltas,
                    data && data.intercepciones
                  ],
              borderColor: '#3f51b5',
              backgroundColor: 'rgba(63, 81, 181, 0.2)',
              fill: true
            }
          ]
        };
  
        const chartOptions = {
            scales: {
                r: {
                  ticks: {
                    display: false
                  }
                }
              },
          plugins: {
            legend: {
              display: false
            },
            
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
  
  export default RadarChart;
  