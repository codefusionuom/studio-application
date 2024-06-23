import React, { useEffect, useState } from "react";
import {
  Typography,
  Select,
  Option,
  Input,
  Button,
  Card,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
  PopoverHandler,
  Popover,
  PopoverContent,
} from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import CardEvent from "../../components/eventManager/cardEvent";
import Eventform from "../../components/eventManager/event_formik_form";
import { DayPicker } from "react-day-picker";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
const EventManagerEvents2 = () => {
  const location = useLocation();
  console.log("id : " + location.state.eventId);
  const eventId = location.state.eventId;


  const [date, setDate] = React.useState();
  const [customer, setCustormer] = React.useState({});
  const [eventDetails, setEventDetails] = React.useState({});
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(1);
  const [mode, setMode] = useState(false);
  const [isStatusError, setIsStatusError] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
  // const [event, setEvent] = useState({
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   mobilePhone: "",
  //   address: "",
  // });

  useEffect(() => {
    getEventDetail(eventId);
  }, []);

  const getEventDetail = async (eventId) => {
    const response = await axios.get(
      `http://localhost:5000/eventManager/eventDetails/${eventId}`
    );
    console.log(response.data);
    setCustormer(response.data.customer);
    setEventDetails(response.data);
    // console.log("event Details :"+eventDetails.serviceType);
  };

  // const handleOpen = () => setOpen((cur) => !cur);
  

  // add handler
  // const handleAdd = () => {
  //   console.log(customer, "add");
  //   setEvent();
  //   setMode(false);
  //   setOpen(true);
  // };
  // //edit handler
  // const handleEdit = () => {
  //   console.log(customer, "edit");
  //   setMode(true);
  //   setOpen(true);
  //   setEvent(eventDetails);
  // };

  return (
    <div>
      <div className="flex  justify-evenly items-center w-full h-[140px] bg-cl-4 rounded font-lato text-xl text-cl-1   p-4 pt-2">
        <Typography
          variant="paragraph"
          color="blue-gray"
          className="text-3xl mr-80 flex items-center   ml-0"
        >
          Event
        </Typography>

        {/* <Typography
          variant="paragraph"
          color="blue-gray"
          className="text-3xl mr-80 flex items-center  "
        >
          WP-124
        </Typography> */}

        <Button
          className="flex items-center gap-3 "
          color="blue"
          onClick={() => {
            handleOpen()
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          Edit
        </Button>
          <Dialog open={open} handler={handleOpen}>
            <DialogHeader>Its a simple dialog.</DialogHeader>
            <DialogBody>
              <div div className="flex space-x-2 justify-between w-11/12">
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
                      // error={isServiceTypeError ? "true": null}
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
                          // error={isDateError ? "true": null}
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
                  <div className="flex relative w-full h-2/3 mt-8"></div>
                </div>
              </div>
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button variant="gradient" color="green" onClick={handleOpen}>
                <span>Confirm</span>
              </Button>
            </DialogFooter>
          </Dialog>
          
      </div>
      <div className="h-8"></div>

      <div className="flex space-x-4 justify-between">
        <CardEvent title="ggsgs" width="[400px]" height="[160px]">
          <span className="font-bold">Customer</span>

          {/* <div className="flex">
            
          </div> */}
          <div className="flex items-center mt-5">
            <span className="">
              {customer.firstname + " " + customer.lastname + "  "}
            </span>
            <span className="ml-6">Wedding Photography</span>
          </div>

          <div className="flex items-center">
            <span className="">{customer.email}</span>
            <span className="ml-6">Upcoming</span>
          </div>
        </CardEvent>

        {/* <div className="flex justify-center items-center w-[314px] h-[140px] bg-cl-4 rounded font-lato text-xl text-cl-1">
         <Typography variant="h5" color="blue-gray" className="text-3xl">
              
              </Typography>
        </div> */}
        <CardEvent width="[800px]" height="[160px]">
          <div className="flex justify-between  p-4">
            <div className="">
              <div className="flex items-center">
                <span className="font-bold">Service Type:</span>
                <span className="ml-2">{eventDetails.serviceType}</span>
              </div>

              <div className="flex items-center">
                <span className="font-bold">Status:</span>
                <span className="ml-2">{eventDetails.status}</span>
              </div>

              <div className="flex items-center">
                <span className="font-bold">Date:</span>
                {/* <span className="ml-2">{eventDetails.date.slice(0,10)}</span> */}
              </div>
            </div>
            {/* <div className="relative ml-10">
              <div className="flex items-center">
                <span className="font-bold">Status</span>
                <span className="ml-2">{eventDetails.status}</span>
              </div>
            </div> */}
          </div>
        </CardEvent>
        {/* <Dialog
          size="lg"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none"
        >
          <Eventform
            handleOpen={handleOpen}
            initialvalues={event}
            setEvent={setEvent}
            mode={mode}
          />
        </Dialog> */}
      </div>
      <div className="h-8"></div>
    </div>
  );
};

export default EventManagerEvents2;
