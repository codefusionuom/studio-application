import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
} from "@material-tailwind/react";
import FullCalendar from "@fullcalendar/react";
import { useNavigate } from "react-router-dom";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import { ToastError } from "../../pages/customerManager/ToastAlert";
import { format } from "date-fns";

const EventCalendar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [eventList, setEventList] = useState([]);

  const handleOpenEventCalendar = () => setOpen(!open);

  const getEvents = () => {
    axios.get("http://localhost:5000/eventManager/all-events")
      .then(res => {
        const events = res.data.events;
        console.log("events :", events);
        setEventList(events);
      })
      .catch(error => {
        ToastError(error.message);
      });
  };

  useEffect(() => {
    getEvents();
  }, []);

  const events = eventList.map(event => ({
    title: event.service['serviceName'],
    id: event.id,
    start: format(new Date(event.serviceDate), 'yyyy-MM-dd'),
    end: format(new Date(event.serviceDate), 'yyyy-MM-dd'),
    backgroundColor: "#2874A6",
    borderColor: "#2874A6",
    
  }));

  return (
    <div>
      <Button onClick={handleOpenEventCalendar} variant="gradient" size="sm">
        Open Dialog
      </Button>

      <Dialog open={open} handler={handleOpenEventCalendar} size="lg" className="w-full max-w-3xl mx-auto">
        <DialogHeader>Event Calendar</DialogHeader>
        <DialogBody className="p-4">
          <Card className="p-4">
            <FullCalendar
              defaultView="dayGridMonth"
              header={{
                left: "prev,next",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              eventClick={function (info) {
                navigate(`/eventManager/createEventRequest/${info.event.id}`);
                info.el.style.borderColor = 'red';
              }}
              plugins={[dayGridPlugin]}
              events={events}
              displayEventEnd={true}
              contentHeight={"40rem"}
              borderColor="green"
              eventColor="green"
            />
          </Card>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpenEventCalendar} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpenEventCalendar}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default EventCalendar;
