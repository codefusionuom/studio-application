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

function RequestService({ event,setEvent }) {
 console.log(event);


  return (
    <Accordion open={true} icon={<ChevronDownIcon />} className={` `}>
      <AccordionHeader>
      <div className="w-full bg-bg py-10 px-8 flex justify-between rounded">
          <Typography className="font-Lato text-4xl font-normal font-500">
            Event Information
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
                disabled
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

            <DisabeldDatePicker date={event?.serviceDate} />
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
                disabled
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
                  setEvent({ ...event,amount: e.target.value });
                }}
                disabled
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
                  setEvent({ ...event,offers: e.target.value });
                }}
                disabled
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
                  setEvent({ ...event,payment: e.target.value });
                }}
                value={event?.payment}
                disabled
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
