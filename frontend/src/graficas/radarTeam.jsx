import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useParams } from "react-router-dom";
import axios from 'axios';

function RadarChart() {
    const [data, setData] = useState({
      goles: 0,
      pases: 0,
      tiros: 0,
      faltas: 0,
      intercepciones: 0
    });
  
    const { id } = useParams();
    const chartRef = useRef();
    const chartInstance = useRef(); // Definir la variable chartInstance aquí
  
    useEffect(() => {
        axios.get(`http://localhost:8000/api/events/teams/${id}/radar/`)
          .then(response => setData(response.data))
          .catch(error => console.log(error));
      }, [id]);

    
    console.log(data);
  
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
      <div>
        <canvas id="radar-chart" ref={chartRef}></canvas>
      </div>
    );
  }
  
  export default RadarChart;
  