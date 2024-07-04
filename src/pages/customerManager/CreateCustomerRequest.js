import {
  Button,
  Card,
  Input,
  Radio,
  Typography,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
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
import BackButton from "../../components/buttons/BackButton"
function CreateCustomerRequest() {
  const navigate = useNavigate();
  const isMounted = useRef(false);
  const request = useSelector(
    (state) => state.customerRequests.customerRequest
  );

  const [requestedCustomer, setRequestedCustomer] = useState(
    request || initialCustomerRequest
  );
  const [customerList, setCustomerList] = useState();
  const [Service, setService] = useState([]);
  const [eventRequest, setEventRequest] = useState(initialEventRequest);
  const [customerInformation, setCustomerInformation] = useState();
  const [mode, setMode] = useState(
    customerList && customerList.length == 1 ? false : true
  );

  const [search, setSearch] = useState(requestedCustomer.mobilePhone || "");

  const handleCustomerRequest = async () => {
    // api
    console.log("fee");
    try {
      if (requestedCustomer.id) {
        const { data } = await axiosInstance.put(
          `/customerManager/customerRequest/${requestedCustomer.id}`,
          {
            status: "confirmed",
          }
        );
        if (data) {
          resetStates()
          navigate("/customerManager/CustomerRequest");
        }
      }
      else{
        resetStates()
        navigate("/customerManager/CustomerRequest");
      }
    } catch (error) {}
  };
  const handleCancel = () => {
    resetStates()
    navigate("/customerManager/CustomerRequest");
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
        if (data.rows.length != 1) {
          setMode(false);
        }
      }
    } catch (error) {
      console.log(error);
      ToastError(error.message);
    }
  };

  useEffect(() => {
    //console.log(requestedCustomer.mobilePhone, "customers search");
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
      console.log(customer, "customerrr");
      setEventRequest((prev) => ({
        ...prev,
        customerId: customer.id,
      }));
      setCustomerInformation({
        customerId: customer.id,
        mobilePhone: customer.mobilePhone,
        firstname: customer.firstname,
        lastname: customer.lastname,
      });
      setRequestedCustomer(customer);
    }

    setSearch(customer.mobilePhone);
    setMode(true);
  };

  const resetStates = () => {
    setRequestedCustomer(initialCustomerRequest);
    setEventRequest(initialEventRequest);
  };

  return (
    <div className="bg-cl-4 p-16 rounded flex flex-col gap-12 overflow-scroll  h-screen">
      <BackButton />
      <div className="">
        
        <div className="bg-bg py-10 px-8 flex justify-between rounded">
          <Typography className="font-Lato text-4xl font-normal font-500">
            Customer Request Information
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
                      className="flex justify-between items-center"
                      onClick={() => handleSearchCustomer(customer)}
                    >
                      <div className="">
                        <div className="text-">
                          {customer.firstname + " " + customer.lastname}
                        </div>
                        <div className="text-sm text-blue-gray-500">
                          {customer.mobilePhone}
                        </div>
                      </div>
                      <div>{customerList.length == 1 && <Radio />}</div>
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
          // setCustomerRequest={setEventRequest}
          setCustomerInformation={setCustomerInformation}
          customer={customerInformation}
          customerRequest={eventRequest}
        />
      </div>
      {
        <>
          {" "}
          <div className="bg-bg p-4 flex justify-between rounded">
            <Typography className="font-Lato text-4xl font-normal font-500">
              Customer Information
            </Typography>
          </div>
          <div className="my-4  grid grid-cols-2 gap-10">
            <Input
              type="name"
              label="Full name"
              value={
                customerInformation
                  ? customerInformation?.firstname +
                    " " +
                    customerInformation?.lastname
                  : ""
              }
              className="pr-20 bg-white text-black font-bold"
              containerProps={{
                className: "min-w-0",
              }}
              disabled
            />
            <Input
              type="name"
              label="Mobile phone"
              value={customerInformation?.mobilePhone}
              className="pr-20"
              containerProps={{
                className: "min-w-0",
              }}
              disabled
            />
          </div>
        </>
      }

      <div className="bg-bg p-4 flex justify-between rounded">
        <Typography className="font-Lato text-4xl font-normal font-500">
          Event Information
        </Typography>
      </div>
      {Service.map((oneService) => {
        return (
          <RequestService
            customerRequest={eventRequest}
            setCustomerRequest={setEventRequest}
            customer={customerInformation}
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

// const handleCustomerRequest =async () => {
//   console.log(eventRequest, "customerRequest");

//   try {
//     const { data } = await axiosInstance.post(
//       "/customerManager/eventRequest",
//       {customerId:eventRequest.customerId,
//         services:eventRequest.services,
//         note:eventRequest.note,
//         customerRequestId:requestedCustomer.id
//       }
//     );
//     console.log(data);

//     if (data) {
//       ToastSuccess("successfully created");
//     }
//   } catch (error) {

//   }
// };
