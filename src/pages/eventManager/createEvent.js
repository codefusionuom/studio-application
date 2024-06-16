import React, { useState, useEffect } from "react";

import {
  Card,
  CardBody,
  Typography,
  Select,
  Option,
  PopoverContent,//jiiil
  PopoverHandler,
  Popover,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { DayPicker } from "react-day-picker";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
// const axios = require("axios")
import axios from "axios";
import Accordian from "./accordian";

const CreateEvent = () => {
  const [date, setDate] = useState();
  const [serviceType, setServiceType] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  let [custormerList, setcustormerList] = React.useState([]);
  const [customer, setCustormer] = useState("");
  const [isServiceTypeError, setIsServiceTypeError] = useState(false);
  const [isDateError, setIsDateError] = useState(false);
  const [isCustormerIdError, setIsCustormerIdError] = useState(false);
  const [isStatusError, setIsStatusError] = useState(false);
  // const [isServiceTypeError , setIsServiceTypeError ] = useState(false);

  const navigate = useNavigate();

  const createEvent = (e) => {
    // e.preventDefault()
    e.preventDefault();
    // Validation to check if all required fields are filled
    // setIsError(true)
    if (!serviceType) {
      setIsServiceTypeError(true);
      // alert("Please fill in all fields");

      return;
    }
    setIsServiceTypeError(false);
    if (!date) {
      setIsDateError(true);
      // alert("Please fill in all fields");
      return;
    }
    setIsDateError(false);
    if (!status) {
      // setIsError(true)
      // alert("Please fill in all fields");
      setIsStatusError(true);
      return;
    }
    setIsStatusError(false);
    if (!customer.id) {
      setIsCustormerIdError(true);
      // alert("Please fill in all fields");
      return;
    }
    setIsCustormerIdError(false);
    // if (!description) {
    //   // alert("Please fill in all fields");
    //   return;
    // }
    console.log("start execut");
    console.log(date);
    axios
      .post("http://localhost:5000/eventManager/createEvent", {
        serviceType: serviceType,
        status: status,
        date: date,
        customerId: customer.id,

        // "customerId":"5"
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
      alert("Event Created Successfully !")
    console.log("executed");
  };
  const findCustormer = (EnteredMobile) => {
    axios
      .post("http://localhost:5000/eventManager/getCustomer", {
        mobilePhone: EnteredMobile,
      })
      .then((response) => {
        console.log(response.data);
        setcustormerList(response.data);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div className="bg-cl-4 mt-8 ">
        <div className="  text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border p-4 pl-10 ">
         <Accordian/>
         
          <Card className="mt-6 w-full bg-gray-400 bold">
            <CardBody>
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2 text-2xl font-normal "
              >
                Service Information
              </Typography>
            </CardBody>
          </Card>
          <form className="">
            <div className="flex space-x-2 justify-between w-11/12">
              <div className="flex flex-col gap-6 mb-1 p-4 w-2/6">
                <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                  Service Type:
                </h6>
                <div className="relative h-11 w-full min-w-[200px]">
                  {/* <Select
                  label="Select Version"
                  className="relative h-11 w-full min-w-[200px]"
                  onChange={ (e) =>  {if(e.target && e.target.value) setServiceType(e.target.value)
                  else console.log("no service");
                  }}
                  value={serviceType}
                >
                  <Option>one day services</Option>
                  <Option>wedding photography</Option>
             
                </Select> */}
                  <Select
                    error={isServiceTypeError ? "true" : null}
                    label="Select Version"
                    className="relative h-11 w-full min-w-[200px]"
                    // onChange={(e) => {
                    //   console.log("Entire event object:", e.target.value);
                    //   if (e && e.target && e.target.value) {
                    //     setServiceType(e.target.value);
                    //   } else {
                    //     console.log("No valid event or value");
                    //   }
                    // }}
                    onChange={(value) => {
                      setServiceType(value);
                      console.log("changed Value:", value);
                      console.log("Service type: ", serviceType);
                    }}
                    // selected={(element) => {
                    //   if (element) {
                    //     setServiceType(element.props.value);
                    //     const selectedValue = element.props.value;
                    //     console.log("Selected Value:", selectedValue);
                    //     console.log("Service type : ", serviceType);
                    //     //  console.log("date: " , date);
                    //     return element.props.name;
                    //   }
                    // }}
                    value={serviceType}
                  >
                    <Option value="one Day Services">One Day Services</Option>
                    <Option value="wedding Photography">
                      Wedding Photography
                    </Option>
                    {/* Add other options as needed */}
                  </Select>
                </div>
                <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                  Date :
                </h6>
                <div className="  ">
                  <Popover placement="bottom">
                    <PopoverHandler>
                      <Input
                        error={isDateError ? "true" : null}
                        className=" "
                        label="Select a Date"
                        onChange={
                          (e) =>
                            // value={date ? format(date, "PPP") : ""}
                            // value={date ? 'ffff': '' }

                            setDate(date)
                          // console.log(date);
                        }
                        value={
                          date
                            ? `${date.getDate()}/${
                                date.getMonth() + 1
                              }/${date.getFullYear()}`
                            : ""
                        }
                      />
                    </PopoverHandler>
                    <PopoverContent>
                      <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        showOutsideDays
                        className="border-0"
                        classNames={{
                          caption:
                            "flex justify-center py-2 mb-4 relative items-center",
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
                            <ChevronLeftIcon
                              {...props}
                              className="h-4 w-4 stroke-2"
                            />
                          ),
                          IconRight: ({ ...props }) => (
                            <ChevronRightIcon
                              {...props}
                              className="h-4 w-4 stroke-2"
                            />
                          ),
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                {/* <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                  Location
                </h6>
                <div className="  w-full min-w-[200px]">
                  <Select label="Select Version" className=" h-11">
                    <Option>Material Tailwind HTML</Option>
                    <Option>Material Tailwind React</Option>
                    <Option>Material Tailwind Vue</Option>
                    <Option>Material Tailwind Angular</Option>
                    <Option>Material Tailwind Svelte</Option>
                  </Select>
                </div> */}
                <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                  Status
                </h6>
                <div className="  w-full min-w-[200px]">
                  <Select
                    error={isStatusError ? "true" : null}
                    label="Select Status"
                    className=" h-11 "
                    selected={(element) => {
                      if (element) {
                        setStatus(element.props.value);
                        const selectedValue = element.props.value;
                        console.log("status :", status);
                        //  console.log('selected val :', selectedValue);
                        return element.props.name;
                      }
                    }}
                    onChange={(value) => {
                      // setStatus(value);
                      console.log("Selected status:", value);
                      console.log("Status: ", status);
                    }}
                    value={status}
                  >
                    <Option value="Active">Active</Option>
                    <Option value="Upcoming">Upcoming</Option>
                    <Option value="Desertion">Desertion</Option>
                    <Option value="Done">Done</Option>
                    <Option value="Offline">Offline</Option>
                  </Select>
                </div>
              </div>

              <div className="   w-2/6 h-2/3 mt-8">
                <div className=" flex relative w-full h-2/3 mt-8">
                  <Textarea
                    error={isStatusError ? "true" : null} // value=""
                    className="peer h-full min-h-[200px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    onChange={(e) => {
                      console.log(e.target.value);
                      // if(e.target.value)
                      setDescription(e.target.value);
                      console.log("des : ", description);
                      console.log("setdesc :", e.target.value);
                    }}
                  ></Textarea>
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Description
                  </label>
                </div>
                {/* <div className="flex relative w-full h-2/3 mt-8">
                  <Button
                    fullWidth
                    onClick={(e) => {
                      createEvent(e);
                      console.log("fffffffffff");
                      console.log(serviceType);
                      console.log("date :", date);
                    }}
                    variant="filled"
                    className="rounded-full"
                    color="blue"
                  >
                    Create Event
                  </Button>
                </div> */}
              </div>
            </div>

            <Card className="mt-6 w-full bg-gray-400 bold">
              <CardBody>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="mb-2 text-2xl font-normal "
                >
                  Customer Information
                </Typography>
              </CardBody>
            </Card>

            <Card color="transparent" shadow={false} className="w-full">
              <div className="flex     space-x-2 w-11/12">
                {/* <form className="mt-8 mb-2  w-full  flex space-x-2 justify-between"> */}

                <div className="mt-8 mb-2  w-full  flex space-x-2 justify-between">
                  <div className="mb-1 flex flex-col gap-6 p-4 w-2/6">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Name
                    </Typography>
                    <Input
                      error={isCustormerIdError ? "true" : null}
                      value={customer.firstname + customer.lastname}
                      size="lg"
                      placeholder="name@mail.com"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Address
                    </Typography>
                    <Input
                      error={isCustormerIdError ? "true" : null}
                      size="lg"
                      placeholder="name@mail.com"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      value={customer.address}
                    />
                  </div>

                  <div className="mb-1 flex flex-col gap-6 p-4 w-2/6  ">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Email
                    </Typography>
                    <Input
                      error={isCustormerIdError ? "true" : null}
                      size="lg"
                      placeholder="name@mail.com"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      value={customer.email}
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Contact No
                    </Typography>
                   

                    <div>
                      <Input
                        error={isCustormerIdError ? "true" : null}
                        size="lg"
                        placeholder="07XXXXXXXX"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        value={customer.mobilePhone}
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        onChange={(e) => {
                          console.log(e.target.value);
                          findCustormer(e.target.value);
                        }}
                      />
                      {/* Display search results */}
                      {!customer && (
                        <div>
                          {
                            // console.log(custormerList[0]);
                            custormerList.map((result, index) => (
                              <div key={index}>
                                {/* Display each search result */}
                                <div
                                  onClick={(e) => setCustormer(result)}
                                  role="button"
                                  class="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                                >
                                  <div>
                                    <h6 class="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                                      {result.firstname + " " + result.lastname}
                                    </h6>
                                    <p class="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                                      {result.mobilePhone}
                                    </p>
                                  </div>
                                </div>

                                {/* Add more fields as needed */}
                              </div>
                            ))
                          }
                        </div>
                      )}
                    </div>
                    <Button
                    fullWidth
                    onClick={(e) => {
                      createEvent(e);
                      console.log("fffffffffff");
                      console.log(serviceType);
                      console.log("date :", date);
                    }}
                    variant="filled"
                    className="rounded-full"
                    color="green"
                  >
                    Create Event
                  </Button>
                    {/* <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required></input> */}
                  </div>
                </div>

                {/* </form> */}
              </div>
            </Card>

           <Card className="mt-6 w-full bg-gray-400 bold">
              <CardBody>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="mb-2 text-2xl font-normal "
                >
                  Service Information
                </Typography>
              </CardBody>
            </Card> 

            <Card color="transparent" shadow={false} className="w-full">
              <div className="flex     space-x-2 w-11/12">

                <div className="mt-8 mb-2  w-full  flex space-x-2 justify-between">
                  <div className="mb-1 flex flex-col gap-6 p-4 w-2/6">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Time
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="20:00 PM"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Album
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="name@mail.com"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Cost
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="name@mail.com"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>

                  <div className="mb-1 flex flex-col gap-6 p-4 w-2/6">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Crowd
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="200+"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Morning-shoot
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="name@mail.com"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>//
                </div>

              </div>
            </Card> 

            <Button onClick={() => navigate('/eventManager/createEvent2')}>
  Tasks
</Button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
