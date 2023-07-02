import React from 'react';
import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import PagEquiposFirst from '../rutas/selectTeam';
import { MemoryRouter } from 'react-router-dom';
import { Equipos } from '../rutas/selectTeam';
import ApiService from '../ApiService';
import '@testing-library/jest-dom/extend-expect';
import SelectMatch from '../rutas/selectMatch';
import SelectPlayer from '../rutas/selectPlayer';
import PlayerDetail from '../rutas/playerDetail';
import EquipoDetalleP from '../rutas/teamDetail';
import PartidoDetalle from '../rutas/matchDetail';


jest.mock('../ApiService', () => ({
  getTeams: jest.fn(() => Promise.resolve([])),
  getMatches: jest.fn(() => Promise.resolve([])),
  getPlayers: jest.fn(() => Promise.resolve([])),
}));

test('select team', async () => {
  const component = render(
    <MemoryRouter>
      <PagEquiposFirst />
    </MemoryRouter>
  );

  expect(component.container).toHaveTextContent('Selecciona un equipo');
  
});

test('select match', async () => {
  const component = render(
    <MemoryRouter>
      <SelectMatch />
    </MemoryRouter>
  );

  expect(component.container).toHaveTextContent('Selecciona un partido');
  
});

test('select player', async () => {
  const component = render(
    <MemoryRouter>
      <SelectPlayer />
    </MemoryRouter>
  );

  expect(component.container).toHaveTextContent('Selecciona un jugador');
  
});

test('team detail', async () => {
  const {container} = render(
    <MemoryRouter>
      <EquipoDetalleP />
    </MemoryRouter>
  );

  const gridItems = container.getElementsByClassName('grid-item');
  expect(gridItems.length).toBe(3);


  const cuatro = screen.getByText('4');
  fireEvent.click(cuatro);
  let gridItems4 = container.getElementsByClassName('grid-item');
  expect(gridItems4.length).toBe(4);

  const seis = screen.getByText('6');
  fireEvent.click(seis);
  let gridItems6 = container.getElementsByClassName('grid-item');
  expect(gridItems6.length).toBe(6);
});

test('player detail', async () => {
  const {container} = render(
    <MemoryRouter>
      <PlayerDetail />
    </MemoryRouter>
  );

  const gridItems = container.getElementsByClassName('grid-item');
  expect(gridItems.length).toBe(3);


  const cuatro = screen.getByText('4');
  fireEvent.click(cuatro);
  let gridItems4 = container.getElementsByClassName('grid-item');
  expect(gridItems4.length).toBe(4);

  const seis = screen.getByText('6');
  fireEvent.click(seis);
  let gridItems6 = container.getElementsByClassName('grid-item');
  expect(gridItems6.length).toBe(6);
});

test('match detail', async () => {
  const {container} = render(
    <MemoryRouter>
      <PartidoDetalle />
    </MemoryRouter>
  );

  const gridItems = container.getElementsByClassName('grid-item');
  expect(gridItems.length).toBe(3);


  const cuatro = screen.getByText('4');
  fireEvent.click(cuatro);
  let gridItems4 = container.getElementsByClassName('grid-item');
  expect(gridItems4.length).toBe(4);

  const seis = screen.getByText('6');
  fireEvent.click(seis);
  let gridItems6 = container.getElementsByClassName('grid-item');
  expect(gridItems6.length).toBe(6);
});
