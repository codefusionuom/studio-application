import {    Button, Card, CardBody , CardFooter, CardHeader, Chip, IconButton,  Tooltip, Typography ,} from '@material-tailwind/react'
import React from 'react'
import NotificationCard from '../../components/cards/notificationCard'
import CardEvent from './cardEvent'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';

function EventManagerDashboard() {
   
       
      const TABLE_HEAD = ["Custermer Name", "Service Type", "Phone Number", "Status"];
       
      const TABLE_ROWS = [
        {
          name: "John Michael",
          serviceType: "Mug printing",
          job: "Manager",
          org: "Organization",
          online: true,
          phoneNo: "0775588693",
        },
        {
          name: "Alexa Liras",
          serviceType: "Birthday shoot",
          job: "Programator",
          org: "Developer",
          online: true,
          phoneNo: "0775588693",
        },
        {
          name: "Laurent Perrier",
          serviceType: "Mug printing",
          job: "Executive",
          org: "Projects",
          online: true,
          phoneNo: "0775588693",
        },
        {
          name: "Michael Levi",
          serviceType: "Mug printing",
          job: "Programator",
          org: "Developer",
          online: true,
          phoneNo: "0775588693",
        },
        {
          name: "Richard Gran",
          serviceType: "Mug printing",
          job: "Manager",
          org: "Executive",
          online: true,
          phoneNo: "0775588693",
        },
      ];
  return (
  <div>
    <div className="flex space-x-4">
   
   <NotificationCard title={" Event Requests"} notificationNumber={5}/>2
   <CardEvent title={"Add new Event"}/>
   <CardEvent title={"Add new Event"}/>



   
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
            {TABLE_ROWS.map(
              ({ name, serviceType, job, org, online, phoneNo }, index) => {
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
                          {serviceType}
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
                      <div className="w-[80px]  flex items-center font-bold">
                        <Chip 
                        className="w-[80px] "
                        style={{ color: 'black' ,display: 'flex' , justifyContent: 'center'  }}
                          variant="filled"
                          size="sm"
                          value={online ? "Active" : "offline"}
                          color={online ? "blue" : "blue-gray"}
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