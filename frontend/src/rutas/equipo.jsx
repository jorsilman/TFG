import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PosicionesEventos from "../graficas/posicionesEventos";
import {BarrasFaltas, BarrasGoles} from "../graficas/barras";
import { Sankey } from "../graficas/sankey";
import {TopAssistantsChart, TopScorersChart} from "../graficas/topGoleadores";
import DivergingChartTeam from "../graficas/divergingTeam";

export function PosicionesGoles(){
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/teams/' + id + '/goals/')
        .then(response => {
            setEvents(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [id]);

    return (
        <div>
            <PosicionesEventos events={events} />
        </div>
    );

}

export function PosicionesAsistencias(){
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/teams/' + id + '/assitant/')
        .then(response => {
            setEvents(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [id]);

    return (
        <div>
            <PosicionesEventos events={events} />
        </div>
    );

}

export function PosicionesFaltas(){
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/teams/' + id + '/fouls/')
        .then(response => {
            setEvents(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [id]);

    return (
        <div>
            <PosicionesEventos events={events} />
        </div>
    );

}

export function PosicionesTirosLibres(){
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/teams/' + id + '/free_kicks/')
        .then(response => {
            setEvents(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [id]);

    return (
        <div>
            <PosicionesEventos events={events} />
        </div>
    );

}

export function GolesPorMinuto(){
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/teams/' + id + '/goalsByMinute/')
        .then(response => {
            setEvents(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [id]);

    return (
        <div>
            <BarrasGoles events={events} />
        </div>
    );
}

export function FaltasPorMinuto(){
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/teams/' + id + '/foulsByMinute/')
        .then(response => {
            setEvents(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [id]);

    return (
        <div>
            <BarrasFaltas events={events} />
        </div>
    );
}

export function SankeyTeam(){

    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/teams/' + id + '/sankey/')
        .then(response => {
            setEvents(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [id]);

    return (
        <div>
            {events.length > 0 ? (
                <Sankey events={events} />
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
}

export function TopGoleadores(){
    const [data, setData] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/teams/' + id + '/topScorers/')
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [id]);

    return (
        <div>
            {data ? (
                <TopScorersChart data={data} />
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
}

export function TopAsistencias(){
    const [data, setData] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/teams/' + id + '/topAssistants/')
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [id]);

    return (
        <div>
            {data ? (
                <TopAssistantsChart data={data} />
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
}

export function DivergingChart(){
    const [data, setData] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/teams/' + id + '/divergingChart/')
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [id]);

    return (
        <div>
            {data ? (
                <DivergingChartTeam data={data} />
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
}
