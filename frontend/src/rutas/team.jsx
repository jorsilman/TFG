import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PosicionesEventos from "../graficas/posicionesEventos";
import {BarrasFaltas, BarrasGoles} from "../graficas/barras";
import { Sankey } from "../graficas/sankey";
import {TopAssistantsChart, TopScorersChart, Resultados} from "../graficas/topGoleadores";
import DivergingChartTeam from "../graficas/divergingTeam";
import RadarChart from "../graficas/radarTeam";
import CoeficienteAtaqueEquipo from "../graficas/coeficientes";
import ApiService from "../ApiService";

export function PosicionesGoles({wyId}) {
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await ApiService.getGoalEventsTeams(param);
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

export function PosicionesAsistencias({wyId}) {
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await ApiService.getAssistEventsTeams(param);
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

export function PosicionesFaltas({wyId}) {
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await ApiService.getFoulEventsTeams(param);
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

export function PosicionesTirosLibres({wyId}){
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await ApiService.getFreeKicksEventsTeams(param);
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

export function GolesPorMinuto({wyId}){
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await ApiService.getGoalsByMinuteTeams(param);
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

export function FaltasPorMinuto({wyId}){
    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await ApiService.getFoulsByMinuteTeams(param);
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

export function SankeyTeam({wyId}){

    const [events, setEvents] = useState([]);
    
    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await ApiService.getSankeyTeams(param);
            setEvents(response);
        } catch (error) {
            console.log(error);
        }
        }

        fetchData();
    }, [param]);

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
        async function fetchData() {
        try {
            const response = await ApiService.getTopScorers(param);
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

export function TopAsistencias({wyId}){
    const [data, setData] = useState(null);

    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await ApiService.getTopAssistants(param);
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

export function DivergingChart({wyId}){
    const [data, setData] = useState(null);

    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await ApiService.getDiverging(param);
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

export function RadarChartTeam({wyId}){
    const [data, setData] = useState(null);

    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await ApiService.getRadarTeam(param);
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
                <RadarChart data={data} />
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
}

export function Coeficiente({wyId}){
    const [data, setData] = useState(null);

    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await ApiService.getCoeficiente(param);
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
                <CoeficienteAtaqueEquipo coeficiente={data} />
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
}

export function ResultadosTeam({wyId}){
    const [data, setData] = useState(null);

    const { id } = useParams();

    const param = wyId ? wyId : id;

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await ApiService.getResultsTeam(param);
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
                <Resultados data={data} />
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
}
