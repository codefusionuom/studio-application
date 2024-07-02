import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayGridPlugin from "@fullcalendar/daygrid";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  IconButton,
  Tooltip,
  Spinner,
} from "@material-tailwind/react";
import FullCalendar from "@fullcalendar/react";
import ErrorDisplayWindow from "../../components/eventManager/errorDisplayWindow";
import { format } from "date-fns";

const EventManagerEventCalendar = () => {
  const navigate = useNavigate();
  const [oneDayEvents, setOneDayEvents] = useState([]);
  let [eventList, setEventList] = useState([]);
  const [existError, setExistError] = useState(null);

  const getOneDayEvents = () => {
    // axios.get('http://localhost:5000/eventManager/getOnedayEvents')
    axios.get('http://localhost:5000/eventManager/all-events')
      .then(response => {
        console.log("oneday events ", response.data.oneDayEvents);
        // setOneDayEvents(response.data.oneDayEvents);
        setOneDayEvents(response.data.events);
      })
      .catch(error => {
        setExistError(error.message);
      })
  }

  const getEvents = () => {
    axios.get("http://localhost:5000/eventManager/all-events")
      .then(res => {
        const events = res.data.events;
        console.log("events :" , events)
        setEventList(events);
      })
      .catch(error => {
        setExistError(error.message);
      });
  };

  useEffect(() => {
    getOneDayEvents();
    getEvents();
  }, []);

  const events = eventList.map(event => (
    {
      title: event.service['serviceName'],
      id: event.eventId,
      start: format(new Date(event.serviceDate), 'yyyy-MM-dd'),
      end: format(new Date(event.serviceDate), 'yyyy-MM-dd'),
      backgroundColor: "#2874A6",
      borderColor: "#2874A6"
    }
  ));

 

  const TABLE_HEAD = [
    "Customer Name",
    "Date assigned",
    "No of Employees",
    "Edit",
    "Status",
  ];

  return existError != null ? (
    <ErrorDisplayWindow errorMsg={existError} />
  ) : (
    <div>
      <Card className="p-8">
        <FullCalendar
          defaultView="dayGridMonth"
          header={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          eventClick={ function(info) {
            // alert('Event: ' + info.event.id);
          
            navigate("/eventManager/eventDetails", {
              state: { eventId: info.event.id },
            })
            // change the border color just for fun
            info.el.style.borderColor = 'red';
          }}
          plugins={[dayGridPlugin]}
          events={events}
          displayEventEnd="true"
          contentHeight="900px"
          borderColor="green"
          eventColor={"green"}
        />
      </Card>
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
              {oneDayEvents.length === 0 ? (
                <tr>
                  <td colSpan={TABLE_HEAD.length} className="text-center">
                    <div className="flex justify-center items-center h-full p-10">
                      <Spinner color="blue" className="h-12 w-12 mx-auto" />
                    </div>
                  </td>
                </tr>
              ) : oneDayEvents.map((oneDayEvent, index) => {
                const isLast = index === oneDayEvents.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {oneDayEvent.service['serviceName']}
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
                          {oneDayEvent.date?.slice(0, 10)}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        6
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
                      <div className="w-[80px] flex items-center font-bold">
                        <Chip
                          className="w-[80px]"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                          variant="gradient"
                          size="sm"
                          value={oneDayEvent.status === "Active" ? "Active" : "Offline"}
                          color={oneDayEvent.status === "Active" ? "yellow" : "gray"}
                          fontWeight="bold"
                          fontColor="white"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};

export default EventManagerEventCalendar;
