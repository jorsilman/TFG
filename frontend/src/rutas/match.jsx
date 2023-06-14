import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PosicionesEventos from "../graficas/posicionesEventos";
import {BarrasFaltas, BarrasGoles} from "../graficas/barras";
import { Sankey } from "../graficas/sankey";
import {TopAssistantsChart, TopScorersChart} from "../graficas/topGoleadores";
import DivergingChartTeam from "../graficas/divergingTeam";

export function PosicionesGolesMatch({wyId}) {
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/matches/' + param + '/goals/')
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

export function PosicionesAsistenciasMatch({wyId}) {
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/matches/' + param + '/assitant/')
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

export function PosicionesFaltasMatch({wyId}) {
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/matches/' + param + '/fouls/')
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

export function PosicionesTirosLibresMatch({wyId}){
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/matches/' + param + '/free_kicks/')
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

export function GolesPorMinutoMatch({wyId}){
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/matches/' + param + '/goalsByMinute/')
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

export function FaltasPorMinutoMatch({wyId}){
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/matches/' + param + '/foulsByMinute/')
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


export function TopGoleadoresMatch({wyId}){
    const [data, setData] = useState(null);

    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/matches/' + param + '/topScorers/')
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

export function TopAsistenciasMatch({wyId}){
    const [data, setData] = useState(null);

    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/matches/' + param + '/topAssistants/')
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

export function DivergingChartMatch({wyId}){
    const [data, setData] = useState(null);

    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/matches/' + param + '/divergentChart/')
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
