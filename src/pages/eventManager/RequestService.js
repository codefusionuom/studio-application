import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import DisabeldDatePicker from "../customerManager/Components/disabeldDatePicker";
import axiosInstance from "../../config/axios.config";
import { ToastError, ToastSuccess } from "../customerManager/ToastAlert";
import Datepicker from "../../components/datePicker/Datepicker";

function RequestService({ event,setEvent }) {
//  console.log(event);
const [date,setDate]=useState()


useEffect(()=>{
  console.log("ddd");
  if(event)setEvent({...event,serviceDate:date.toISOString()})
},[date])

 const handleChange = (id, e) => {
  const { value } = e.target;
  setEvent((prev) => ({
    ...prev,
    eventServices: prev.eventServices.map((service) =>
      service.id === id
        ? {...service, value: value }
        : service
    ),

  }));
};

  return (
    <Accordion open={true} icon={<ChevronDownIcon />} className={` `}>
      <AccordionHeader>
      <div className="w-full bg-bg py-10 px-8 flex justify-between rounded">
          <Typography className="font-Lato text-4xl font-normal font-500">
            {event ? event?.service?.serviceName: "Event"} Information
          </Typography>
          
        </div>
      </AccordionHeader>
      <AccordionBody>
        <div className={`grid grid-cols-2 gap-4 w-full `}>
          {event?.eventServices &&
            event?.eventServices.map((serviceinput) => {
              
              return (
                <div className="flex flex-col gap-4 w-full">
                  <Typography className="-mb-2" variant="h6">
                {serviceinput.serviceInputField.fieldName}
              </Typography>
              <Input
                label="serviceType"
                value={serviceinput.value}
                onChange={(e) => handleChange(serviceinput.id, e)}
                id="amount"
                size="lg"
              />
                </div>
              );
            })}

          <div className="flex flex-col gap-4 w-full">
            <Typography className="-mb-2" variant="h6">
              Service Date
            </Typography>
            <DayPicker
              mode="single"
              selected={new Date(event?.serviceDate)}
              onSelect={setDate}
              showOutsideDays
              className="border-0 flex justify-start "
              classNames={{
                caption: "flex justify-center py-2 mb-4 relative items-center",
                caption_label: "text-sm font-medium text-gray-900",
                nav: "flex items-center",
                nav_button:
                  "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                nav_button_previous: "absolute left-1.5",
                nav_button_next: "absolute right-1.5",
                table: "w-full border-collapse",
                head_row: "flex font-medium text-gray-900",
                head_cell: "m-0.5 w-9 font-normal text-sm",
                row: "flex w-full mt-2",
                cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-normal",
                day_range_end: "day-range-end",
                day_selected:
                  "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                day_today: "rounded-md bg-gray-200 text-gray-900",
                day_outside:
                  "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                day_disabled: "text-gray-500 opacity-50",
                day_hidden: "invisible",
              }}
              components={{
                IconLeft: ({ ...props }) => (
                  <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                ),
                IconRight: ({ ...props }) => (
                  <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                ),
              }}
            />
            {/* <Datepicker date={event?.serviceDate} /> */}
          </div>
          <div className="gap-4">
            <div>
              <Typography className="" variant="h6">
                Note
              </Typography>
              <Textarea
                label="note"
                value={event?.note}
                onChange={(e) => {
                  setEvent({ ...event,note: e.target.value });
                }}
                
                id="note"
                type="text"
                size="lg"
              />
            </div>
            <div className="flex flex-col gap-4 w-full">
              <Typography className="-mb-2" variant="h6">
                Amount
              </Typography>
              <Input
                label="serviceType"
                value={event?.amount}
                onChange={(e) => {
                  setEvent({ ...event,amount: e.target.value ,payment: parseFloat(e.target.value) - parseFloat(event?.offers)});
                }}
                
                id="amount"
                type="number"
                size="lg"
              />
            </div>
            <div className="flex flex-col gap-4 w-full">
              <Typography className="-mb-2" variant="h6">
                offers
              </Typography>
              <Input
                label="serviceType"
                value={event?.offers}
                onChange={(e) => {
                  setEvent({ ...event,offers: e.target.value,payment:parseFloat(event?.amount) - parseFloat(e.target.value) });
                }}
                
                id="note"
                type="number"
                size="lg"
              />
            </div>
            <div className="flex flex-col gap-4 w-full">
              <Typography className="-mb-2" variant="h6">
                Payment
              </Typography>
              <Input
                label="serviceType"
                onChange={(e) => {
                  setEvent({ ...event,payment: parseFloat(event?.amount) - parseFloat(event?.offers) });
                }}
                value={parseFloat(event?.amount) - parseFloat(event?.offers)}
                
                id="note"
                type="number"
                size="lg"
              />
            </div>
          </div>
        </div>

        {/* <div className="flex justify-between mt-4 px-20">
          <Button className="bg-btn-warning text-lg"
          // onClick={handleRemove}
          >Remove</Button>
          <Button
            onClick={handleConfirm}
            className="bg-btn-success text-lg"
          >
            Confirm
          </Button>
        </div> */}
      </AccordionBody>
    </Accordion>
  );
}

export default RequestService;
