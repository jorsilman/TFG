import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../components/menu';
import Footer from '../components/footer';
import { PosicionesGoles, PosicionesAsistencias, PosicionesFaltas, PosicionesTirosLibres, GolesPorMinuto, FaltasPorMinuto, SankeyTeam, TopGoleadores, TopAsistencias, DivergingChart, Coeficiente, RadarChartTeam, ResultadosTeam} from './team';
import { PosicionesAsistenciasMatch, DivergingChartMatch, FaltasPorMinutoMatch, GolesPorMinutoMatch, PosicionesFaltasMatch, PosicionesGolesMatch, PosicionesTirosLibresMatch, TopAsistenciasMatch, TopGoleadoresMatch } from './match';
import { PosicionesAsistenciasPlayer, EventosPlayer, EventosPorPartidoPlayer, PosicionesFaltasPlayer, PosicionesGolesPlayer, PosicionesTirosLibresPlayer, RadarChart} from './player';
import ApiService from '../ApiService';


function ConfigurationDetail() {
  const { id } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
    try {
        const response = await ApiService.getConfiguracion(id);
        setData(response);
    } catch (error) {
        console.log(error);
    }
    }

    fetchData();
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
          <div className="grid-container">
            <nav>
              <p class = "nombre">{nombre}</p>
            </nav>
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
        </div>
      );
    }
    else if(tipo === 'players'){
      return (
        <div>
          <Menu />
          <div className="grid-container">
            <nav>
              <p class = "nombre">{nombre}</p>
            </nav>
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
        </div>
      );
    }
    else if(tipo === 'teams'){
      return (
        <div>
          <Menu />
          <div className="grid-container">
            <nav>
              <p class = "nombre">{nombre}</p>
            </nav>
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
    <div class = "seleccion">
      {selectedGraph === "grafica1" && <p class ="label">Posiciones Goles</p>}
      {selectedGraph === "grafica2" && <p class ="label">Local-Visitante</p>}
      {selectedGraph === "grafica3" && <p class ="label">Faltas por minuto</p>}
      {selectedGraph === "grafica4" && <p class ="label">Goles por minuto</p>}
      {selectedGraph === "grafica5" && <p class ="label">Posiciones Asistencias</p>}
      {selectedGraph === "grafica6" && <p class ="label">Posiciones Faltas</p>}
      {selectedGraph === "grafica7" && <p class ="label">Posiciones Tiros Libres</p>}
      {selectedGraph === "grafica8" && <p class ="label">Top Asistentes</p>}
      {selectedGraph === "grafica9" && <p class ="label">Top Goleadores</p>}

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
    <div class = "seleccion">
      {selectedGraph === "grafica1" && <p class ="label">Posiciones Goles</p>}
      {selectedGraph === "grafica2" && <p class ="label">Coeficiente de ataque</p>}
      {selectedGraph === "grafica3" && <p class ="label">Gráfico radar</p>}
      {selectedGraph === "grafica4" && <p class ="label">Posiciones Asistencias</p>}
      {selectedGraph === "grafica5" && <p class ="label">Posiciones Faltas</p>}
      {selectedGraph === "grafica6" && <p class ="label">Posiciones Tiros Libres</p>}
      {selectedGraph === "grafica7" && <p class ="label">Top Goleadores</p>}
      {selectedGraph === "grafica8" && <p class ="label">Goles por minuto</p>}
      {selectedGraph === "grafica9" && <p class ="label">Faltas por minuto</p>}
      {selectedGraph === "grafica10" && <p class ="label">Evolución goles</p>}
      {selectedGraph === "grafica11" && <p class ="label">Top Asistencias</p>}
      {selectedGraph === "grafica12" && <p class ="label">Ataque-Defensa</p>}
      {selectedGraph === "grafica13" && <p class ="label">Resultados</p>}

      {selectedGraph === "grafica1" && <PosicionesGoles wyId={wyId} />}
      {selectedGraph === "grafica2" && <Coeficiente wyId={wyId} />}
      {selectedGraph === "grafica3" && <RadarChartTeam wyId={wyId} />}
      {selectedGraph === "grafica4" && <PosicionesAsistencias wyId={wyId}/>}
      {selectedGraph === "grafica5" && <PosicionesFaltas wyId={wyId}/>}
      {selectedGraph === "grafica6" && <PosicionesTirosLibres wyId={wyId} />}
      {selectedGraph === "grafica7" && <TopGoleadores wyId={wyId}/>}
      {selectedGraph === "grafica8" && <GolesPorMinuto wyId={wyId}/>}
      {selectedGraph === "grafica9" && <FaltasPorMinuto wyId={wyId}/>}
      {selectedGraph === "grafica10" && <SankeyTeam wyId={wyId}/>}
      {selectedGraph === "grafica11" && <TopAsistencias wyId={wyId}/>}
      {selectedGraph === "grafica12" && <DivergingChart wyId={wyId}/>}
      {selectedGraph === "grafica13" && <ResultadosTeam wyId={wyId}/>}
    </div>
  );
}

function SeleccionGraficaPlayers({ graficaSeleccionada, wyId }) {
  const [selectedGraph, setSelectedGraph] = useState(graficaSeleccionada);
  

  function handleChange(event) {
    setSelectedGraph(event.target.value);
  }

  return (
    <div class = "seleccion">
      {selectedGraph === "grafica1" && <p class ="label">Posiciones Goles</p>}
      {selectedGraph === "grafica2" && <p class ="label">Posiciones Asistencias</p>}
      {selectedGraph === "grafica3" && <p class ="label">Posiciones Faltas</p>}
      {selectedGraph === "grafica4" && <p class ="label">Posiciones Tiros Libres</p>}
      {selectedGraph === "grafica5" && <p class ="label">Gráfico Radar</p>}
      {selectedGraph === "grafica6" && <p class ="label">Eventos</p>}
      {selectedGraph === "grafica7" && <p class ="label">Eventos por partido</p>}

      {selectedGraph === "grafica1" && <PosicionesGolesPlayer wyId={wyId} />}
      {selectedGraph === "grafica2" && <PosicionesAsistenciasPlayer wyId={wyId} />}
      {selectedGraph === "grafica3" && <PosicionesFaltasPlayer wyId={wyId} />}
      {selectedGraph === "grafica4" && <PosicionesTirosLibresPlayer wyId={wyId} />}
      {selectedGraph === "grafica5" && <RadarChart wyId={wyId} />}
      {selectedGraph === "grafica6" && <EventosPlayer wyId={wyId} />}
      {selectedGraph === "grafica7" && <EventosPorPartidoPlayer wyId={wyId} />}
    </div>
  );
}
}

export default ConfigurationDetail;

