import {    Button, Card, CardBody , CardFooter, CardHeader, Chip, IconButton,  Spinner,  Tooltip, Typography ,} from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import NotificationCard from '../../components/cards/notificationCard'
import CardEvent from '../../components/eventManager/cardEvent'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import axios from "axios";
import ErrorDisplayWindow from '../../components/eventManager/errorDisplayWindow';


let todayEventsServiceTpes ;

function EventManagerDashboard() {
  const [todayEvents, setTodayEvents] = useState([]);
  const [existError, setExistError] = useState(null);
  useEffect(() =>{
    
    getTodayEvents();
  } ,[])
  
  
  const getTodayEvents = () =>{
    console.log("getTodayEvents call");
    axios.get('http://localhost:5000/eventManager/todayEvent' ).then( (response) => {
      console.log(response);
      setTodayEvents(response.data.todayEvents);
      console.log("today events :", todayEvents);
      
    }).catch( (error) => {
      setExistError(error.message);
    })
  }
  const TABLE_HEAD = ["Custermer Name", "Service Type", "Phone Number", "Status"];
       
    
  return (existError != null ? (
    <ErrorDisplayWindow errorMsg={existError} />
  ) :
  <div>
    <div className="flex space-x-4">
   
   <NotificationCard title={" Event Requests"} notificationNumber={5}/>


   
    </div>
    <div className='h-10'></div>
    <Card className="h-full w-full  p-8">
    <CardHeader floated={false} shadow={false} className="rounded-none pt-4">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray" className="text-3xl">
              Today's Events
            </Typography>
           
          </div>
    
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr >
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
            {todayEvents.length  == 0 ? (
                <tr>
                  <td colSpan={TABLE_HEAD.length} className="text-center">
                    <div className="flex justify-center items-center h-full p-10">
                      <Spinner
                       color="blue" className="h-12 w-12 mx-auto" />
                    </div>
                  </td>
                </tr>
              ) :todayEvents.map(
              ( todaySingleEvent, index) => {
                
                const isLast = index === todayEvents.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                // {todayEvents.map(( todayEvent) =>{})}
                return (
                  <tr 
                  // key={name}
                  >
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                       
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {/* {name} */}
                            {todaySingleEvent.serviceType}
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
                          {todaySingleEvent.date.slice(0, 10)}
                        </Typography>
                       
                      </div>
                    </td>
                   
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {/* {phoneNo} */}
                        {todaySingleEvent.status}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-[80px]  flex items-center font-bold">
                        <Chip 
                        className="w-[80px] "
                        style={{ color: 'black' ,display: 'flex' , justifyContent: 'center'  }}
                          variant="filled"
                          size="sm"
                          value={todaySingleEvent.status == "Active" ? "Active" : "offline"}
                          color={todaySingleEvent.status == "Active"? "blue" : "blue-gray"}
                          fontWeight="bold"
                        />
                      </div>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      
    </Card>
    </div>
  )
}

export default EventManagerDashboard