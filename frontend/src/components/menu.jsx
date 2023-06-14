import {Link} from 'react-router-dom';

export default function Menu(){
    return (<div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Inicio</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/teams">Equipos</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/matches">Partidos</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/players">Jugadores</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">Prueba</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/configs">Configuraciones</Link>
                    </li>
                </ul>
            </div>
        </nav>
        
    </div>
    );
}