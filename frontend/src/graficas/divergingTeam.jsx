import React from "react";
import { Chart } from "react-google-charts";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


export default function DivergingChartTeam({data}) {
    
    const options = {
        title: "Ataque-Defensa",
        curveType: "function",
        legend: { position: "bottom" },
      };
      
    
    return (
        <Chart
        chartType="LineChart"
        data={data}
        options={options}
        />
    );
}