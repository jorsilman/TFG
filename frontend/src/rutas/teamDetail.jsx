import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Footer from '../components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/GridContainer.css';
import Menu from '../components/menu';
import { PosicionesGoles, PosicionesAsistencias, PosicionesFaltas, PosicionesTirosLibres, GolesPorMinuto, FaltasPorMinuto, SankeyTeam, TopGoleadores, TopAsistencias, DivergingChart, RadarChartTeam, Coeficiente, ResultadosTeam} from './team';
import ApiService from '../ApiService';

function EquipoDetalleP() {
  const [graficaConfig, setGraficaConfig] = useState([]);
  const [nombre, setNombre] = useState('');

  const handleGraficaConfigChange = (columnIndex, graficaSeleccionada) => {
    const updatedConfig = [...graficaConfig];
    updatedConfig[columnIndex] = graficaSeleccionada;
    setGraficaConfig(updatedConfig);
  };


  const { id } = useParams();

  const handleGuardarConfiguracion = async () => {

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('wyId', id);
    formData.append('tipo', 'teams');
    formData.append('num_columns', numColumns);

    formData.append('graficas_seleccionadas', JSON.stringify(graficaConfig));

    if(nombre === ''){
      window.alert('Debe ingresar un nombre para guardar la configuración');
      return;
    }
    
    try {
      const response = await ApiService.guardarConfiguracion(formData);
      window.alert('Configuración guardada con éxito');
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
          <div className="mb-3 input-config">
            <label htmlFor="nombre" className="form-label mt-3">Nombre:</label>
            <input type="text" id="nombre" className="form-control mt-3" value={nombre} onChange={handleNombreChange} />
            <button className="btn btn-primary mt-3" onClick={handleGuardarConfiguracion}>Guardar</button>
          </div>
          <button onClick={() => handleColumnChange(3)}>3</button>
          <button onClick={() => handleColumnChange(4)}>4</button>
          <button onClick={() => handleColumnChange(6)}>6</button>
          <NombreEquipo />
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
    </div>
  );
}

function SeleccionGrafica({ graficaSeleccionada, onGraficaSeleccionada }) {
  const handleChange = (event) => {
    onGraficaSeleccionada(event.target.value);
  };

  return (
    <div className="seleccion">
        <select className="form-select custom-class" value={graficaSeleccionada} onChange={handleChange}>
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
          <option value="grafica10">Evolución goles</option>
          <option value="grafica11">Top Asistencias</option>
          <option value="grafica12">Ataque-Defensa</option>
          <option value="grafica13">Resultados</option>
        </select>
        {graficaSeleccionada === "grafica1" && <PosicionesGoles />}
        {graficaSeleccionada === "grafica2" && <Coeficiente />}
        {graficaSeleccionada === "grafica3" && <RadarChartTeam />}
        {graficaSeleccionada === "grafica4" && <PosicionesAsistencias />}
        {graficaSeleccionada === "grafica5" && <PosicionesFaltas />}
        {graficaSeleccionada === "grafica6" &&<PosicionesTirosLibres />}
        {graficaSeleccionada === "grafica7" && <TopGoleadores />}
        {graficaSeleccionada === "grafica8" && <GolesPorMinuto />}
        {graficaSeleccionada === "grafica9" && <FaltasPorMinuto />}
        {graficaSeleccionada === "grafica10" && <SankeyTeam />}
        {graficaSeleccionada === "grafica11" && <TopAsistencias />}
        {graficaSeleccionada === "grafica12" && <DivergingChart />}
        {graficaSeleccionada === "grafica13" && <ResultadosTeam />}
    </div>
  );
}

function NombreEquipo(){
  const { id } = useParams();
  const [data, setData] = useState('');


  useEffect(() => {
    async function fetchData() {
    try {
        const response = await ApiService.getTeam(id);
        setData(response);
    } catch (error) {
        console.log(error);
        console.log('Error al obtener los datos');
    }
    }

    fetchData();
  }, [id]);
  const nombre = data.officialName;
  return (
    <p class = "nombre">{nombre}</p>
  );
}

export default EquipoDetalleP;

