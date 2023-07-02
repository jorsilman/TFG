import {Link} from 'react-router-dom';
import Menu from '../components/menu';
import Footer from '../components/footer';
import React, { useState, useEffect } from 'react';
import ApiService from '../ApiService';
import Select from 'react-select';
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
    async function fetchData() {
    try {
        const response = await ApiService.getMatches();
        setMatches(response);
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
          <h2>Selecciona un partido</h2>
          <Select
            options={matches.map(match => ({
              value: match.wyId,
              label: `${match.label}`
            }))}
            placeholder="Selecciona un partido"
            onChange={handleSelectMatch}
            value={selected}
          />
          <Link to={`/matches/${selected ? selected.value : ''}`}>
            <button className="btn btn-primary">Aceptar</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SelectMatch;