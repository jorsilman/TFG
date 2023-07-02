import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Footer from '../components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../components/menu';
import '../css/GridContainer.css';
import { PosicionesAsistenciasPlayer, EventosPlayer, EventosPorPartidoPlayer, PosicionesFaltasPlayer, PosicionesGolesPlayer, PosicionesTirosLibresPlayer, RadarChart} from './player';
import ApiService from '../ApiService';

function PlayerDetail() {
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
    formData.append('tipo', 'players');
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
          <Nombre />
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
    <div class = "seleccion">
        <select className="form-select custom-class" value={graficaSeleccionada} onChange={handleChange}>
          <option value="">Selecciona una gráfica</option>
          <option value="grafica1">Posiciones Goles</option>
          <option value="grafica2">Posiciones Asistencias</option>
          <option value="grafica3">Posiciones Faltas</option>
          <option value="grafica4">Posiciones Tiros Libres</option>
          <option value="grafica5">Gráfico radar</option>
          <option value="grafica6">Eventos</option>
          <option value="grafica7">Eventos por partido</option>
        </select>
        {graficaSeleccionada === "grafica1" && <PosicionesGolesPlayer />}
        {graficaSeleccionada === "grafica2" && <PosicionesAsistenciasPlayer />}
        {graficaSeleccionada === "grafica3" && <PosicionesFaltasPlayer />}
        {graficaSeleccionada === "grafica4" && <PosicionesTirosLibresPlayer />}
        {graficaSeleccionada === "grafica5" && <RadarChart />}
        {graficaSeleccionada === "grafica6" && <EventosPlayer />}
        {graficaSeleccionada === "grafica7" && <EventosPorPartidoPlayer />}
    </div>
  );
}

function Nombre(){
  const { id } = useParams();
  const [data, setData] = useState('');


  useEffect(() => {
    async function fetchData() {
    try {
        const response = await ApiService.getPlayer(id);
        setData(response);
    } catch (error) {
        console.log(error);
        console.log('Error al obtener los datos');
    }
    }

    fetchData();
  }, [id]);
  const firstN = data.firstName;
  const lastN = data.lastName;
  const middleN = data.middleName;
  if(middleN != null){
    var nombre = firstN + " " + middleN + " " + lastN;
  }else{
    var nombre = firstN + " " + lastN;
  }
  return (
    <p class = "nombre">{nombre}</p>
  );
}

export default PlayerDetail;

