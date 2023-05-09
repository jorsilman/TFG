import React, { useState, useEffect } from 'react';
import { create } from 'heatmap.js';
import axios from 'axios';


function MapaDeCalor() {
  const [events, setEvents] = useState([]);
  const [containerSize, setContainerSize] = useState({ width: 100, height: 100 });

  useEffect(() => {
    axios.get('http://localhost:8000/api/events/teams/684/')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = 'frontend\\src\\fut.jpg';
    img.onload = () => {
      setContainerSize({ width: img.width, height: img.height });
    };
  }, []);

  useEffect(() => {
    const heatmapInstance = create({
      container: document.getElementById('heatmapContainer'),
      radius: 20,
      maxOpacity: .5,
      minOpacity: 0,
      blur: 1,
      gradient: {
          '.2': 'blue',
          '.4': 'green',
          '.6': 'yellow',
          '.8': 'red'
      }
         
    });

    const data = events.map(event => {
      return {
        x: event.x1,
        y: event.y1,
        value: 1
      }
    });

    heatmapInstance.setData({
      max: 1,
      data
    });
  }, [events, containerSize]);

  return (
    <div id="heatmapContainer" style={{ width: `${containerSize.width}px`, height: `${containerSize.height}px`, backgroundImage: "frontend\\src\\fut.jpg" }}></div>
    );
  }
  

export default MapaDeCalor;
/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import base64 from 'base64-js';


function HeatMapComponent() {
    const [events, setEvents] = useState([]);

    const table = document.getElementById('myCanvas');

    // Convertir los eventos en una matriz bidimensional para el mapa de calor
    const matrix = [];
    for (let i = 0; i < 100; i++) {
        matrix[i] = [];
        for (let j = 0; j < 100; j++) {
        matrix[i][j] = 0;
        }
    }
    events.forEach(event => {
        matrix[event.x1][event.y1]++;
    });

    // Crear los datos para el gráfico de barras apiladas
    const data = {
        labels: [...Array(100).keys()], // Etiquetas del eje x (0 a 99)
        datasets: matrix.map((row, i) => ({
        label: i.toString(), // Etiqueta del eje y (0 a 99)
        data: row, // Datos de la fila
        backgroundColor: row.map(value => `rgba(255, 0, 0, ${value / 10})`), // Color de fondo según el valor (rojo con opacidad variable)
        borderColor: 'transparent', // Color del borde transparente
        borderWidth: 1 // Ancho del borde
        }))
    };

    // Crear las opciones para el gráfico de barras apiladas
    const options = {
        indexAxis: 'y', // Usar el eje y como índice
        scales: {
        x: {
            stacked: true, // Apilar las barras horizontalmente
            display: false // Ocultar el eje x
        },
        y: {
            stacked: true, // Apilar las barras verticalmente
            display: false // Ocultar el eje y
        }
        },
        plugins: {
        legend: {
            display: false // Ocultar la leyenda
        },
        tooltip: {
            callbacks: {
            title: (context) => `x: ${context[0].dataset.label}`, // Mostrar la coordenada x en el título del tooltip
            label: (context) => `y: ${context.label}, value: ${context.parsed}`, // Mostrar la coordenada y y el valor en la etiqueta del tooltip
            afterLabel: () => '' // No mostrar nada después de la etiqueta del tooltip
            }
        }
        },
        layout: {
        padding: 0 // Sin relleno
        },
        maintainAspectRatio: false // Mantener la relación de aspecto del mapa de calor
    };

    const config = {
        type: 'bar',
        data: data,
        options: options
      };

    useEffect(() => {
      axios.get('http://localhost:8000/api/teams/692/events/')
        .then(response => {
          setEvents(response.data);
        })
        .catch(error => {
          console.log(error);
        });
      // Crear el gráfico
      var myChart = new Chart(table, config);
      // Cuando el componente se desmonta
      return () => {
        // Destruir el gráfico
        myChart.destroy();
      }
    }, []);

  

  return (
    <div>
      <Bar
        width={500} // Ancho del mapa de calor
        height={300} // Alto del mapa de calor
        data={data} // Datos del mapa de calor
        options={options} // Opciones del mapa de calor
      />
    </div>
  );
}

function MapaDeCalor({ events }) {
  const data = events.map((event) => {
    return {
      x: event.x1,
      y: event.y1,
      value: 1,
    };
  });

  const heatmapData = {
    min: 0,
    max: 1,
    data,
  };

  const backgroundImageUrl = 'https://i.pinimg.com/originals/ea/fd/96/eafd96a68f4a7ec7a0509df9f0f523e0.png';

  return (
    <Heatmap
      xLabels={new Array(101).fill(0).map((_, i) => i)}
      yLabels={new Array(101).fill(0).map((_, i) => i)}
      xLabelWidth={20}
      yLabelWidth={20}
      data={heatmapData}
      background={backgroundImageUrl}
      height={500}
      onClick={(x, y) => console.log(`Clicked on (${x}, ${y})`)}
    />
  );
}*/