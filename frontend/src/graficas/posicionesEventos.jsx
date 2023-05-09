import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import axios from 'axios';
import backgroundImage from  '../media/fut.jpg';
import { useParams } from 'react-router-dom';

function PosicionesEventos({events}) {
  const chartRef = useRef();
  const image = new Image();
  image.src = 'https://i.pinimg.com/564x/6a/05/76/6a05763dddb861f4858d5ac63d4b058f.jpg'; 
  useEffect(() => {
    if (events.length > 0) {
      const chartData = {
        labels: ['Posiciones de disparos'],
        datasets: [
          {
            
            data: processData(events),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      };
      const plugin = {
        id: 'customCanvasBackgroundImage',
        beforeDraw: (chart) => {
          if (image.complete) {
            const ctx = chart.ctx;
            const { top, left, width, height } = chart.chartArea;
            const scaleX = width / image.width;
            const scaleY = height / image.height;
            const scale = Math.max(scaleX, scaleY);
            const newWidth = image.width * scale;
            const newHeight = image.height * scale;
            const x = left + (width - newWidth) / 2;
            const y = top + (height - newHeight) / 2;
            ctx.drawImage(image, x, y, newWidth, newHeight);
          } else {
            image.onload = () => chart.draw();
          }
        }
      };
      const myChart = new Chart(chartRef.current, {
        type: 'scatter',
        data: chartData,
        plugins: [plugin],
        options: {
          scales: {
            x: {
              display: false
            },
            y: {
              display: false
            }
          },
          plugins: {
            legend: {
              display: false,
            },
        }
        }

      });
      
      return () => {
        myChart.destroy();
      };
    }
  }, [events]);

  

  function processData(data) {
    const processedData = data.map(event => ({
      x: event.x1,
      y: event.y1,
    }));
    return processedData;
  }

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
}

export default PosicionesEventos;