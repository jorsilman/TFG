import React, { useState } from 'react';

import { useParams } from "react-router-dom";
import axios from 'axios';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../components/menu';
import Footer from '../components/footer';
import CoeficienteAtaqueEquipo from '../graficas/coeficientes';
import RadarChart from '../graficas/radarTeam';
import { PosicionesAsistenciasMatch, DivergingChartMatch, FaltasPorMinutoMatch, GolesPorMinutoMatch, PosicionesFaltasMatch, PosicionesGolesMatch, PosicionesTirosLibresMatch, TopAsistenciasMatch, TopGoleadoresMatch } from './match';

function PartidoDetalle() {
  const [graficaConfig, setGraficaConfig] = useState([]);
  const [nombre, setNombre] = useState('');

  const handleGraficaConfigChange = (columnIndex, graficaSeleccionada) => {
    const updatedConfig = [...graficaConfig];
    updatedConfig[columnIndex] = graficaSeleccionada;
    setGraficaConfig(updatedConfig);
  };


  const { id } = useParams();

  const handleGuardarConfiguracion =  () => {
    


    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('wyId', id);
    formData.append('tipo', 'matches');
    formData.append('num_columns', numColumns);

    formData.append('graficas_seleccionadas', JSON.stringify(graficaConfig));

    console.log(graficaConfig);
    try {
      const response = axios.post('http://localhost:8000/configuraciones/', formData);
      return response.data;
    } catch (error) {
      console.error('Error al guardar la configuración:', error);
    }
  };

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleColumnChange = (num) => {
    setNumColumns(num);
  };

  const [numColumns, setNumColumns] = useState(3);

  return (
    <div>
      <Menu />
      <div className="grid-container">
        <nav>
          <button onClick={() => handleColumnChange(3)}>3</button>
          <button onClick={() => handleColumnChange(4)}>4</button>
          <button onClick={() => handleColumnChange(6)}>6</button>
        </nav>
        <div className={`grid-layout columns-${numColumns}`}>
          {Array.from({ length: numColumns }).map((_, index) => (
            <div key={index} className="grid-item">
              <SeleccionGrafica
                graficaSeleccionada={graficaConfig[index]}
                onGraficaSeleccionada={(graficaSeleccionada) =>
                  handleGraficaConfigChange(index, graficaSeleccionada)
                }
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" value={nombre} onChange={handleNombreChange} />
        <button onClick={handleGuardarConfiguracion}>Guardar</button>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

function SeleccionGrafica({ graficaSeleccionada, onGraficaSeleccionada }) {
  const handleChange = (event) => {
    onGraficaSeleccionada(event.target.value);
  };

  return (
    <div>
      <div className="nav-container">
        <select value={graficaSeleccionada} onChange={handleChange}>
          <option value="">Selecciona una gráfica</option>
          <option value="grafica1">Posiciones Goles</option>
          <option value="grafica2">Diverging Chart</option>
          <option value="grafica3">Faltas por minuto</option>
          <option value="grafica4">Goles por minuto</option>
          <option value="grafica5">Posiciones Asistencias</option>
          <option value="grafica6">Posiciones Faltas</option>
          <option value="grafica7">Posiciones Tiros Libres</option>
          <option value="grafica8">Top Asistencias</option>
          <option value="grafica9">Top Goleadores</option>
        </select>
      </div>
      {graficaSeleccionada === "grafica1" && <PosicionesGolesMatch />}
      {graficaSeleccionada === "grafica2" && <DivergingChartMatch />}
      {graficaSeleccionada === "grafica3" && <FaltasPorMinutoMatch />}
      {graficaSeleccionada === "grafica4" && <GolesPorMinutoMatch />}
      {graficaSeleccionada === "grafica5" && <PosicionesAsistenciasMatch />}
      {graficaSeleccionada === "grafica6" && <PosicionesFaltasMatch />}
      {graficaSeleccionada === "grafica7" && <PosicionesTirosLibresMatch />}
      {graficaSeleccionada === "grafica8" && <TopAsistenciasMatch />}
      {graficaSeleccionada === "grafica9" && <TopGoleadoresMatch />}

    </div>
  );
}

export default PartidoDetalle;

