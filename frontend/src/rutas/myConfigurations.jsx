import React, { useEffect, useState } from 'react';
import '../css/GridContainer.css';
import { Link } from 'react-router-dom';
import Menu from '../components/menu';
import Footer from '../components/footer';
import ApiService from '../ApiService';

function ListaConfiguraciones() {
  const [configuraciones, setConfiguraciones] = useState([]);

  useEffect(() => {
    fetchConfiguraciones();
  }, []);

  const fetchConfiguraciones = async () => {
    try {
      const data = await ApiService.getConfiguraciones();
      setConfiguraciones(data);
    } catch (error) {
      console.error('Error al obtener las configuraciones:', error);
    }
  };

  const eliminarConfiguracion = async (id) => {
    try {
      await ApiService.eliminarConfiguracion(id);
      fetchConfiguraciones();
    } catch (error) {
      console.error('Error al eliminar la configuración:', error);
    }
  };

  return (
    
    <div>
    <Menu />
    <h1 className="mb-4">Lista de Configuraciones</h1>
    <div class = "lista-configs">
      <ul className="list-group">
        {configuraciones.map(configuracion => (
          <li key={configuracion.id} className="list-group-item d-flex justify-content-between align-items-center">
            <Link to={`/configs/${configuracion.id}`} className="text-decoration-none">{configuracion.nombre}</Link>
            <button className="btn btn-danger" onClick={() => eliminarConfiguracion(configuracion.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
    <Footer />
  </div>
    
  );
}

export default ListaConfiguraciones;
