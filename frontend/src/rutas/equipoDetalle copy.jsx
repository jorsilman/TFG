import React, { useState } from 'react';

import { useParams } from "react-router-dom";
import axios from 'axios';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/GridContainer.css';
import Menu from '../components/menu';
import Footer from '../components/footer';
import CoeficienteAtaqueEquipo from '../graficas/coeficientes';
import RadarChart from '../graficas/radarTeam';
import { PosicionesGoles, PosicionesAsistencias, PosicionesFaltas, PosicionesTirosLibres, GolesPorMinuto, FaltasPorMinuto, SankeyTeam, TopGoleadores, TopAsistencias, DivergingChart} from '../rutas/equipo';

function EquipoDetalleP() {
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
    formData.append('tipo', 'teams');
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
          <option value="grafica2">Coeficiente de ataque</option>
          <option value="grafica3">Gráfico Radar</option>
          <option value="grafica4">Posiciones Asistencias</option>
          <option value="grafica5">Posiciones Faltas</option>
          <option value="grafica6">Posiciones Tiros Libres</option>
          <option value="grafica7">Top Goleadores</option>
          <option value="grafica8">Goles por minuto</option>
          <option value="grafica9">Faltas por minuto</option>
          <option value="grafica10">Sankey</option>
          <option value="grafica11">Top Asistencias</option>
          <option value="grafica12">Ataque-Defensa</option>
        </select>
      </div>
      {graficaSeleccionada === "grafica1" && <PosicionesGoles />}
      {graficaSeleccionada === "grafica2" && <CoeficienteAtaqueEquipo />}
      {graficaSeleccionada === "grafica3" && <RadarChart />}
      {graficaSeleccionada === "grafica4" && <PosicionesAsistencias />}
      {graficaSeleccionada === "grafica5" && <PosicionesFaltas />}
      {graficaSeleccionada === "grafica6" && <PosicionesTirosLibres />}
      {graficaSeleccionada === "grafica7" && <TopGoleadores />}
      {graficaSeleccionada === "grafica8" && <GolesPorMinuto />}
      {graficaSeleccionada === "grafica9" && <FaltasPorMinuto />}
      {graficaSeleccionada === "grafica10" && <SankeyTeam />}
      {graficaSeleccionada === "grafica11" && <TopAsistencias />}
      {graficaSeleccionada === "grafica12" && <DivergingChart />}
    </div>
  );
}

export default EquipoDetalleP;

