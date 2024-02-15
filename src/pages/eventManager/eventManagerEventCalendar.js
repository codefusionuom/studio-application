import React from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
const EventManagerEventCalendar = () => {
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
      online: true,
      date: "23/04/18",
    },
    {
      name: "Alexa Liras",
      timeSlot: "8.00  AM",
      phoneNo: "045 2287456",
      org: "Developer",
      online: false,
      date: "23/04/18",
    },
    {
      name: "Laurent Perrier",
      timeSlot: "8.00  AM",
      phoneNo: "045 2287456",
      org: "Projects",
      online: false,
      date: "19/09/17",
    },
    {
      name: "Michael Levi",
      timeSlot: "8.00  AM",
      phoneNo: "045 2287456",
      org: "Developer",
      online: true,
      date: "24/12/08",
    },
    {
      name: "Richard Gran",
      timeSlot: "8.00  AM",
      phoneNo: "045 2287456",
      org: "Executive",
      online: false,
      date: "04/10/21",
    },
  ];
  return (
    <div>
      <Card className="h-full w-full p-4 pt-2">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none pt-4"
        >
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray" className="text-3xl">
                One Day Services
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
                (
                  { img, name, timeSlot, phoneNo, org, online, date },
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
                              variant="small"
                              color="blue-gray"
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
                      </td>
                      <td className={classes}>
                        <div className="w-[80px]  flex items-center font-bold">
                          <Chip
                            className="w-[80px] "
                            style={{
                              color: "black",
                              display: "flex",
                              justifyContent: "center",
                              background: online ? "#ffb300" : "#1dc560",
                            }}
                            variant="filled"
                            size="sm"
                            value={online ? "Active" : "offline"}
                            color={online ? "yellow" : "blue-gray"}
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

export default EventManagerEventCalendar;
