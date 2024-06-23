import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from "@fullcalendar/daygrid";
import React from 'react'
import Timeline from 'react-calendar-timeline/lib/lib/Timeline';
import moment from 'moment';
import 'react-calendar-timeline/lib/Timeline.css'
import { Card, CardHeader, Input, Typography, Button, CardBody, Chip, CardFooter, Tabs, TabsHeader, Tab, Avatar, IconButton, Tooltip, Select, Option, } from "@material-tailwind/react";
import { MagnifyingGlassIcon, PencilIcon } from '@heroicons/react/24/outline';

// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";
// import EventCalendar from 'react-event-calendar'
function SuperAdminEventCalandar() {
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
      <Timeline  className="w-[1000px]" 
       groups={groups}
      items={items}
      defaultTimeStart={moment().add(-8, 'hour')}
      defaultTimeEnd={moment().add(8, 'hour')}/>
    


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

export default SuperAdminEventCalandar



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