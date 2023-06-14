import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Menu from '../components/menu';
import Footer from '../components/footer';

function ListaConfiguraciones() {
  const [configuraciones, setConfiguraciones] = useState([]);

  useEffect(() => {
    getConfiguraciones();
  }, []);

  const getConfiguraciones = async () => {
    try {
      const response = await axios.get('http://localhost:8000/configuraciones/');
      setConfiguraciones(response.data.configuraciones);
    } catch (error) {
      console.error('Error al obtener las configuraciones:', error);
    }
  };

  const eliminarConfiguracion = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/configuraciones/${id}/delete/`);
      getConfiguraciones(); // Actualizar la lista después de eliminar
    } catch (error) {
      console.error('Error al eliminar la configuración:', error);
    }
  };

  return (
    <div>
      <Menu />
      <h1>Lista de Configuraciones</h1>
      <ul>
        {configuraciones.map(configuracion => (
          <li key={configuracion.id}>
            <Link to={`/configs/${configuracion.id}`}>
              {configuracion.nombre}
            </Link>
            <button onClick={() => eliminarConfiguracion(configuracion.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}

export default ListaConfiguraciones;
