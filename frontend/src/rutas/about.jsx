import React from "react";
import { Chart } from "react-google-charts";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


export default function About() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/events/teams/684/divergingChart/')
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    });

    const options = {
    title: "Comparación ataque",
    chartArea: { width: "50%" },
    vAxis: {
        title: "Minutos",
    },
    };

    return (
        <Chart
        chartType="BarChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
        />
    );
}







