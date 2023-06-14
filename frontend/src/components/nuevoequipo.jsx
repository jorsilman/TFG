import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CoeficienteAtaqueEquipo from '../graficas/coeficientes';
import RadarChart from '../graficas/radarTeam';
import { PosicionesGoles, PosicionesAsistencias, PosicionesFaltas, PosicionesTirosLibres, GolesPorMinuto, FaltasPorMinuto, SankeyTeam, TopGoleadores, TopAsistencias, DivergingChart} from '../rutas/equipo';



function GridContainer({ numColumns, graficaConfig, onGraficaConfigChange }) {
  const handleColumnChange = (num) => {
    setNumColumns(num);
  };

  const handleGraficaConfigChange = (columnIndex, graficaSeleccionada) => {
    onGraficaConfigChange(columnIndex, graficaSeleccionada);
  };

  return (
    <div className="grid-container">
      <nav>
        <button onClick={() => handleColumnChange(3)}>3</button>
        <button onClick={() => handleColumnChange(4)}>4</button>
        <button onClick={() => handleColumnChange(6)}>6</button>
      </nav>
      <div className={`grid-layout columns-${numColumns}`}>
        {/* Renderizar los divs según el número de columnas */}
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

export default GridContainer;


  
