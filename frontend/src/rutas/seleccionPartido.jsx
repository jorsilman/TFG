import {Link} from 'react-router-dom';
import Menu from '../components/menu';
import Footer from '../components/footer';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function SelectMatch(){
  return (
    <div>
      <Menu />

      <Matches />

      <Footer />
    </div>
  )
}

function Matches() {
    const [matches, setMatches] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
      axios.get('http://localhost:8000/api/matches/')
        .then(response => {
            setMatches(response.data);
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
          <h2>Selecciona un equipo</h2>
          <select className="form-select mb-3" onChange={handleSelectMatch}>
            <option defaultValue>Selecciona un partido</option>
            {matches.map(match => (
              <option key={match.wyId} value={match.wyId}>{match.label}</option>
            ))}
          </select>
          <Link to={`/matches/${selected}`}>
            <button className="btn btn-primary">Aceptar</button>
          </Link>
        </div>
      </div>
    </div>
    );
  
}

export default SelectMatch;