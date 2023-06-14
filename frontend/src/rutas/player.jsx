import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PosicionesEventos from "../graficas/posicionesEventos";
import { EventosJugador, EventosPorPartidoJugador } from "../graficas/topGoleadores";



export function PosicionesGolesPlayer({wyId}) {
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/players/' + param + '/goals/')
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

export function PosicionesAsistenciasPlayer({wyId}) {
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/players/' + param + '/assitant/')
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

export function PosicionesFaltasPlayer({wyId}) {
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/players/' + param + '/fouls/')
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

export function PosicionesTirosLibresPlayer({wyId}) {
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/players/' + param + '/free_kicks/')
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

export function EventosPlayer({wyId}){
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/players/' + param + '/events_count/')
        .then(response => {
            setEvents(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [id]);

    return (
        <div>
            <EventosJugador data={events} />
        </div>
    );

}

export function EventosPorPartidoPlayer({wyId}){
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/players/' + param + '/events_by_match/')
        .then(response => {
            setEvents(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [id]);

    return (
        <div>
            <EventosPorPartidoJugador data={events} />
        </div>
    );

}