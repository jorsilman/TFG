import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function CoeficienteAtaqueEquipo({coeficiente}) {
  

  return (
    <div>
      {coeficiente != null ? (
        <div>
          <div className="circle">
            <span className="number">{coeficiente}</span>
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}


export default CoeficienteAtaqueEquipo;


