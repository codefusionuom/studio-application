import { Button, Card, CardBody, Input, Typography } from "@material-tailwind/react";
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
  const [error, setError] = useState();
  const [event, setEvent] = useState();
  const [paymentList, setPaymentList] = useState();

  const handleEventConfirm = async () => {
    try {
      const { data } = await axiosInstance.put(
        "/eventManager/updateEventConfirmed/" + id,
        {
          status: "Done",
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
  };

  const fetchPaymentList = async () => {
    try {
      const { data } = await axiosInstance.get(
        "/customerManager/paymentByEvent/" + id
      );
      console.log(data);
      setPaymentList(data.rows);
    } catch (error) {
      ToastError("error on fetching payments");
    }
  };

  const handleEdit = async () => {
    if (!event.amount) {
      setError("amount required");
      return;
    }
    try {
      const updatedEvent = {
        id: event.id,
        note: event.note,
        serviceDate: event.serviceDate,
        amount: event.amount,
        offers: event.offers,
        payment: event.payment,
        eventServices: event.eventServices,
      };
      const { data } = await axiosInstance.put(
        "/eventManager/updateEvent/" + id,
        {
          ...updatedEvent,
        }
      );
      console.log(data);

      if (data) {
        ToastSuccess("successfully created event");
      }
    } catch (error) {
      ToastError("error created on event");
    }
    console.log(event);
  };

  const handleReset = () => {
    fetchEventData();
  };

  const handleCancel = () => {
    navigate("/eventManager/eventRequests");
  };
  const fetchEventData = async () => {
    console.log(id, "id");
    try {
      const { data } = await axiosInstance.get(
        `/customerManager/eventRequest/${id}`
      );
      console.log(data);
      setEvent(data);
    } catch (error) {
      ToastError("error on fetching payments");
      console.error("Error fetching event data:", error);
    }
  };
  useEffect(() => {
    // Replace this URL with your actual API endpoint

    if (id) {
      fetchEventData();
      fetchPaymentList();
    }
  }, [id]);

  return (
    <div className="bg-cl-4 p-20 rounded flex flex-col gap-12 overflow-scroll  h-screen">
      <div className="">
        <div className="bg-bg py-10 px-8 flex justify-between rounded">
          <Typography className="font-Lato text-4xl font-normal font-500">
            Customer Information
          </Typography>
        </div>
        {event && (
          <div className="my-4  grid grid-cols-2 gap-10">
            <Input
              type="name"
              label="Full name"
              value={event.customer.firstname + " " + event.customer.lastname}
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
          </div>
        )}
      </div>

      <RequestService event={event} setEvent={setEvent} />

      <div className="flex w-full justify-center text-red-500">
        {error ? error : ""}
      </div>
      <div className="w-full flex justify-between mt-4 px-0 gap-10 ">
        <Button className="bg-btn-warning text-lg " onClick={handleCancel}>
          Cancel
        </Button>
        <Button className="bg-btn-danger text-lg" onClick={handleReset}>
          Reset
        </Button>
        <Button className="bg-btn-info text-lg" onClick={handleEdit}>
          Edit
        </Button>
        <Button onClick={handleEventConfirm} className="bg-btn-success text-lg">
          Confirm
        </Button>
      </div>
      <div>
      <div className="bg-bg py-10 px-8 flex justify-between rounded">
          <Typography className="font-Lato text-4xl font-normal font-500">
            Payment Information
          </Typography>
        </div>
<Card>
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
         
            {paymentList?.length > 0 ? (
              paymentList.map(
                (
                  { id, amount, status, payment, customerName,event,customerMobilePhone, createdAt },
                  index
                ) => {
                  const isLast = index === paymentList.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return ( <tbody>
                    <tr key={id} >
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {customerName}
                            </Typography>
                            {/* <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {customer.email && customer.email}
                            </Typography> */}
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
                            {event?.serviceType}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {customerMobilePhone}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {status}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {amount}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {payment}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {new Date(createdAt).getFullYear() +
                              "-" +
                              (new Date(createdAt).getMonth() + 1) +
                              "-" +
                              new Date(createdAt).getDate()}
                          </Typography>
                        </div>
                      </td>
                      
                    </tr>
                    </tbody>
                  );
                }
              )
            ) : (
              <tr className=" flex flex-col w-full h-32 animate-pulse justify-center items-center ">
               
              </tr>
            )}
       
        </table>
      </CardBody>
</Card>
      </div>
    </div>
  );
}

export default CreateEventRequest;


const TABLE_HEAD = [
  "Customer Name",
  "Service Type",
  "Mobile Phone",
  "Status",
  "Amount",
  "Payment",
  "Date",
];
