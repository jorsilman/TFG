import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PosicionesEventos from "../graficas/posicionesEventos";
import {BarrasFaltas, BarrasGoles} from "../graficas/barras";
import {TopAssistantsChart, TopScorersChart} from "../graficas/topGoleadores";
import DivergingChartTeam from "../graficas/divergingTeam";
import ApiService from "../ApiService";

export function PosicionesGolesMatch({wyId}) {
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await ApiService.getGoalEventsMatches(param);
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

export function PosicionesAsistenciasMatch({wyId}) {
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await ApiService.getAssistEventsMatches(param);
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

export function PosicionesFaltasMatch({wyId}) {
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await ApiService.getFoulEventsMatches(param);
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

export function PosicionesTirosLibresMatch({wyId}){
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await ApiService.getFreeKicksEventsMatches(param);
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

export function GolesPorMinutoMatch({wyId}){
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await ApiService.getGoalsByMinuteMatches(param);
            setEvents(response);
        } catch (error) {
            console.log(error);
        }
        }

        fetchData();
    }, [param]);

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
        async function fetchData() {
        try {
            const response = await ApiService.getFoulsByMinuteMatches(param);
            setEvents(response);
        } catch (error) {
            console.log(error);
        }
        }

        fetchData();
    }, [param]);

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
        async function fetchData() {
        try {
            const response = await ApiService.getTopScorersMatches(param);
            setData(response);
        } catch (error) {
            console.log(error);
        }
        }

        fetchData();
    }, [param]);

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
        async function fetchData() {
        try {
            const response = await ApiService.getTopAssistantsMatches(param);
            setData(response);
        } catch (error) {
            console.log(error);
        }
        }

        fetchData();
    }, [param]);

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
        async function fetchData() {
        try {
            const response = await ApiService.getDivergingMatches(param);
            setData(response);
        } catch (error) {
            console.log(error);
        }
        }

        fetchData();
    }, [param]);

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
