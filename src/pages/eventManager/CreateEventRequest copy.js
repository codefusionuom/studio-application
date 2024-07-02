import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../config/axios.config";
import RequestService from "./RequestService";
import { ToastError, ToastSuccess } from "../customerManager/ToastAlert";
// import axiosInstance from "../../config/axios.config";
// import { useSelector } from "react-redux";
// import {
//   initialCustomerRequest,
//   initialEventRequest,
//   initialService,
// } from "./initialValues/customerRequest";
// import { ToastError, ToastSuccess } from "./ToastAlert";
// import RequestCustomer from "./Components/RequestCustomer";
// import RequestService from "./Components/RequestService";
// import { useNavigate } from "react-router-dom";

function CreateEventRequest() {
  const { id } = useParams();
   const navigate = useNavigate();

  const [event, setEvent] = useState();
  

  // const [mode, setMode] = useState(
  //   customerList && customerList.length == 1 ? false : true
  // );

  // const [search, setSearch] = useState(requestedCustomer.mobilePhone || "");
const handleEventConfirm=async()=>{
  try {
        const { data } = await axiosInstance.put(
          "/eventManager/updateEventConfirmed/"+id,
          {
            status:"Active"
          }
        );
        console.log(data);
        
        if (data) {
          ToastSuccess("successfully created event");
          navigate("/eventManager/eventRequests");
        }
      } catch (error) {
        ToastError("error created on event");
      }
}
  // const handleCustomerRequest =async () => {
  //   console.log(eventRequest, "customerRequest");

  //   try {
  //     const { data } = await axiosInstance.post(
  //       "/customerManager/eventRequest",
  //       {customerId:eventRequest.customerId,
  //         services:eventRequest.services,
  //         note:eventRequest.note
  //       }
  //     );
  //     console.log(data);
      
  //     if (data) {
  //       ToastSuccess("successfully created");
  //     }
  //   } catch (error) {
      
  //   }
  // };
  // const handleCancel = () => {
  //   navigate("/customerManager/CustomerRequest");
  //   setEventRequest({ services: [], cutomerId: "" });
  // };
  // const customerSearch = async (query) => {
  //   if (!search) {
  //     setMode(false);
  //     return;
  //   }
  //   try {
  //     const { data } = await axiosInstance.get(
  //       `/customerManager/customer/?mobilePhone=${search}`
  //     );

  //     if (data) {
  //       console.log(data.rows[0]);
  //       setCustomerList(data.rows);
  //       if (data.rows.length != 1) setMode(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     ToastError(error.message);
  //   }
  // };

  // useEffect(() => {
  //   console.log(requestedCustomer.mobilePhone, "customers");
  //   customerSearch();
  // }, [search]);

  useEffect(() => {
    
    // Replace this URL with your actual API endpoint
    const fetchEventData = async () => {
      console.log(id,"id");
      try {
        const {data} = await axiosInstance.get(`/customerManager/eventRequest/${id}`);
       console.log(data);
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    if (id) {
      fetchEventData();
    }
  }, [id]);
  // const handleSearchCustomer = (customer) => {
  //   if (
  //     requestedCustomer.mobilePhone === customer.mobilePhone &&
  //     (requestedCustomer.firstname !== customer.firstname ||
  //       requestedCustomer.lastname !== customer.lastname ||
  //       requestedCustomer.address !== customer.address ||
  //       requestedCustomer.email !== customer.email)
  //   ) {
  //     console.log("case");
  //     setRequestedCustomer((prev) => ({
  //       ...prev,
  //       firstname: prev.firstname + " | " + customer.firstname,
  //       lastname: prev.lastname + " | " + customer.lastname,
  //       email: prev.email + " | " + customer.email,
  //       address: prev.address + " | " + customer.address,
  //       conflict: true,
  //     }));
  //   } else {
  //     console.log(customer,'customerrr');
  //     setEventRequest((prev) => ({
  //       ...prev,
  //       customerId:customer.id
  //     }));
  //     setRequestedCustomer(customer);
  //   }

  //   setSearch(customer.mobilePhone);
  //   setMode(true);
  // };

  return (
    <div className="bg-cl-4 p-20 rounded flex flex-col gap-12 overflow-scroll  h-screen">

      <div className="">
        <div className="bg-bg py-10 px-8 flex justify-between rounded">
          <Typography className="font-Lato text-4xl font-normal font-500">
            Customer Information
          </Typography>
          
        </div>
        {event && <div className="my-4  grid grid-cols-2 gap-10">
          <Input
                type="name"
                label="Full name"
                value={event.customer.firstname +" "+ event.customer.lastname}
                className="pr-20 bg-white text-black font-bold"
                containerProps={{
                  className: "min-w-0",
                }}
                disabled
              />
              <Input
                type="name"
                label="Full name"
                value={event.customer.mobilePhone}
                className="pr-20"
                containerProps={{
                  className: "min-w-0",
                }}
                disabled
              />
          </div>}
        
      </div>


          <RequestService
          event={event}
          />


      <div className="w-full flex justify-between mt-4 px-0 gap-10 ">
        <Button className="bg-btn-warning text-lg " 
        // onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button className="bg-btn-danger text-lg">Reject</Button>
        <Button className="bg-btn-info text-lg">Leave</Button>
        <Button
          onClick={handleEventConfirm}
          className="bg-btn-success text-lg"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}

export default CreateEventRequest;
