import { Button, Card, CardBody, CardFooter, CardHeader, Chip, IconButton, Spinner, Tooltip, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import NotificationCard from '../../components/cards/notificationCard';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import axios from "axios";
import ErrorDisplayWindow from '../../components/eventManager/errorDisplayWindow';
import { format } from 'date-fns';
import EditButton from '../../components/cards/buttons/EditButton';
import { useNavigate } from 'react-router-dom';

let todayEventsServiceTpes;

function EventManagerDashboard() {
  const [todayEvents, setTodayEvents] = useState([]);
  const [existError, setExistError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOneRequest = async (id) => {
    navigate(`/eventManager/createEventRequest/${id}`);
  };

  useEffect(() => {
    getTodayEvents();
  }, []);

  const getTodayEvents = () => {
    setLoading(true);
    axios.get('http://localhost:5000/eventManager/todayEvent')
      .then((response) => {
        setTodayEvents(response.data.todayEvents || []);
        console.log("response.data.todayEvents :", response.data.todayEvents );
      })
      .catch((error) => {
        setExistError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const TABLE_HEAD = ["Customer Name", "Service Type", "Phone Number", "Date", "Status", "Actions"];

  return (
    existError ? (
      <ErrorDisplayWindow errorMsg={existError} />
    ) : (
      <div>
        <div className="flex space-x-4">
          <NotificationCard title={"Event Requests"} notificationNumber={5} />
        </div>
        <div className='h-10'></div>
        <Card className="h-full w-full p-8">
          <CardHeader floated={false} shadow={false} className="rounded-none pt-4">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray" className="text-3xl">
                  Today's Events
                </Typography>
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-y-auto px-0">
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
                        {head}{" "}
                        {index !== TABLE_HEAD.length - 1 && (
                          <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                        )}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={TABLE_HEAD.length} className="text-center">
                      <div className="flex justify-center items-center h-full p-10">
                        <Spinner color="blue" className="h-12 w-12 mx-auto" />
                      </div>
                    </td>
                  </tr>
                ) : todayEvents.length === 0 ? (
                  <tr>
                    <td colSpan={TABLE_HEAD.length} className="text-center p-8">
                      <Typography variant="paragraph" className="text-center">
                        No events found for today.
                      </Typography>
                    </td>
                  </tr>
                ) : todayEvents.map((todaySingleEvent, index) => {
                  const isLast = index === todayEvents.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                  return (
                    <tr key={todaySingleEvent.id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="black"
                              className="font-normal"
                            >
                              {todaySingleEvent.customer?.firstname + " " + todaySingleEvent.customer?.lastname || 'N/A'}
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
                            {todaySingleEvent.service?.serviceName || 'N/A'}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {todaySingleEvent.customer?.mobilePhone || 'N/A'}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {format(new Date(todaySingleEvent.serviceDate), 'yyyy-MM-dd') || 'N/A'}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {todaySingleEvent.status || 'N/A'}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <EditButton onClick={() => handleOneRequest(todaySingleEvent.id)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    )
  );
}

export default EventManagerDashboard;
