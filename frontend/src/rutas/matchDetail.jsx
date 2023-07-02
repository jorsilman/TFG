import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Footer from '../components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../components/menu';
import { PosicionesAsistenciasMatch, DivergingChartMatch, FaltasPorMinutoMatch, GolesPorMinutoMatch, PosicionesFaltasMatch, PosicionesGolesMatch, PosicionesTirosLibresMatch, TopAsistenciasMatch, TopGoleadoresMatch } from './match';
import ApiService from '../ApiService';

function PartidoDetalle() {
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
    formData.append('tipo', 'matches');
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
            <label htmlFor="nombre" className="form-label mt-3">Nombre:   </label>
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
    <div class="seleccion">
        <select className="form-select custom-class" value={graficaSeleccionada} onChange={handleChange}>
          <option value="">Selecciona una gráfica</option>
          <option value="grafica1">Posiciones Goles</option>
          <option value="grafica2">Local - Visitante</option>
          <option value="grafica3">Faltas por minuto</option>
          <option value="grafica4">Goles por minuto</option>
          <option value="grafica5">Posiciones Asistencias</option>
          <option value="grafica6">Posiciones Faltas</option>
          <option value="grafica7">Posiciones Tiros Libres</option>
          <option value="grafica8">Top Asistencias</option>
          <option value="grafica9">Top Goleadores</option>
        </select>
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

function Nombre(){
  const { id } = useParams();
  const [data, setData] = useState('');


  useEffect(() => {
    async function fetchData() {
    try {
        const response = await ApiService.getMatch(id);
        setData(response);
    } catch (error) {
        console.log(error);
        console.log('Error al obtener los datos');
    }
    }

    fetchData();
  }, [id]);
  const nombre = data.label;
  return (
    <p class = "nombre">{nombre}</p>
  );
}

export default PartidoDetalle;

