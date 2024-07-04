import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
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
  PopoverContent,
  PopoverHandler,
  Popover,
} from "@material-tailwind/react";
import Datepicker from "../../components/datePicker/Datepicker";
import { Pagination } from "../../components/pagination/pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import { isAsyncThunkAction } from "@reduxjs/toolkit";
import { setActive } from "@material-tailwind/react/components/Tabs/TabsContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axios.config";
import { DayPicker } from "react-day-picker";

function PaymentList() {
  const [search, setSearch] = useState("");
  const [eventlist, setEventlist] = useState([]);
  const [active, setActive] = useState(1);
  const [numberofresults, setNumberofresults] = useState(0);
  const [payments, setPayments] = useState([]);
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  const handlePaymentDetails = async (id) => {
    navigate(`/customerManager/paymentDetails/${id}`);
  };
  
  const handleSearch = async (query) => {
    

    console.log("date", query);
    try {
      console.log("try");
      const { data } = await axiosInstance.get(
        `/customerManager/payment/?search=${search}&date=${date}&page=${active}&limit=8`
      );
      console.log(data);
      setNumberofresults(data.count);
      setPayments(data.rows);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    handleSearch();
    console.log("search");
  }, [active,search,date]);

  return (
    <Card className=" w-full border-2 ">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col items-center justify-start gap-4  md:flex-row ">

{/* <Datepicker/> */}
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

<div className="relative flex items-center gap-4 w-full max-w-[24rem] ">
            {/* <Input
              type="email"
              label="Email  || mobile"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-20"
              containerProps={{
                className: "min-w-0",
              }}
            /> */}
            <div className="">
Payment Date
            </div>
            <div className="">
                                        <Popover placement="bottom">
                                            <PopoverHandler>
                                                <Input
                                                    label="Select a Date"
                                                    onChange={() => null}
                                                    // value={date ? format(date, "PPP") : ""}
                                                    value={date ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` : ""}
                                                    // error={errorDate ? "true" : null}
                                                />
                                            </PopoverHandler>
                                            <PopoverContent>
                                                <DayPicker
                                                    mode="single"
                                                    selected={date}

                                                    onSelect={setDate}
                                                    showOutsideDays
                                                    className="border-0"
                                                    classNames={{
                                                        caption: "flex justify-center py-2 mb-4 relative items-center",
                                                        caption_label: "text-sm font-medium text-gray-900",
                                                        nav: "flex items-center",
                                                        nav_button:
                                                            "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                                                        nav_button_previous: "absolute left-1.5",
                                                        nav_button_next: "absolute right-1.5",
                                                        table: "w-full border-collapse",
                                                        head_row: "flex font-medium text-gray-900",
                                                        head_cell: "m-0.5 w-9 font-normal text-sm",
                                                        row: "flex w-full mt-2",
                                                        cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                                        day: "h-9 w-9 p-0 font-normal",
                                                        day_range_end: "day-range-end",
                                                        day_selected:
                                                            "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                                                        day_today: "rounded-md bg-gray-200 text-gray-900",
                                                        day_outside:
                                                            "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                                                        day_disabled: "text-gray-500 opacity-50",
                                                        day_hidden: "invisible",
                                                    }}
                                                    components={{
                                                        IconLeft: ({ ...props }) => (
                                                            <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                                                        ),
                                                        IconRight: ({ ...props }) => (
                                                            <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                                                        ),
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
            {/* <Button
              size="sm"
              color={search ? "gray" : "blue-gray"}
              disabled={!search}
              className="!absolute right-0 bottom-0 rounded"
              onClick={handleSearch}
            >
              <MagnifyingGlassIcon className="h-6 w-5" />
            </Button> */}
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
                    <tr key={id} className="cursor-pointer" onClick={() => handlePaymentDetails(id)}>
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
                            {event?.service.serviceName}
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
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {new Date(createdAt).getHours() +
                ":" +
                new Date(createdAt).getMinutes()}
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
  "Time"
];

