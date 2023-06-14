import {Link} from 'react-router-dom';
import Menu from '../components/menu';
import Footer from '../components/footer';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

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
      axios.get('http://localhost:8000/api/players/')
        .then(response => {
          setPlayers(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);

    function handleSelectMatch(event) {
        setSelected(event.target.value);
    }
  
    return (
      <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <h2>Selecciona un jugador</h2>
          <select className="form-select mb-3" onChange={handleSelectMatch}>
            <option defaultValue>Selecciona un jugador</option>
            {players.map(player => (
              <option key={player.wyId} value={player.wyId}>{player.firstName} {player.lastName}</option>
            ))}
          </select>
          <Link to={`/players/${selected}`}>
            <button className="btn btn-primary">Aceptar</button>
          </Link>
        </div>
      </div>
    </div>
    );
  
}

export default SelectPlayer;