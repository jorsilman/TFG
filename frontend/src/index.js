import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './rutas/home';
import PagEquiposFirst from './rutas/selectTeam';
import SelectMatch from './rutas/selectMatch';
import SelectPlayer from './rutas/selectPlayer';
import PartidoDetalle from './rutas/matchDetail';
import PlayerDetail from './rutas/playerDetail';
import EquipoDetalleP from './rutas/teamDetail';
import ListaConfiguraciones from './rutas/myConfigurations';
import ConfigurationDetail from './rutas/configurationDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer position="top-right" autoClose={3000} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
