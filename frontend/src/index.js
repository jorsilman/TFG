import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './rutas/home';
import About from './rutas/about';
import PagEquiposFirst from './rutas/teams';
import EquipoDetalle from './rutas/equipoDetalle';

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
    path: '/about',
    element: <About />,
  },
  {
    path: '/teams/:id',
    element: <EquipoDetalle />,
  }
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
