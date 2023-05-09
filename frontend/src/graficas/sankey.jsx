import { Chart } from "react-google-charts";

export function Sankey({events}){
    

    const options = {};

    return (
        <Chart
          chartType="Sankey"
          data={events}
          options={options}
        />
      );

}