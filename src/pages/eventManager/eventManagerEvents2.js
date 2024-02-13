import React from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  IconButton,
  Tooltip,
  Select,
  Option,
  Input,
  PopoverContent,
  PopoverHandler,
  Popover,
  Button,
} from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { DayPicker } from "react-day-picker";
import CardEvent from "./cardEvent";
const EventManagerEvents2 = () => {
  const [date, setDate] = React.useState();
  const TABLE_HEAD = [
    "Customer Name",
    "Time-slot",
    "Phone Number",
    "Edit",
    "Status",
  ];

  const TABLE_ROWS = [
    {
      name: "John Michael",
      timeSlot: "8.00  AM",
      phoneNo: "045 2287456",
      org: "Organization",
      status: "Done",
      date: "23/04/18",
    },
    {
      name: "Alexa Liras",
      timeSlot: "8.00  AM",
      phoneNo: "045 2287456",
      org: "Developer",
      status: "Upcoming",
      date: "23/04/18",
    },
    {
      name: "Laurent Perrier",
      timeSlot: "8.00  AM",
      phoneNo: "045 2287456",
      org: "Projects",
      status: "Active",
      date: "19/09/17",
    },
    {
      name: "Michael Levi",
      timeSlot: "8.00  AM",
      phoneNo: "045 2287456",
      org: "Developer",
      status: "Desertion",
      date: "24/12/08",
    },
    {
      name: "Richard Gran",
      timeSlot: "8.00  AM",
      phoneNo: "045 2287456",
      org: "Executive",
      status: "Upcoming",
      date: "04/10/21",
    },
  ];
  return (
    <div>
      <div className="flex  justify-evenly items-center w-full h-[140px] bg-cl-4 rounded font-lato text-xl text-cl-1   p-4 pt-2">
        <Typography
          variant="paragraph"
          color="blue-gray"
          className="text-3xl mr-80 flex items-center   ml-0"
        >
          Event
        </Typography>

        <Typography
          variant="paragraph"
          color="blue-gray"
          className="text-3xl mr-80 flex items-center  "
        >
          WP-124
        </Typography>

        <Button className="flex items-center gap-3 " color="blue">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          Edit
        </Button>
      </div>
      <div className="h-8"></div>
      <div className="flex space-x-4 justify-between">
        <div className="flex justify-center items-center w-[314px] h-[140px] bg-cl-4 rounded font-lato text-xl text-cl-1 flex space-x-4 justify-evenly">
          <table>
          <tr>
              <td>
                
                  Customer 
              </td>
             
            </tr>
          <tr>
              <td>
                
                  Customer 
              </td>
              <td>
              Customer  
              </td>
            </tr>
          </table>
            
          
        </div>

        {/* <div className="flex justify-center items-center w-[314px] h-[140px] bg-cl-4 rounded font-lato text-xl text-cl-1">
         <Typography variant="h5" color="blue-gray" className="text-3xl">
              
              </Typography>
        </div> */}
        <div className="flex justify-center items-center w-[628px] h-[140px] bg-cl-4 rounded font-lato text-xl text-cl-1 ml-8 p-4">
          <div className="w-[261px] h-[46px]">
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
          <div className="relativew-[207.42px] h-[46px] ml-5">
            <Select
              label="Select Version"
              className="relative h-11 w-full min-w-[200px]"
            >
              <Option>Material Tailwind HTML</Option>
              <Option>Material Tailwind React</Option>
              <Option>Material Tailwind Vue</Option>
              <Option>Material Tailwind Angular</Option>
              <Option>Material Tailwind Svelte</Option>
            </Select>
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
                    {TABLE_ROWS.map((rowdata) => (
                      <div
                        key={rowdata.id}
                        className=" flex items-center font-bold  px-7 "
                      >
                        <Chip
                          className="w-fit h-9"
                          style={{
                            color: "black",
                            display: "flex",
                            justifyContent: "center",
                            // background: status ? "#0f9ae8" : "red",
                          }}
                          variant="filled"
                          size="sm"
                          value={(function () {
                            switch (rowdata.status) {
                              case "Active":
                                return "Active";
                              case "Desertion":
                                return "Desertion";
                              case "Done":
                                return "Done";
                              case "Upcoming":
                                return "Upcoming";
                              default:
                                return "nothing";
                            }
                          })()}
                          color={(function () {
                            switch (rowdata.status) {
                              case "Active":
                                return "blue";
                              case "Upcoming":
                                return "green";
                              case "Desertion":
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
                    ))}
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
              {TABLE_ROWS.map(
                (
                  { img, name, timeSlot, phoneNo, org, status, date },
                  index
                ) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={name}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="paragraph"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {name}
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
                            {timeSlot}
                          </Typography>
                        </div>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="paragraph"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {phoneNo}
                        </Typography>
                      </td>
                      <td className={classes}></td>
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
                              switch (status) {
                                case "Active":
                                  return "Active";
                                case "Desertion":
                                  return "Desertion";
                                case "Done":
                                  return "Done";
                                case "Upcoming":
                                  return "Upcoming";
                                default:
                                  return "nothing";
                              }
                            })()}
                            color={(function () {
                              switch (status) {
                                case "Active":
                                  return "blue";
                                case "Upcoming":
                                  return "green";
                                case "Desertion":
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
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};

export default EventManagerEvents2;
