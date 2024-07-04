import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef } from "react";
import NotificationCard from "../../components/cards/notificationCard.js";
import Pos from "./Components/pos.js";
import { useState } from "react";
import { Button, Card, Input, Option, Select } from "@material-tailwind/react";
import axiosInstance from "../../config/axios.config.js";
import { useSelector } from "react-redux";
import { ToastError } from "./ToastAlert/index.js";
import EventDetails from "./Components/eventDetails.js";

const initalvalues = {
  customerId: null,
  customerName: "",
  customerMobilePhone: "",
  eventId: null,
  serviceType: "",
  eventDate: "",
  description: "",
  amount: "",
  offers: "",
  payment: "",
  status: "",
  type: "",
};

function CustomerManagerDashboard() {
  const count = useSelector((state) => state.customerRequests.count);
  const [search, setSearch] = useState("");
  const [eventlist, setEventlist] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [event, setEvent] = useState(initalvalues);
  const [eventInformation, setEventInformation] = useState();
  const [refresh, setRefresh] = useState(true);
  const [isDivVisible, setIsDivVisible] = useState(false);
  const divRef = useRef(null);
  // console.log(count,"count requests");

  const customerSearch = async (query) => {
    if (!search) {
      return;
    }
    try {
      console.log("try", search);
      const { data } = await axiosInstance.get(
        `/customerManager/customer/?mobilePhone=${search}`
      );
      console.log(data);
      if (data) {
        setCustomerList(data.rows);
      }
    } catch (error) {
      console.log(error);
      ToastError(error.message);
    }
  };

  const getEventsOfCustomer = async (customer) => {
    if (!customer) {
      return;
    }
    try {
      console.log("try", search);
      const { data } = await axiosInstance.get(
        `/customerManager/customerEvents/${customer.mobilePhone}`
      );
      console.log(data);
      if (data) {
        setEventlist(data);
      }
    } catch (error) {
      console.log(error);
      ToastError(error.message);
    }
  };

  // const getEvent=async(eventId)=>{
  //   try {
  //     console.log("try",search);
  //     const { data } = await axiosInstance.get(
  //       `/eventManager/event/${eventId}`
  //     );

  //    console.log(data);
  //     if(data){setEventInformation(data)}
  //   } catch (error) {
  //     console.log(error);
  //     ToastError(error.message)
  //   }
  // }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setIsDivVisible(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [divRef]);

  useEffect(() => {
    console.log("search when page change");
    customerSearch();
  }, [search]);

  return (
    <div className="flex flex-col gap-12">
      <div className="flex gap-10">
        <NotificationCard
          title={"Customer Requests"}
          notificationNumber={count}
        />
        <tr
          className="w-full flex  items-center justify-center gap-4   md:flex-row bg-cl-4
              rounded font-lato text-xl text-cl-1 px-2 hover:bg-blue-50 hover:drop-shadow-lg"
        >
          <div className="relative ">
            <div className="relative flex w-full max-w-[24rem] ">
              <Input
                type="email"
                label="mobile phone"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onFocus={() => setIsDivVisible(true)}
                className="pr-20"
                containerProps={{
                  className: "min-w-0",
                }}
              />
              <Button
                size="sm"
                color={search ? "gray" : "blue-gray"}
                disabled={!search}
                className="!absolute right-0 bottom-0 rounded "
                onClick={customerSearch}
              >
                <MagnifyingGlassIcon className="h-6 w-5" />
              </Button>
            </div>
            {search && (
              <Card ref={divRef}  className="p-2 rounded-md absolute top-10 w-full max-h-36 overflow-y-scroll ">
                {customerList.length > 0 ?
                  customerList.map((customer) => {
                    return (
                      <div
                        className=""
                        onClick={() => {
                          setSearch(customer.mobilePhone);
                          getEventsOfCustomer(customer);
                        }}
                      >
                        <div className="text-md">
                          {customer.firstname + " " + customer.lastname}
                        </div>
                        <div className="text-sm text-blue-gray-500">
                          {customer.mobilePhone}
                        </div>
                      </div>
                    );
                  }) : <div className="text-md">not found customer</div>}
              </Card>
            )}
          </div>
          <div className="   min-w-[200px] w-full ">
            <Select
              label="Select Event"
              className="  w-full min-w-[200px] max-h-36 overflow-y-scroll"
            >
              {eventlist.length > 0 ? (
                eventlist.map((event) => {
                  return (
                    <Option
                      onClick={() => {
                        setEvent({
                          customerId: event.customer.id,
                          eventId: event.id,
                          eventDate: event.serviceDate,
                          customerName:
                            event.customer.firstname +
                            " " +
                            event.customer.lastname,
                          serviceType: event.service.serviceName,
                          description: "",
                          customerMobilePhone: search,
                          amount: "",
                          offers: "",
                          payment: "",
                          status: "full",
                          type: "online",
                        });
                      }}
                      className="flex justify-between text-sm"
                      key={event.id}
                    >
                      <div>{event.service.serviceName} </div>
                      {event.serviceDate && (
                        <div>
                          {new Date(event.serviceDate).getFullYear() +
                            "-" +
                            (new Date(event.serviceDate).getMonth() + 1) +
                            "-" +
                            new Date(event.serviceDate).getDate()}
                        </div>
                      )}
                    </Option>
                  );
                })
              ) : (
                <Option disabled> no events found</Option>
              )}
            </Select>
          </div>
        </tr>
      </div>
      <div className="">
        <Pos
          event={event}
          initalvalues={initalvalues}
          search={search}
          setRefresh={setRefresh}
        />
      </div>
      <div>
        <EventDetails id={event.eventId} refresh={refresh} />
      </div>
    </div>
  );
}

export default CustomerManagerDashboard;
