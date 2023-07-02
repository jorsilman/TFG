import {Link} from 'react-router-dom';
import Menu from '../components/menu';
import Footer from '../components/footer';
import React, { useState, useEffect } from 'react';
import ApiService from '../ApiService';
import 'bootstrap/dist/css/bootstrap.min.css';

function PagEquiposFirst(){
  return (
    <div>
      <Menu />

      <Equipos />

      <Footer />
    </div>
  )
}

export function Equipos() {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);

    useEffect(() => {
      async function fetchData() {
      try {
          const response = await ApiService.getTeams();
          setTeams(response);
      } catch (error) {
          console.log(error);
      }
      }
  
      fetchData();
  }, []);

    function handleSelectTeam(event) {
      setSelectedTeam(event.target.value);
    }
  
    return (
      <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <h2>Selecciona un equipo</h2>
          <select className="form-select mb-3" onChange={handleSelectTeam}>
            <option defaultValue>Selecciona  equipo</option>
            {teams.map(team => (
              <option key={team.wyId} value={team.wyId}>{team.name}</option>
            ))}
          </select>
          <Link to={`/teams/${selectedTeam}`}>
            <button className="btn btn-primary">Aceptar</button>
          </Link>
        </div>
      </div>
    </div>
    );
  
}

export default PagEquiposFirst;
