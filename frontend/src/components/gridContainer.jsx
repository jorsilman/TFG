import React, { useState } from 'react';
import '../css/GridContainer.css';

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
            Div {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GridContainer;
