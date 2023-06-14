import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './rutas/home';
import PagEquiposFirst from './rutas/teams';
import SelectMatch from './rutas/seleccionPartido';
import SelectPlayer from './rutas/selectPlayer';
import PartidoDetalle from './rutas/matchDetail';
import PlayerDetail from './rutas/playerDetail';
import Login from './components/login';
import EquipoDetalleP from './rutas/equipoDetalle copy';
import ListaConfiguraciones from './rutas/myConfigurations';
import ConfigurationDetail from './rutas/configurationDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/teams',
    element: <PagEquiposFirst />,
  },
  {
    path: '/matches',
    element: <SelectMatch />,
  },
  {
    path: '/players',
    element: <SelectPlayer />,
  },
  {
    path: '/teams/:id',
    element: <EquipoDetalleP />,
  },
  {
    path: '/matches/:id',
    element: <PartidoDetalle />,
  },
  {
    path: '/players/:id',
    element: <PlayerDetail />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/configs',
    element: <ListaConfiguraciones />,
  },
  {
    path: '/configs/:id',
    element: <ConfigurationDetail />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <RouterProvider router={router }></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
