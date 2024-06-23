import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axios.config";
import { useSelector } from "react-redux";
import {
  initialCustomerRequest,
  initialEventRequest,
  initialService,
} from "./initialValues/customerRequest";
import { ToastError, ToastSuccess } from "./ToastAlert";
import RequestCustomer from "./Components/RequestCustomer";
import RequestService from "./Components/RequestService";
import { useNavigate } from "react-router-dom";

function CreateCustomerRequest() {
  const navigate = useNavigate();
  const request = useSelector(
    (state) => state.customerRequests.customerRequest
  );
  console.log(request);
  const [requestedCustomer, setRequestedCustomer] = useState(
    request || initialCustomerRequest
  );
  const [customerList, setCustomerList] = useState();
  const [Service, setService] = useState([]);
  const [eventRequest, setEventRequest] = useState(initialEventRequest);

  const [mode, setMode] = useState(
    customerList && customerList.length == 1 ? false : true
  );

  const [search, setSearch] = useState(requestedCustomer.mobilePhone || "");

  const handleCustomerRequest =async () => {
    console.log(eventRequest, "customerRequest");

    try {
      const { data } = await axiosInstance.post(
        "/customerManager/eventRequest",
        {customerId:eventRequest.customerId,
          services:eventRequest.services,
          note:eventRequest.note
        }
      );
      console.log(data);
      
      if (data) {
        ToastSuccess("successfully created");
      }
    } catch (error) {
      
    }
  };
  const handleCancel = () => {
    navigate("/customerManager/CustomerRequest");
    setEventRequest({ services: [], cutomerId: "" });
  };
  const customerSearch = async (query) => {
    if (!search) {
      setMode(false);
      return;
    }
    try {
      const { data } = await axiosInstance.get(
        `/customerManager/customer/?mobilePhone=${search}`
      );

      if (data) {
        console.log(data.rows[0]);
        setCustomerList(data.rows);
        if (data.rows.length != 1) setMode(false);
      }
    } catch (error) {
      console.log(error);
      ToastError(error.message);
    }
  };

  useEffect(() => {
    console.log(requestedCustomer.mobilePhone, "customers");
    customerSearch();
  }, [search]);

  const handleSearchCustomer = (customer) => {
    if (
      requestedCustomer.mobilePhone === customer.mobilePhone &&
      (requestedCustomer.firstname !== customer.firstname ||
        requestedCustomer.lastname !== customer.lastname ||
        requestedCustomer.address !== customer.address ||
        requestedCustomer.email !== customer.email)
    ) {
      console.log("case");
      setRequestedCustomer((prev) => ({
        ...prev,
        firstname: prev.firstname + " | " + customer.firstname,
        lastname: prev.lastname + " | " + customer.lastname,
        email: prev.email + " | " + customer.email,
        address: prev.address + " | " + customer.address,
        conflict: true,
      }));
    } else {
      console.log(customer,'customerrr');
      setEventRequest((prev) => ({
        ...prev,
        customerId:customer.id
      }));
      setRequestedCustomer(customer);
    }

    setSearch(customer.mobilePhone);
    setMode(true);
  };

  return (
    <div className="bg-cl-4 p-20 rounded flex flex-col gap-12 overflow-scroll  h-screen">
      <div className="">
        <div className="bg-bg py-10 px-8 flex justify-between rounded">
          <Typography className="font-Lato text-4xl font-normal font-500">
            Customer Information
          </Typography>
          <div className="relative ">
            <div className="relative flex w-full max-w-[24rem] ">
              <Input
                type="email"
                label="Email  || mobile"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
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
            <Card className="p-2 rounded-md absolute top-10 w-full max-h-36 overflow-scroll z-[999]">
              {customerList && customerList.length > 0 ? (
                customerList.map((customer) => {
                  return (
                    <div
                      className=""
                      onClick={() => handleSearchCustomer(customer)}
                    >
                      <div className="text-">
                        {customer.firstname + " " + customer.lastname}
                      </div>
                      <div className="text-sm text-blue-gray-500">
                        {customer.mobilePhone}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex justify-center items-center">
                  no customer found
                </div>
              )}
            </Card>
          </div>
        </div>
        <RequestCustomer
          requestedCustomer={requestedCustomer}
          mode={mode}
          setSearch={setSearch}
          customerList={customerList}
          setCustomerList={setCustomerList}
          setCustomerRequest={setEventRequest}
          customerRequest={eventRequest}
        />
      </div>

      {Service.map((oneService) => {
        return (
          <RequestService
            customerRequest={eventRequest}
            setCustomerRequest={setEventRequest}
          />
        );
      })}

      <div className="bg-bg p-4 flex justify-between rounded">
        <Typography className="font-Lato text-4xl font-normal font-500">
          Add Service
        </Typography>
        <Typography
          onClick={() =>
            setService((prevService) => [...prevService, initialService])
          }
          className="font-Lato text-4xl font-normal font-500 bg-blue-gray-500 px-2 rounded-md active:bg-white cursor-pointer"
        >
          +
        </Typography>
      </div>
      <div className="w-full flex justify-between mt-4 px-0 gap-10 ">
        <Button className="bg-btn-warning text-lg " onClick={handleCancel}>
          Cancel
        </Button>
        <Button className="bg-btn-danger text-lg">Reject</Button>
        <Button className="bg-btn-info text-lg">Leave</Button>
        <Button
          onClick={handleCustomerRequest}
          className="bg-btn-success text-lg"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}

export default CreateCustomerRequest;
