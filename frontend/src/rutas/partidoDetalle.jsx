import {Link} from 'react-router-dom';
import Menu from '../components/menu';
import Footer from '../components/footer';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/GridContainer.css';
import SelectGraph from '../components/selectGraphMatches';

function MatchDetail(){
  return (
    <div>
      <Menu />
        <GridContainer />

     
    </div>
  )
}

function GridContainer() {
    const [numColumns, setNumColumns] = useState(3);
  
    const handleColumnChange = (num) => {
      setNumColumns(num);
    };
  
    return (
      <div className="grid-container">
        <nav>
          <button onClick={() => handleColumnChange(3)}>3</button>
          <button onClick={() => handleColumnChange(4)}>4</button>
          <button onClick={() => handleColumnChange(6)}>6</button>
        </nav>
        <div className={`grid-layout columns-${numColumns}`}>
          {/* Renderizar los divs según el número de columnas */}
          {Array.from({ length: numColumns }).map((_, index) => (
            <div key={index} className="grid-item">
              <SelectGraph />
            </div>
          ))}
        </div>
      </div>
    );
}



export default MatchDetail;