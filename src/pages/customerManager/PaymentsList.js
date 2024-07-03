import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Select,
  Option,
} from "@material-tailwind/react";
import Datepicker from "../../components/datePicker/Datepicker";
import { Pagination } from "../../components/pagination/pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import { isAsyncThunkAction } from "@reduxjs/toolkit";
import { setActive } from "@material-tailwind/react/components/Tabs/TabsContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axios.config";

function PaymentList() {
  const [search, setSearch] = useState("");
  const [eventlist, setEventlist] = useState([]);
  const [active, setActive] = useState(1);
  const [numberofresults, setNumberofresults] = useState(0);
  const [payments, setPayments] = useState([]);
  const [date, setDate] = useState();

  const navigate = useNavigate();

  const handlePaymentDetails = async (id) => {
    navigate(`/customerManager/paymentDetails/${id}`);
  };
  
  const handleSearch = async (query) => {
    

    // console.log("date", query);
    try {
      // console.log("try");
      const { data } = await axiosInstance.get(
        `/customerManager/payment/?search=${search}&date=${date}&page=${active}&limit=8`
      );
      // console.log(data);
      setNumberofresults(data.count);
      setPayments(data.rows);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    handleSearch();
    // console.log("search");
  }, [active]);

  return (
    <Card className=" w-full border-2 ">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col items-center justify-start gap-4  md:flex-row ">

<Datepicker/>
          {/* <div className="relative flex w-full max-w-[24rem] "> */}
            {/* <Input
              type="email"
              label="Email  || mobile"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-20"
              containerProps={{
                className: "min-w-0",
              }}
            />
            <Button
              size="sm"
              color={search ? "gray" : "blue-gray"}
              disabled={!search}
              className="!absolute right-0 bottom-0 rounded"
              onClick={handleSearch}
            >
              <MagnifyingGlassIcon className="h-6 w-5" />
            </Button> */}

<div className="relative flex w-full max-w-[24rem] ">
            <Input
              type="email"
              label="Email  || mobile"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-20"
              containerProps={{
                className: "min-w-0",
              }}
            />
            <Button
              size="sm"
              color={search ? "gray" : "blue-gray"}
              disabled={!search}
              className="!absolute right-0 bottom-0 rounded"
              onClick={handleSearch}
            >
              <MagnifyingGlassIcon className="h-6 w-5" />
            </Button>
          </div>
       
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
         
            {payments.length > 0 ? (
              payments.map(
                (
                  { id, amount, status, payment, customerName,event,customerMobilePhone, createdAt },
                  index
                ) => {
                  const isLast = index === payments.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return ( <tbody>
                    <tr key={id} onClick={() => handlePaymentDetails(id)}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {customerName}
                            </Typography>
                            {/* <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {customer.email && customer.email}
                            </Typography> */}
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {event?.serviceType}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {customerMobilePhone}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {status}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {amount}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {payment}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {new Date(createdAt).getFullYear() +
                              "-" +
                              (new Date(createdAt).getMonth() + 1) +
                              "-" +
                              new Date(createdAt).getDate()}
                          </Typography>
                        </div>
                      </td>
                      {/* <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    variant="ghost"
                                                    size="sm"
                                                    value={online ? "online" : "offline"}
                                                    color={online ? "green" : "blue-gray"}
                                                />
                                            </div>
                                        </td> */}
                      {/* <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {date}
                                            </Typography>
                                        </td> */}
                      {/* edit button */}
                      {/* <td className={classes}>
                                            <Tooltip content="Edit User">
                                                <IconButton variant="text">
                                                    <PencilIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                        </td> */}
                    </tr>
                    </tbody>
                  );
                }
              )
            ) : (
              <tr className=" flex flex-col w-full h-32 animate-pulse justify-center items-center ">
               
              </tr>
            )}
       
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography>{numberofresults} results</Typography>
        <div className="flex gap-2">
          <Pagination active={active} setActive={setActive} />
        </div>
      </CardFooter>
    </Card>
  );
}
export default PaymentList;

// const TABS = [
//     {
//         label: "All",
//         value: "all",
//     },
//     {
//         label: "Monitored",
//         value: "monitored",
//     },
//     {
//         label: "Unmonitored",
//         value: "unmonitored",
//     },
// ];

const TABLE_HEAD = [
  "Customer Name",
  "Service Type",
  "Mobile Phone",
  "Status",
  "Amount",
  "Payment",
  "Date",
];

