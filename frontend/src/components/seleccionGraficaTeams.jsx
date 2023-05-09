import React, { useState } from 'react';
import CoeficienteAtaqueEquipo from '../graficas/coeficientes';
import RadarChart from '../graficas/radarTeam';
import { PosicionesGoles, PosicionesAsistencias, PosicionesFaltas, PosicionesTirosLibres, GolesPorMinuto, FaltasPorMinuto, SankeyTeam, TopGoleadores, TopAsistencias, DivergingChart} from '../rutas/equipo';

function SeleccionGrafica() {
  const [graficaSeleccionada, setGraficaSeleccionada] = useState(null);

  function handleChange(event) {
    setGraficaSeleccionada(event.target.value);
  }

  return (
    <div>
      <div className="nav-container">
        <select onChange={handleChange}>
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


export default SeleccionGrafica;
