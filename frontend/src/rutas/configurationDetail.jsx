import React, { useState, useEffect } from 'react';

import { useParams } from "react-router-dom";
import axios from 'axios';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../components/menu';
import Footer from '../components/footer';
import CoeficienteAtaqueEquipo from '../graficas/coeficientes';
import RadarChart from '../graficas/radarTeam';
import { PosicionesGoles, PosicionesAsistencias, PosicionesFaltas, PosicionesTirosLibres, GolesPorMinuto, FaltasPorMinuto, SankeyTeam, TopGoleadores, TopAsistencias, DivergingChart} from './equipo';
import { PosicionesAsistenciasMatch, DivergingChartMatch, FaltasPorMinutoMatch, GolesPorMinutoMatch, PosicionesFaltasMatch, PosicionesGolesMatch, PosicionesTirosLibresMatch, TopAsistenciasMatch, TopGoleadoresMatch } from './match';
import { PosicionesAsistenciasPlayer, EventosPlayer, EventosPorPartidoPlayer, PosicionesFaltasPlayer, PosicionesGolesPlayer, PosicionesTirosLibresPlayer } from './player';

import RadarChartPlayer from '../graficas/radarPlayer';

function ConfigurationDetail() {
  const { id } = useParams();

  const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/configuraciones/' + id + '/')
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [id]);

  const nombre = data.nombre;
  

  const numColumns = data.num_columns;

  const tipo = data.tipo;

  const wyId = data.wyId;

  const graficasSeleccionadas = data.graficas_seleccionadas;


  if(data.nombre){
    const array = JSON.parse(graficasSeleccionadas);
    console.log(data);
    if(tipo === 'matches'){

      return (
        <div>
          <Menu />
          <p>Matches</p>
          <div className="grid-container">
            <div className={`grid-layout columns-${numColumns}`}>
              {Array.from({ length: numColumns }).map((_, index) => (
                <div key={index} className="grid-item">
                  <SeleccionGraficaMatches
                    graficaSeleccionada={array[index]}
                    wyId={wyId}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <Footer />
        </div>
      );
    }
    else if(tipo === 'players'){
      return (
        <div>
          <Menu />
          <p>Players</p>
          <div className="grid-container">
            <div className={`grid-layout columns-${numColumns}`}>
              {Array.from({ length: numColumns }).map((_, index) => (
                <div key={index} className="grid-item">
                  <SeleccionGraficaPlayers
                    graficaSeleccionada={array[index]}
                    wyId={wyId}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <Footer />
        </div>
      );
    }
    else if(tipo === 'teams'){
      return (
        <div>
          <Menu />
          <p>Teams</p>
          <div className="grid-container">
            <div className={`grid-layout columns-${numColumns}`}>
              {Array.from({ length: numColumns }).map((_, index) => (
                <div key={index} className="grid-item">
                  <SeleccionGraficaTeams
                    graficaSeleccionada={array[index]}
                    wyId={wyId}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <Footer />
        </div>
      );
    }


  }

  




function SeleccionGraficaMatches({ graficaSeleccionada, wyId }) {
  const [selectedGraph, setSelectedGraph] = useState(graficaSeleccionada);
  

  function handleChange(event) {
    setSelectedGraph(event.target.value);
  }

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
      {selectedGraph === "grafica1" && <PosicionesGolesMatch wyId={wyId} />}
      {selectedGraph === "grafica2" && <DivergingChartMatch wyId={wyId} />}
      {selectedGraph === "grafica3" && <FaltasPorMinutoMatch wyId={wyId} />}
      {selectedGraph === "grafica4" && <GolesPorMinutoMatch wyId={wyId} />}
      {selectedGraph === "grafica5" && <PosicionesAsistenciasMatch wyId={wyId} />}
      {selectedGraph === "grafica6" && <PosicionesFaltasMatch wyId={wyId} />}
      {selectedGraph === "grafica7" && <PosicionesTirosLibresMatch wyId={wyId} />}
      {selectedGraph === "grafica8" && <TopAsistenciasMatch wyId={wyId} />}
      {selectedGraph === "grafica9" && <TopGoleadoresMatch wyId={wyId} />}
    </div>
  );
}

function SeleccionGraficaTeams({ graficaSeleccionada, wyId }) {
  const [selectedGraph, setSelectedGraph] = useState(graficaSeleccionada);
  

  function handleChange(event) {
    setSelectedGraph(event.target.value);
  }

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
      {selectedGraph === "grafica1" && <PosicionesGoles wyId={wyId} />}
      {selectedGraph === "grafica2" && <CoeficienteAtaqueEquipo wyId={wyId} />}
      {selectedGraph === "grafica3" && <RadarChart wyId={wyId} />}
      {selectedGraph === "grafica4" && <PosicionesAsistencias wyId={wyId}/>}
      {selectedGraph === "grafica5" && <PosicionesFaltas wyId={wyId}/>}
      {selectedGraph === "grafica6" && <PosicionesTirosLibres wyId={wyId} />}
      {selectedGraph === "grafica7" && <TopGoleadores wyId={wyId}/>}
      {selectedGraph === "grafica8" && <GolesPorMinuto wyId={wyId}/>}
      {selectedGraph === "grafica9" && <FaltasPorMinuto wyId={wyId}/>}
      {selectedGraph === "grafica10" && <SankeyTeam wyId={wyId}/>}
      {selectedGraph === "grafica11" && <TopAsistencias wyId={wyId}/>}
      {selectedGraph === "grafica12" && <DivergingChart wyId={wyId}/>}
    </div>
  );
}

function SeleccionGraficaPlayers({ graficaSeleccionada, wyId }) {
  const [selectedGraph, setSelectedGraph] = useState(graficaSeleccionada);
  

  function handleChange(event) {
    setSelectedGraph(event.target.value);
  }

  return (
    <div>
      <div className="nav-container">
        <select value={graficaSeleccionada} onChange={handleChange}>
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
      {selectedGraph === "grafica1" && <PosicionesGolesPlayer wyId={wyId} />}
      {selectedGraph === "grafica2" && <PosicionesAsistenciasPlayer wyId={wyId} />}
      {selectedGraph === "grafica3" && <PosicionesFaltasPlayer wyId={wyId} />}
      {selectedGraph === "grafica4" && <PosicionesTirosLibresPlayer wyId={wyId} />}
      {selectedGraph === "grafica5" && <RadarChartPlayer wyId={wyId} />}
      {selectedGraph === "grafica6" && <EventosPlayer wyId={wyId} />}
      {selectedGraph === "grafica7" && <EventosPorPartidoPlayer wyId={wyId} />}
    </div>
  );
}
}

export default ConfigurationDetail;

