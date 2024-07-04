// // Filename - App.js

// import React from "react";
// // import {Paper, TableHead, TableContainer } from '@mui/material'
// import {
//   Chart,
//   PieSeries,
//   Title,
// } from "@devexpress/dx-react-chart-material-ui";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Typography,
//   Button,
// } from "@material-tailwind/react";

// const PieChar = () => {
//   // Sample data
//   const data = [
//     { argument: "Monday", value: 10 },
//     { argument: "Tuesday", value: 40 },
//     { argument: "Wednesday", value: 10 },
//     { argument: "Thursday", value: 20 },
//     { argument: "Friday", value: 20 },
//   ];
//   return (
//     <Card className="w-1/3 rounded-xl ml-5">
//       <Chart data={data}>
//         <PieSeries
//           valueField="value"
//           argumentField="argument"
//           innerRadius={0.6}
//         />
//         <Title text="Daily Sales" className="font-extralight text-black"/>
//       </Chart>
//     </Card>
//   );
// };

// export default PieChar;


import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import Chart from 'react-apexcharts';
import { Square3Stack3DIcon } from '@heroicons/react/24/outline';

// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const chartConfig = {
  type: 'pie',
  width: 400,
  height: 400,
  series: [44, 55, 13, 43, 22],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: '',
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#020617', '#ff8f00', '#00897b', '#1e88e5', '#d81b60'],
    legend: {
      show: false,
    },
  },
};

export default function PieChar() {
  return (
    <Card className='w-1/3 rounded-xl ml-5'>
      <CardHeader
        floated={false}
        shadow={false}
        color='transparent'
        className='flex flex-col gap-4 rounded-none md:flex-row md:items-center'
      >
        <div className='pl-10 pt-3'>
          <Typography
            variant='h6'
            color='black'
            className='text-2xl font-semibold'
          >
            Daily Sales
          </Typography>
        </div>
      </CardHeader>
      <CardBody className='mt-4 grid place-items-center px-2'>
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}