import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function CoeficienteAtaqueEquipo() {
  const [coeficiente, setCoeficiente] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/api/events/teams/${id}/attack/`)
      .then((response) => response.json())
      .then((data) => setCoeficiente(data.coeficiente))
      .catch((error) => console.error(error));
  }, [id]);

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

