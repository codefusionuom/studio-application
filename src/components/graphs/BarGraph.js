import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";


export default function BasicBars() {
  return (
    
    <Card className="w-2/3 flex items-center mr-5 rounded-xl text-center">
      <div>
        <div><a>Weekly Comparison</a></div>
    <div >
    <BarChart className=''
      xAxis={[{
        scaleType: 'band', data: ['group A', 'group B', 'group C', 'group d', 'group e', 'group f', 'group g'] ,
        // barGapRatio: 0.5,
        categoryGapRatio: 0.5
    }]}
      series={[{ data: [5, 7, 8 , 4, 4,,3,4], color: 'blue' 
    }
    //   , { data: [1] }, { data: [2] } //graphs of same group
    ]}
      width={900}
      height={300}
      barWidth={2}
    /> 
    </div>
    </div>
    </Card>

   
  );
}


