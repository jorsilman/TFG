import {Link} from 'react-router-dom';
import Menu from '../components/menu';
import Footer from '../components/footer';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import ApiService from '../ApiService';

function SelectPlayer(){
  return (
    <div>
      <Menu />

      <Players />

      <Footer />
    </div>
  )
}

function Players() {
  const [players, setPlayers] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function fetchData() {
    try {
        const response = await ApiService.getPlayers();
        setPlayers(response);
    } catch (error) {
        console.log(error);
    }
    }

    fetchData();
}, []);

  function handleSelectMatch(selectedOption) {
    setSelected(selectedOption);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <h2>Selecciona un jugador</h2>
          <Select
            options={players.map(player => ({
              value: player.wyId,
              label: `${player.firstName} ${player.lastName}`
            }))}
            placeholder="Selecciona un jugador"
            onChange={handleSelectMatch}
            value={selected}
          />
          <Link to={`/players/${selected ? selected.value : ''}`}>
            <button className="btn btn-primary">Aceptar</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SelectPlayer;