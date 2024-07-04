import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axiosInstance from "../../config/axios.config";




export default function BarGraph() {
  const initialChartConfig = {
    type: "bar",
    height: 400,
    series: [
      {
        name: "Event Count",
        data: [], // Initialize with empty data
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#367CFF"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
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
        categories: [], // Initialize with empty categories
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

  const [chartConfig, setChartConfig] = useState(initialChartConfig);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (!isNaN(date)) {
        return date.toISOString().split("T")[0];
      } else {
        throw new Error("Invalid date");
      }
    } catch (error) {
      console.error(`Error formatting date: ${dateString}`, error);
      return null;
    }
  };

  const aggregateData = (data) => {
    const aggregated = {};

    data.data.forEach((event) => {
      const date = formatDate(event.serviceDate);
      if (date) {
        if (!aggregated[date]) {
          aggregated[date] = 0;
        }
        aggregated[date] += 1; // Increment the count for the date
      }
    });

    return aggregated;
  };

  const handleSearch = async () => {
    try {
      const { data } = await axiosInstance.get(`/eventManager/Filter/Between/`);
      if (data) {
        const aggregatedData = aggregateData(data);
        const dates = Object.keys(aggregatedData);
        const counts = Object.values(aggregatedData);

        setChartConfig((prevConfig) => ({
          ...prevConfig,
          series: [{ ...prevConfig.series[0], data: counts }],
          options: {
            ...prevConfig.options,
            xaxis: { ...prevConfig.options.xaxis, categories: dates },
          },
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  
  return (
    <Card className="w-4/6 ">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="pl-10 pt-3">
          <Typography
            variant="h6"
            color="black"
            className="text-2xl font-semibold"
          >
            Weekly Comparison Events 
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}
