// Filename - App.js

import React from "react";
// import {Paper, TableHead, TableContainer } from '@mui/material'
import {
  Chart,
  PieSeries,
  Title,
} from "@devexpress/dx-react-chart-material-ui";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const PieChar = () => {
  // Sample data
  const data = [
    { argument: "Monday", value: 10 },
    { argument: "Tuesday", value: 40 },
    { argument: "Wednesday", value: 10 },
    { argument: "Thursday", value: 20 },
    { argument: "Friday", value: 20 },
  ];
  return (
    <Card className="w-1/3 rounded-xl ml-5">
      <Chart data={data}>
        <PieSeries
          valueField="value"
          argumentField="argument"
          innerRadius={0.6}
        />
        <Title text="Daily Sales" className="font-extralight text-black"/>
      </Chart>
    </Card>
  );
};

export default PieChar;
