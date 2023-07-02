import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PosicionesEventos from "../graficas/posicionesEventos";
import { EventosJugador, EventosPorPartidoJugador } from "../graficas/topGoleadores";
import RadarChartPlayer from "../graficas/radarPlayer";
import ApiService from "../ApiService";

export function PosicionesGolesPlayer({wyId}) {
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        async function fetchGoalsData() {
        try {
            const response = await ApiService.getGoalEventsPlayers(param);
            setEvents(response);
        } catch (error) {
            console.log(error);
        }
        }

        fetchGoalsData();
    }, [param]);


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
        async function fetchAssistsData() {
        try {
            const response = await ApiService.getAssistEventsPlayers(param);
            setEvents(response);
        } catch (error) {
            console.log(error);
        }
        }

        fetchAssistsData();
    }, [param]);


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
        async function fetchData() {
        try {
            const response = await ApiService.getFoulEventsPlayers(param);
            setEvents(response);
        } catch (error) {
            console.log(error);
        }
        }

        fetchData();
    }, [param]);

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
        async function fetchData() {
        try {
            const response = await ApiService.getFreeKicksEventsPlayers(param);
            setEvents(response);
        } catch (error) {
            console.log(error);
        }
        }

        fetchData();
    }, [param]);

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
        async function fetchData() {
        try {
            const response = await ApiService.getEventosPlayer(param);
            setEvents(response);
        } catch (error) {
            console.log(error);
        }
        }

        fetchData();
    }, [param]);

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
        async function fetchData() {
        try {
            const response = await ApiService.getEventosPorPartidoPlayer(param);
            setEvents(response);
        } catch (error) {
            console.log(error);
        }
        }

        fetchData();
    }, [param]);

    return (
        <div>
            <EventosPorPartidoJugador data={events} />
        </div>
    );

}

export function RadarChart({wyId}){
    const [data, setData] = useState(null);

    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        async function fetchRadarData() {
        try {
            const response = await ApiService.getRadarPlayerData(param);
            setData(response);
        } catch (error) {
            console.log(error);
        }
        }

        fetchRadarData();
    }, [param]);

    return (
        <div>
            {data ? (
                <RadarChartPlayer data={data} />
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
}