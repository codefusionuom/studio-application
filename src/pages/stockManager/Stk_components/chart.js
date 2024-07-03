import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Input,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";

const chartConfig = {
  type: "bar",
  height: 240,
  series: [
    {
      name: "Stock",
      data: [100, 40, 300, 320, 500, 350, 200, 230, 500],
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
    colors: ["#21179F"],
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
          colors: "#21179F",
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
      theme: "blue",
    },
  },
};

function ChartStk() {
  return (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center justify-between"
      >
        <div className=" flex flex-col gap-10 justify-between">
          <Typography variant="h4" color="blue-gray" className=" text-center">
            Stock Summary
          </Typography>
          <Input label="Select Month" size="md" type="date" />
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
      <CardFooter>
        <div className=" flex float-right">
          <Button className=" bg-blue-900 w-fit ">Summary Report</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
export default ChartStk;
