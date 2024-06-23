import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from "@fullcalendar/daygrid";
import React, { useState } from 'react'
import Timeline from 'react-calendar-timeline/lib/lib/Timeline';
import moment from 'moment';
import 'react-calendar-timeline/lib/Timeline.css'
import { Card, CardHeader, Input, Typography, Button, CardBody, Chip, CardFooter, Tabs, TabsHeader, Tab, Avatar, IconButton, Tooltip, Select, Option, } from "@material-tailwind/react";
import { MagnifyingGlassIcon, PencilIcon } from '@heroicons/react/24/outline';
import axiosInstance from '../../config/axios.config';

// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";
// import EventCalendar from 'react-event-calendar'


////service
const categoriesData = {
    label: 'search me',
    value: 'searchme',
    children: [
      {
        label: 'search me too',
        value: 'searchmetoo',
        children: [
          {
            label: 'No one can get me',
            value: 'anonymous',
          },
        ],
      },
    ],
  }
  //////service
function EventCalandar() {
    /////////service
    const [service, setService] = useState();
    const [extraFeild, setExtraFeild] = useState({label:""});
    const [form, setForm] = useState();
    const [categories, setCategories] = useState(categoriesData);


    const {label}=extraFeild
    const handleSearch = async () => {
      try {
        console.log("try customer service");
        const { data } = await axiosInstance.get(
          `/customerManager/customerService/16`
        );
  
        console.log(data);
        setService(data);
      } catch (error) {
        console.log(error);
      }
    };
  const handleSubmit=()=>{
      console.log(form);
  }
  
  const handleExtraFeild=()=>{
  // setForm({...form,[i]:e.target.value})}
  // setForm({...form,[extraFeild.label]:extraFeild.data})
  setService((prevService) => {
      return {
          ...prevService,
          inputFields: [...prevService.inputFields, extraFeild.label]
      };
  });
  setExtraFeild({label:""})
  }
  
  const clearExtraFeild=()=>{
      console.log("clear");
      setExtraFeild({label:""})
  }
    /////service
  return (
    <div className='bg-cl-4 rounded py-10 px-20 flex flex-col gap-20'>
      <FullCalendar className=""
        defaultView="dayGridMonth"
        themeSystem="Simplex"
        header={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        plugins={[dayGridPlugin]}
        events={events}
        displayEventEnd="true"
        contentHeight= "900px"
        borderColor="red"

        eventColor={"red"}
      />
      {/* <Timeline  className="w-[1000px]" 
       groups={groups}
      items={items}
      defaultTimeStart={moment().add(-8, 'hour')}
      defaultTimeEnd={moment().add(8, 'hour')}/> */}
    

    <Card className=" w-full border-2 ">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="flex flex-col items-center justify-between gap-4  md:flex-row ">
                    
                    <div className=" flex p-4 gap-6">
                        <Select size="lg" label="Select By: Event Id" className="z-10">
                            <Option>Material Tailwind HTML</Option>
                            <Option>Material Tailwind React</Option>
                            <Option>Material Tailwind Vue</Option>
                            <Option>Material Tailwind Angular</Option>
                            <Option>Material Tailwind Svelte</Option>
                        </Select>

                        <Input size="lg"
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        />
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
                    <tbody>
                        {TABLE_ROWS.map(
                            ({ img, name, email, job, org, online, date }, index) => {
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
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70"
                                                    >
                                                        {email}
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
                                                    {job}
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal opacity-70"
                                                >
                                                    {org}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    variant="ghost"
                                                    size="sm"
                                                    value={online ? "online" : "offline"}
                                                    color={online ? "green" : "blue-gray"}
                                                />
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {date}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Tooltip content="Edit User">
                                                <IconButton variant="text">
                                                    <PencilIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            </CardBody>
           
        </Card>
        {/* service */}
        <div
        className="bg-btn-info px-2 py-2 flex justify-center w-60 text-cl-4 text-lg rounded border-2 border-white"
        onClick={handleSearch}
      >
        Customer service
      </div>
      <div className="my-10">{service && service.serviceName}</div>
      <div>
        {service &&
          service.inputFields.map((i) => {
            console.log(i);
            return (
                <div className="flex flex-col gap-6 my-4">
                <Typography className="-mb-2" variant="h6">
              {i}
            </Typography>
                <Input label={i} name={i} onChange={(e)=>{setForm({...form,[i]:e.target.value})}}/>
                </div>
            )
          })}
      </div>
      <div>
      {service && service.selectFields.map((item) => {
                const fieldName = Object.keys(item)[0]; // Get the field name (e.g., 'day' or 'paymentType')
                const options = item[fieldName]; // Get the array of options for the field
                return (
                    <div className="flex flex-col gap-6 my-4">
                        <Typography className="-mb-2" variant="h6">
                            {fieldName}
                        </Typography>
                        <Select defaultValue={"select"+fieldName} style={{ width: 200 }} onChange={(value) => setForm({ ...form, [fieldName]: value })}>
                            {options.map((option) => (
                                <Option key={option} value={option}>{option}</Option>
                            ))}
                        </Select>
                    </div>
                )
            })}
      </div>
      <div>
      <div className="flex flex-col gap-6 my-4">
                <Typography className="-mb-2" variant="h6">
              Label
            </Typography>
                <Input label={"Label"} name={"Label"} value={label} onChange={(e)=>{setExtraFeild({...extraFeild,label:e.target.value})}}/>
                </div>
                <div className="flex flex-col gap-6 my-4">
                </div>
      </div>
      <div className="flex justify-center text-2xl bg-blue-gray-600 p-2 rounded w-40 m-6 text-black"
      onClick={handleExtraFeild}
      >
        Add +
      </div>
      <div className="flex justify-center text-2xl bg-blue-gray-600 p-2 rounded w-40 m-6 text-black"
      onClick={clearExtraFeild}
      >
        Clear +
      </div>
      <div onClick={handleSubmit} className="bg-btn-success rounded p-2 w-40 flex justify-center text-white">Submit</div>
      {/* service */}
    </div>

    
  )
}


const groups = [{ id: 1, title: 'group 1' }, { id: 2, title: 'group 2' }]

const items = [
  {
    id: 1,
    group: 1,
    title: 'item 1',
    start_time: moment(),
    end_time: moment().add(1, 'hour')
  },
  {
    id: 2,
    group: 2,
    title: 'item 2',
    start_time: moment().add(-0.5, 'hour'),
    end_time: moment().add(0.5, 'hour')
  },
  {
    id: 3,
    group: 1,
    title: 'item 3',
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour')
  }
]

const events = [
  { title: "All Day Event", start: getDate("YEAR-MONTH-01") },
  {
    title: "Long Event",
    start: getDate("YEAR-MONTH-07"),
    end: getDate("YEAR-MONTH-10"),
    backgroundColor: "pink",
    borderColor:"pink"
  },
  {
    groupId: "999",
    title: "Repeating Event",
    start: getDate("YEAR-MONTH-09T16:00:00+00:00"),
    
  },
  // {
  //   groupId: "999",
  //   title: "Repeating Event",
  //   start: getDate("YEAR-MONTH-16T16:00:00+00:00")
  // },
  {
    title: "Conference",
    start: getDate("YEAR-MONTH-17"),
    end: getDate("YEAR-MONTH-19")
  },
  {
    title: "Meeting",
    start: getDate("YEAR-MONTH-18T10:30:00+00:00"),
    end: getDate("YEAR-MONTH-18T12:30:00+00:00")
  },
  // { title: "Lunch", start: getDate("YEAR-MONTH-18T12:00:00+00:00") },
  // { title: "Birthday Party", start: getDate("YEAR-MONTH-19T07:00:00+00:00") },
  // { title: "Meeting", start: getDate("YEAR-MONTH-18T14:30:00+00:00") },
  // { title: "Happy Hour", start: getDate("YEAR-MONTH-18T17:30:00+00:00") },
  //{ title: "Dinner", start: getDate("YEAR-MONTH-18T20:00:00+00:00") }
];

function getDate(dayString) {
  const today = new Date();
  const year = today.getFullYear().toString();
  let month = (today.getMonth() + 1).toString();

  if (month.length === 1) {
    month = "0" + month;
  }

  return dayString.replace("YEAR", year).replace("MONTH", month);
}

export default EventCalandar



const TABLE_HEAD = ["Member", "Function", "Status", "Employed", "Edit"];

const TABLE_ROWS = [
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
        name: "John Michael",
        email: "john@creative-tim.com",
        job: "Manager",
        org: "Organization",
        online: true,
        date: "23/04/18",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
        name: "Alexa Liras",
        email: "alexa@creative-tim.com",
        job: "Programator",
        org: "Developer",
        online: false,
        date: "23/04/18",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
        name: "Laurent Perrier",
        email: "laurent@creative-tim.com",
        job: "Executive",
        org: "Projects",
        online: false,
        date: "19/09/17",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
        name: "Michael Levi",
        email: "michael@creative-tim.com",
        job: "Programator",
        org: "Developer",
        online: true,
        date: "24/12/08",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
        name: "Richard Gran",
        email: "richard@creative-tim.com",
        job: "Manager",
        org: "Executive",
        online: false,
        date: "04/10/21",
    },
];