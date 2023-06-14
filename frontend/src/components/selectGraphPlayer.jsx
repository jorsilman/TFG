import React, { useState } from 'react';
import { PosicionesGoles, PosicionesAsistencias, PosicionesFaltas, PosicionesTirosLibres, Eventos, EventosPorPartido } from '../rutas/player';
import RadarChart from '../graficas/radarPlayer';

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
          <option value="grafica2">Posiciones Asistencias</option>
          <option value="grafica3">Posiciones Faltas</option>
          <option value="grafica4">Posiciones Tiros Libres</option>
          <option value="grafica5">Radar Chart</option>
          <option value="grafica6">Eventos</option>
          <option value="grafica7">Eventos por partido</option>

         

        


        </select>
      </div>
      {selectedGraph === "grafica1" && <PosicionesGoles />}
      {selectedGraph === "grafica2" && <PosicionesAsistencias />}
      {selectedGraph === "grafica3" && <PosicionesFaltas />}
      {selectedGraph === "grafica4" && <PosicionesTirosLibres />}
      {selectedGraph === "grafica5" && <RadarChart />}
      {selectedGraph === "grafica6" && <Eventos />}
      {selectedGraph === "grafica7" && <EventosPorPartido />}
     
      
 
      
    </div>
  );
}


export default SelectGraph;
