import React, { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  Input,
  PopoverContent,
  PopoverHandler,
  Popover,
  Button,
} from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import { DayPicker } from "react-day-picker";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorDisplayWindow from "../../components/eventManager/errorDisplayWindow";



const EventManagerEvents = () => {
  const [date, setDate] = useState();
  let [eventList, setEventList] = useState([]);
  let [selectedDateEventList, setselectedDateEventList] = useState([]);
  const [existError, setExistError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log('date----:' + date)
    console.log("use effect");
    getEvents();
  }, []);
  const TABLE_HEAD = [
    "Customer Name",
    "service Type",
    "date",
    "Mobile No",
    "status",
  ];
  // const statusTypes = ["Active", "Paused", "Upcoming", "Done", "Offline"];
  const statusTypes = ["Upcoming","Paused",  "Done"];
  // const statusTypes = ["Upcoming","Paused",  "Done"];
  
  const getEvents = () => {
    console.log("kkkkkkkkkkkkkkkkkkkk");
    const response = axios
    .get("http://localhost:5000/eventManager/all-events")
    .then((res) => {
      const events = res.data.events;
      console.log("events: ", events);
      console.log("custormer name :" + events[0].customer.firstname);
        setEventList(events);
    })
    .catch((error) => {
      setExistError(error.message);
      console.log(error);
    });
    // console.log("response: ", response);
    // console.log(response.events);
  };
  // if (date == null) {
  //   getEvents();
  // }
  const getSelectedDayEvents = (date) => {
    console.log("kkkkkkkkkkkkkkkkkkkk");
    axios
      .post("http://localhost:5000/eventManager/selectedDayEvents", {
        date: date,
      })
      .then((res) => {
        // const events = res.data.events;
        // console.log("event 0: " , events[0]);
        // setEventList(res.data)

        console.log(res.data.todayEvents);
        // setselectedDateEventList(res.data.todayEvents)
        setEventList(res.data.todayEvents);
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log("response: ", response);
    // console.log(response.events);
  };
  const clearDateFilter = () => {
    // console.log('date----:' + date)
    setDate(null)
    getEvents()
  }

  return existError != null ? (
    <ErrorDisplayWindow errorMsg={existError} />
  ) : (
    <div>
      <div className="flex  justify-between items-center w-full h-[140px] bg-cl-4 rounded font-lato text-xl text-cl-1   p-4 pt-2">
        <Typography
          variant="h5"
          color="blue-gray"
          className="text-3xl mr-80 flex items-center p-4"
        >
          Event
        </Typography>
        {/* <IconButton
          onClick={(e) => {
            // console.log("eveent list :" , eventList);
            console.log("date :", date);
            getSelectedDayEvents();
          }}
        >
          click
        </IconButton> */}

        <div className="flex  space-x-4 justify-evenly">
          <div className="w-1/2 h-[46px]">
            <Input
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              }
              label="Search"
            />
          </div>
          <div className="flex-col">
            <Popover placement="bottom">
              <PopoverHandler>
                <Input
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 mr-2 text-blue-gray" // Adjust the styling as needed
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                      />
                    </svg>
                  }
                  className=" "
                  label="Sort by : Date"
                  onChange={(e) => {
                    setDate(date);
                    // console.log(date);
                  }}
                  value={
                    date
                      ? `${date.getDate()}/${
                          date.getMonth() + 1
                        }/${date.getFullYear()}`
                      : ""
                  }
                />
              </PopoverHandler>
              <PopoverContent>
                <DayPicker
                  mode="single"
                  selected={date}
                  // onSelect={setDate}
                  onSelect={(selectedDate) => {
                    //tttttttttttttttttttttt
                    setDate(selectedDate);
                    console.log(selectedDate);
                    // Call your function here
                    getSelectedDayEvents(selectedDate);
                    console.log("Updated eventList :", eventList);
                    // setEventList()
                  }}
                  showOutsideDays
                  className="border-0"
                  classNames={{
                    caption:
                      "flex justify-center py-2 mb-4 relative items-center",
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
                      <ChevronLeftIcon
                        {...props}
                        className="h-4 w-4 stroke-2"
                      />
                    ),
                    IconRight: ({ ...props }) => (
                      <ChevronRightIcon
                        {...props}
                        className="h-4 w-4 stroke-2"
                      />
                    ),
                  }}
                />
              </PopoverContent>
            </Popover>
            {/* <Button variant="outlined" className="flex rounded-full justify-end" size="sm" onClick={clearDateFilter}>Clear</Button> */}
          </div>
        </div>
      </div>
      <div className="h-8"></div>

      <Card className="h-full w-full p-4 pt-2">
        <CardHeader floated={false} shadow={false} className="rounded-none ">
          <div className="mb-8 flex items-center justify-between gap-8">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <tr className="flex justify-between">
                <td>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="text-3xl flex justify-center items-center  "
                  >
                    Event
                  </Typography>
                </td>
                <td>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="text-3xl flex "
                  >
                    <div className=" flex items-center font-bold  px-7  ">
                      {statusTypes.map((statusT) => (
                        <Chip
                          className="w-fit h-9 mx-5 px-6"
                          style={{
                            color: "black",
                            display: "flex",
                            justifyContent: "center",
                            // background: status ? "#0f9ae8" : "red",
                          }}
                          variant="filled" //up status
                          size="sm"
                          value={(function () {
                            switch (statusT) {
                              case "Active":
                                return "Active";
                              case "Paused":
                                return "Paused";
                              case "Done":
                                return "Done";
                              case "Upcoming":
                                return "Upcoming";
                              case "Offline":
                                return "Offline";
                              default:
                                return "nothing";
                            }
                          })()}
                          color={(function () {
                            switch (statusT) {
                              case "Active":
                                return "blue";
                              case "Upcoming":
                                return "green";
                              case "Paused":
                                return "red";
                              case "Done":
                                return "amber";
                              default:
                                return "red";
                            }
                          })()}
                          fontWeight="bold"
                        />
                      ))}
                    </div>
                  </Typography>
                </td>
              </tr>
            </table>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {eventList.length == 0 ? (
                <tr>
                  <td colSpan={TABLE_HEAD.length} className="text-center">
                    <div className="flex justify-center items-center h-full p-10">
                      <div className="max-w-full animate-pulse">
                        <Typography
                          as="div"
                          variant="h1"
                          className="mb-4 h-3 w-56 rounded-full bg-gray-300"
                        >
                          &nbsp;
                        </Typography>
                        <Typography
                          as="div"
                          variant="paragraph"
                          className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                        >
                          &nbsp;
                        </Typography>
                        <Typography
                          as="div"
                          variant="paragraph"
                          className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                        >
                          &nbsp;
                        </Typography>
                        <Typography
                          as="div"
                          variant="paragraph"
                          className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                        >
                          &nbsp;
                        </Typography>
                        <Typography
                          as="div"
                          variant="paragraph"
                          className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                        >
                          &nbsp;
                        </Typography>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                eventList.map((oneEvent, index) => {
                  const isLast = index === eventList.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    // <Link to={{ pathname: "/eventManager/eventDetails", state: { oneEvent } }}>
                    <tr
                      key={oneEvent.eventId}
                      onClick={() =>
                        navigate("/eventManager/eventDetails", {
                          state: { eventId: oneEvent.eventId },
                        })
                      }
                    >
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="paragraph"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {oneEvent.customer.firstname +
                                " " +
                                oneEvent.customer.lastname}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="paragraph"
                              color="blue-gray"
                              className="font-bold"
                            >
                            {oneEvent.service['serviceName']}

                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="paragraph"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {oneEvent.serviceDate?.slice(0, 10)}
                          </Typography>
                        </div>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="paragraph"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {oneEvent.customer.mobilePhone}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="w-[80px]  flex items-center font-bold">
                          <Chip
                            className="w-[80px] "
                            style={{
                              color: "black",
                              display: "flex",
                              justifyContent: "center",
                              // background: status ? "#0f9ae8" : "red",
                            }}
                            variant="filled"
                            size="sm"
                            value={(function () {
                              switch (oneEvent.status) {
                                case "Active":
                                  return "Active";
                                case "Paused":
                                  return "Paused";
                                case "Done":
                                  return "Done";
                                case "Upcoming":
                                  return "Upcoming";
                                default:
                                  return "nothing";
                              }
                            })()}
                            color={(function () {
                              switch (oneEvent.status) {
                                case "Active":
                                  return "blue";
                                case "Upcoming":
                                  return "green";
                                case "Paused":
                                  return "red";
                                case "Done":
                                  return "amber";

                                default:
                                  return "red";
                              }
                            })()}
                            fontWeight="bold"
                          />
                        </div>
                      </td>
                    </tr>
                    // </Link>
                  );
                })
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};

export default EventManagerEvents;
