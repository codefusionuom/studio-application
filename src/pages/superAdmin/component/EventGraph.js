import React, { useEffect } from 'react'
import axiosInstance from '../../../config/axios.config';
import { Chart } from '@devexpress/dx-react-chart-material-ui';

function EventGraph() {

    // Sample event data
const data = [
  
            {
                "id": 1,
                "status": "Paused",
                "createdAt": "2024-07-03T07:25:51.639Z",
                "updatedAt": "2024-07-03T12:55:25.533Z"
            },
            {
                "id": 2,
                "status": "Paused",
                "createdAt": "2024-07-03T07:26:51.899Z",
                "updatedAt": "2024-07-03T12:26:40.842Z"
            },
            {
                "id": 3,
                "status": "Done",
                "createdAt": "2024-07-03T10:37:02.766Z",
                "updatedAt": "2024-07-03T12:54:46.866Z"
            },
            {
                "id": 4,
                "status": "Rejected",
                "createdAt": "2024-07-03T10:38:12.782Z",
                "updatedAt": "2024-07-03T12:26:12.852Z"
            },
            {
                "id": 5,
                "status": "Upcoming",
                "createdAt": "2024-07-03T13:53:50.228Z",
                "updatedAt": "2024-07-03T15:18:22.816Z"
            },
            {
                "id": 6,
                "status": "Done",
                "createdAt": "2024-07-03T13:54:23.249Z",
                "updatedAt": "2024-07-03T17:44:51.287Z"
            },
            {
                "id": 7,
                "status": "Done",
                "createdAt": "2024-07-03T17:45:01.536Z",
                "updatedAt": "2024-07-03T17:45:12.945Z"
            },
            {
                "id": 8,
                "status": "Done",
                "createdAt": "2024-07-03T17:45:54.108Z",
                "updatedAt": "2024-07-03T17:46:12.870Z"
            },
            {
                "id": 9,
                "serviceDate": "2024-07-03T18:30:00.000Z",
                "status": "pending",
                "createdAt": "2024-07-03T17:46:43.941Z",
                "updatedAt": "2024-07-03T17:46:43.941Z"
            }
        
  ];
  
  const chartConfig = {
    type: "bar",
    height: 400, //hight of graph
    series: [
      {
        name: "Sales",
        data: [50, 40, 300, 320, 500, 350, 200], //bar data
      },
    ],
  
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#367CFF"], //color of bar
      plotOptions: {
        bar: {
          columnWidth: "40%", //width of bar
          borderRadius: 2, //bar border radius
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };
  
  // Aggregate payments by date


    const handleSearch = async () => {
        console.log("searching begin");
        try {
          const { data } = await axiosInstance.get(
            `/eventManager/Filter/Between/`
          );
          if (!data) {
          }
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        console.log("search when page change");
        handleSearch();
        
      }, []);
  return (
    <div>
        sssss
<Chart {...chartConfig} />
    </div>
  )
}

export default EventGraph