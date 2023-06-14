import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PosicionesEventos from "../graficas/posicionesEventos";
import {BarrasFaltas, BarrasGoles} from "../graficas/barras";
import { Sankey } from "../graficas/sankey";
import {TopAssistantsChart, TopScorersChart} from "../graficas/topGoleadores";
import DivergingChartTeam from "../graficas/divergingTeam";

export function PosicionesGoles({wyId}) {
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/teams/' + param + '/goals/')
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

export function PosicionesAsistencias({wyId}) {
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/teams/' + param + '/assitant/')
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

export function PosicionesFaltas({wyId}) {
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/teams/' + param + '/fouls/')
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

export function PosicionesTirosLibres({wyId}){
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/teams/' + param + '/free_kicks/')
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

export function GolesPorMinuto({wyId}){
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/teams/' + param + '/goalsByMinute/')
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

export function FaltasPorMinuto({wyId}){
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/teams/' + param + '/foulsByMinute/')
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

export function SankeyTeam({wyId}){

    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/teams/' + param + '/sankey/')
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

export function TopGoleadores({wyId}){
    const [data, setData] = useState(null);

    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/teams/' + param + '/topScorers/')
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

export function TopAsistencias({wyId}){
    const [data, setData] = useState(null);

    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/teams/' + param + '/topAssistants/')
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

export function DivergingChart({wyId}){
    const [data, setData] = useState(null);

    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/teams/' + param + '/divergingChart/')
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
