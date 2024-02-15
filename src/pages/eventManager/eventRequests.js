import React from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  Input,
  IconButton,
  Button,
  CardFooter,
  Option,
  Select,
} from "@material-tailwind/react";
import CardEvent from "./cardEvent";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

const TABLE_HEAD = [
  "Customer Name",
  "Service Type",
  "Phone Number",
  "Email",
  "City",
  "Status",
];

const TABLE_ROWS = [
  {
    name: "John Michael",
    timeSlot: "8.00  AM",
    phoneNo: "045 2287456",
    email: "marvin@gmail.com",
    org: "Organization",
    online: true,
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    timeSlot: "8.00  AM",
    phoneNo: "045 2287456",
    email: "marvin@gmail.com",
    org: "Developer",
    online: false,
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    timeSlot: "8.00  AM",
    phoneNo: "045 2287456",
    email: "marvin@gmail.com",
    org: "Projects",
    online: false,
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    timeSlot: "8.00  AM",
    phoneNo: "045 2287456",
    email: "marvin@gmail.com",
    org: "Developer",
    online: true,
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    timeSlot: "8.00  AM",
    phoneNo: "045 2287456",
    email: "marvin@gmail.com",
    org: "Executive",
    online: false,
    date: "04/10/21",
  },
];
const EventRequests = () => {
  return (
    <div className="">
      <div className="flex space-x-4 justify-between">
        <CardEvent
          title={
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 inline-block mr-2  font-bold"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Create Event
            </>
          }
        />

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
          <Select label="Select Version" className="relative h-11 w-full min-w-[200px]"> 
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
      <Card className="h-full w-full p-4 pt-0.5">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none pt-4"
        >
          <div className="mb-1 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray" className="text-3xl">
                Event Requests
              </Typography>
            </div>
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
                ({ name, timeSlot, phoneNo, org, online, email }, index) => {
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
                              variant="small"
                              color="black"
                              className="font-normal"
                            >
                              {name}
                            </Typography>
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
                            {timeSlot}
                          </Typography>
                        </div>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {phoneNo}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {email}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {phoneNo}
                        </Typography>
                      </td>
                      {/* <td className={classes}>
                        <Tooltip content="Edit User">
                          <IconButton variant="text">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2.5}
                              stroke="currentColor"
                              className="w-8 h-8"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                              />
                            </svg>
                          </IconButton>
                        </Tooltip>
                      </td> */}
                      <td className={classes}>
                        <div className="w-[80px]  flex items-center font-bold">
                          <Chip
                            className="w-[80px] "
                            style={{
                              color: "black",
                              display: "flex",
                              justifyContent: "center",
                              background: online ? "#0f9ae8" : "#1dc560",
                            }}
                            // style={{
                            //   color: "black",
                            //   display: "flex",
                            //   justifyContent: "center",
                            //   background: online ? "#ffb300" : "#1dc560",
                            // }}
                            variant="filled"
                            size="sm"
                            value={online ? "Active" : "offline"}
                            color={online ? "yellow" : "btn-success"}
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
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 pt-0">
          <Typography variant="small" color="#b5b7c0" className="font-normal">
            Showing data 1 to 6 of 25 entries
          </Typography>
          <div className="flex items-center justify-end border-t border-blue-gray-50 p-4">
            <Button variant="outlined" size="sm">
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
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </Button>
            <div className="flex items-center gap-2 p-2">
              <IconButton variant="outlined" size="sm">
                1
              </IconButton>
              <IconButton variant="text" size="sm">
                2
              </IconButton>
              <IconButton variant="text" size="sm">
                3
              </IconButton>
              <IconButton variant="text" size="sm">
                ...
              </IconButton>
              <IconButton variant="text" size="sm">
                8
              </IconButton>
              <IconButton variant="text" size="sm">
                9
              </IconButton>
              <IconButton variant="text" size="sm">
                10
              </IconButton>
            </div>
            <Button variant="outlined" size="sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EventRequests;
