import React, { useState } from 'react';
import { PosicionesGoles, DivergingChart, FaltasPorMinuto, GolesPorMinuto, PosicionesAsistencias, PosicionesFaltas, PosicionesTirosLibres, TopAsistencias, TopGoleadores } from '../rutas/match';

function SelectGraph() {
  const [selectedGraph, setSelectedGraph] = useState(null);

  function handleChange(event) {
    setSelectedGraph(event.target.value);
  }

  return (
    <div>
      <div className="nav-container">
        <select onChange={handleChange}>
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
      {selectedGraph === "grafica1" && <PosicionesGoles />}
      {selectedGraph === "grafica2" && <DivergingChart />}
      {selectedGraph === "grafica3" && <FaltasPorMinuto />}
      {selectedGraph === "grafica4" && <GolesPorMinuto />}
      {selectedGraph === "grafica5" && <PosicionesAsistencias />}
      {selectedGraph === "grafica6" && <PosicionesFaltas />}
      {selectedGraph === "grafica7" && <PosicionesTirosLibres />}
      {selectedGraph === "grafica8" && <TopAsistencias />}
      {selectedGraph === "grafica9" && <TopGoleadores />}
      
 
      
    </div>
  );
}


export default SelectGraph;
