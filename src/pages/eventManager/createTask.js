import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardBody,
  Typography,
  Select,
  Option,
  Input,
  Button,
  DialogFooter,
  DialogBody,
  DialogHeader,
  Dialog,
} from "@material-tailwind/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { DayPicker } from "react-day-picker";
import CardEvent from "../../components/eventManager/cardEvent";
import axios from "axios";
import SearchForm from "../../components/eventManager/searchForm";
import ErrorDisplayWindow from "../../components/eventManager/errorDisplayWindow";
import EmployeeSearchForm from "../../components/eventManager/employeeSearchForm";
import DisplayListWithAvatar from "../../components/eventManager/listDisplayWithAvatar";
import { ToastError, ToastSuccess } from "../customerManager/ToastAlert";

const CreateTask = () => {
  //for modal handling
  const [open, setOpen] = React.useState(false);
  const [openEmpModal, setOpenEmpModal] = React.useState(false);
  const [event, setEvent] = useState("");

  let [eventList, setEventList] = React.useState([]);
  let [employeeList, setEmployeeList] = React.useState([]);
  // const [asignedEmployeesIdList, setAsignedEmployeesIdList] = useState([]);
  const [asignedEmployeesList, setAsignedEmployeesList] = useState([
    // {
    //   empId: "",
    //   empName: "",
    //   empDepartment  : "",
    // },
  ]);

  const [date, setDate] = React.useState();
  const [selectedEvent, setSelectedEvent] = React.useState([]);
  const [eventTypes, setEventTypes] = React.useState([]);
  const [description, setDescription] = React.useState('');
  const [taskName, setTaskName] = React.useState([]);
  const [isStatusError, setIsStatusError] = useState(false);
  const [existError, setExistError] = React.useState(null);
  const handleOpen = () => setOpen(!open);
  const handleOpenEmpModal = () => setOpenEmpModal(!openEmpModal);
  const [status, setStatus] = useState("");
  const [reload, setReload] = useState(false);
  const today = new Date();

  useEffect(() => {
    setTaskName("");
    setDescription("");
    setStatus("")
    setDate()
    setSelectedEvent("")
    // console.log("reload",reload)
    setAsignedEmployeesList([])
  }, [reload])
  
  // useEffect(() => {}, []);

  // const getEvents = () => {
  //   // try {
  //   console.log("kkkkkkkkkkkkkkkkkkkk");
  //   const response = axios
  //     .get("http://localhost:5000/eventManager/all-events")
  //     .then((res) => {
  //       // setExistError("error.message");
  //       const events = res.data.events;
  //       console.log("events: ", events);
  //       console.log("custormer name :" + events[0].customer.firstname);
  //       setEventList(events);
  //     })
  //     .catch((error) => {
  //       console.log("got error: ", error.message);
  //       setExistError(error.message);
  //       console.log(error);
  //     });
    // } catch (error) {
    //   console.log("got error: ", error.message);
    //   // setExistErrorError(error.message);
    //   console.log(error);
    // }
    // console.log("response: ", response);
    // console.log(response.events);
  // };
  const getEvents = () => {
    // try {
    console.log("kkkkkkkkkkkkkkkkkkkk");
    const response = axios
      .get("http://localhost:5000/eventManager/all-events")
      .then((res) => {
        // setExistError("error.message");
        const events = res.data.events;
        console.log("events: ", events);
        console.log("eventsssssssssssssssssssssss :" + events[0]);
        setEventList(events);
      })
      .catch((error) => {
        console.log("got error: ", error.message);
        setExistError(error.message);
        console.log(error);
      });
  };

  const createTask = () => {
    console.log("description" + description);
    console.log("select event^^^^^^^^^^^^^^^ " + selectedEvent.id);
    asignedEmployeesList.map((e) =>console.log("asignedEmployeesList^^^^^^^^^^^^^^^ " + e.id) )
    // asignedEmployeesList.map((asignedEmployee) => setAsignedEmployeesIdList((preEmpIdList) =>[ ...preEmpIdList , asignedEmployee.id])  )
    let empIdList = asignedEmployeesList
      .filter((employee) => employee.id)
      .map((asignedEmployee) => asignedEmployee.id);
    console.log("empIdList");
    console.log(empIdList)
    // console.log("asignedEmployeesIdList: ", asignedEmployeesIdList)
    // try {
    console.log("taskkkkkk");

    const response = axios
      .post("http://localhost:5000/eventManager/tasks/create", {
        eventId: selectedEvent.id,
        taskName: taskName,
        serviceType: "photography",
        department: "photography",
        status: status,
        description: description,
        employeeIdList: empIdList,
        date: date,
      })
      .then((res) => {
        // setExistError("error.message");
        // const task = res.data.task;
        console.log("task: ", res);

        if (res.status === 200) {
         setReload((prev)=>!prev)
          ToastSuccess(" Task Created Successfully!")
        } else {
         
        ToastError(" Task creation was not Successfull! Try again");
          
        }
      })
      .catch((error) => {
        console.log("got error: ", error.message);
        setExistError(error.message);
        console.log(error);
        ToastError(error.message)
      });
  };

  const getEventCategories = () => {
    axios
      .get("http://localhost:5000/eventManager/event-categories")
      .then((res) => {
        // setEventTypes(res.data.serviceTypes); // setEventList(events);
        setEventTypes(res.data); // setEventList(events);
      })
      .catch((error) => {
        setExistError(error.message);
        console.log(error);
        ToastError(error.message)

      });
  };
  const getEmployees = () => {
    const response = axios
      .get("http://localhost:5000/employeeManager/getEmployees")
      .then((res) => {
        console.log(res.data);
        setEmployeeList(res.data);
      })
      .catch((error) => {
        ToastError(error.message)
        // setExistError(error.message);
        console.log(error);
      });
  };

  console.log("Exist error :" + existError);
  console.log("Date :" + date);
  // return existError != null ? (
  //   <ErrorDisplayWindow errorMsg={existError} />
  // ) :
  //  (
 return  <div className="bg-cl-4 mt-8 p-4 px-10">
      <Card className="mt-6 w-full bg-gray-400 bold">
        <CardBody>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 text-2xl font-bold "
          >
            Create Task
          </Typography>
        </CardBody>
      </Card>
      <form className="">
        <tr className="flex   mt-8">
          <div className="  w-full flex justify-center">
            <div className="flex flex-col gap-8 mb-1 p-4 w-8/12 justify-center">
            
              <Typography
                variant="h6"
                color="blue-gray"
                className="-mb-3"
                placeholder="Task Name"

              >
                Task Name
              </Typography>
              <Input
                size="lg"
                
                placeholder="Task Name"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => setTaskName(e.target.value)}
              />
              <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                Select Event
              </h6>
              <div className="relative h-11 w-full min-w-[200px]">
              <Select
                    // label="Select Version"
                    
                    value={`${selectedEvent?.service?.serviceName ?? "Select an event"} ${
                      selectedEvent?.service?.serviceName ? " -  Mr." : ""
                    }${selectedEvent.customer?.firstname ?? ""}`}
                    className="relative h-11 w-full min-w-[200px] overflow-hidden ..."
                    onClick={() => {
                      console.log("sele:" + selectedEvent);
                      console.log("Heyyyyyyyyyyy clicked");
                      // getEventCategories();
                      getEvents();
                      handleOpen();
                    }}
                  >
                    {eventList.map((event) => (
                      <Option value={event.service['serviceName']}>
                        {event.service['serviceName']}
                      </Option>
                    ))}
                  </Select>
                <Dialog
                  open={open}
                  handler={handleOpen}
                  maxWidth="2xl"
                  width="full"
                >
                  <DialogHeader className="flex justify-center">
                    Select an Event
                  </DialogHeader>
                  <DialogBody>
                    <SearchForm
                      eventList={eventList}
                      eventTypes={eventTypes}
                      // resultDisplayfield1={"serviceName"}
                      // resultDisplayfield2={"date"}
                      resultDisplayfield1={'serviceName'}
                      resultDisplayfield2={"serviceDate"}
                      selectedItem={setSelectedEvent}
                      setOpen={setOpen}
                    />

                    <table className="w-full min-w-max table-auto text-left">
                      <tr>
                        <td>
                          <div className="flex w-full shrink-0 gap-2 md:w-max h-11">
                            <div className="w-full md:w-1/2 "></div>
                          </div>
                        </td>
                        <td>
                          <div className="  w-full min-w-[200px]">
                            <div className="w-full"></div>
                            {/* <Select label="Select Version" className=" h-11">
                    <Option>Material Tailwind HTML</Option>
                    <Option>Material Tailwind React</Option>
                    <Option>Material Tailwind Vue</Option>
                    <Option>Material Tailwind Angular</Option>
                    <Option>Material Tailwind Svelte</Option>
                    </Select> */}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {/* <Card className=" w-4/5 bg-gray-400 flex align-top z-0">
                   <CardBody>
                    <Typography variant="lead" color="blue-gray" className=" ">
                      Emp-101
                    </Typography>
                      </CardBody>
                    </Card>
                    <Card className="mt-5 w-4/5 bg-gray-400 flex align-top">
                      <CardBody>
                        <Typography
                          variant="paragraph"
                          color="blue-gray"
                          className="mb-2 "
                        >
                          Emp-101
                        </Typography>
                      </CardBody>
                    </Card> */}
                        </td>
                        <td></td>
                      </tr>
                    </table>

                    {/* <div className="flex space-x-4">
                      <div>
                        
                      
                      </div>
                      <div>
                      
                        
                      </div>
                    </div> */}
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
                    <Button
                      variant="gradient"
                      color="green"
                      onClick={handleOpen}
                    >
                      <span>Confirm</span>
                    </Button>
                  </DialogFooter>
                </Dialog>
              </div>

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
                        setStatus(value);
                        console.log("Selected status:", value);
                        console.log("Status: ", status);
                      }}
                      // value={status ? "Select Status" :  status}
                      value={`${status ?? "Select an event"}`}
                      // placeholder={"selected"}
                      // defaultValue={"Select Status"}
                    >
                      {/* 'Upcoming ','Paused', 'Done' , "Closed" */}
                      <Option value="Upcoming">Upcoming</Option>
                      <Option value="Paused">Paused</Option>
                      <Option value="Done">Done</Option>
                      <Option value="Rejected">Rejected</Option>
                    </Select>
              </div>
              <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                Employee
              </h6>
              <div className="relative h-11 w-full min-w-[200px]">
                <Select
                  onChange={() => {}}
                  label="Add Employees"
                  className="relative h-11 w-full min-w-[200px]"
                  onClick={() => {
                    getEmployees();
                    console.log("Heyyyyyyyyyyy clicked");
                    handleOpenEmpModal();
                    console.log(asignedEmployeesList.id);
                  }}
                >
                  <span></span>
                  {/* {employeeList.map((employee) => (
                            <Option value={employee.empName}>
                              {employee.serviceName}
                            </Option>
                          ))} */}
                </Select>
                <Dialog
                  open={openEmpModal}
                  handler={handleOpenEmpModal}
                  maxWidth="2xl"
                  width="full"
                  size="xl"
                >
                  <DialogHeader className="flex justify-center">
                    Add Employees
                  </DialogHeader>
                  <DialogBody>
                    <EmployeeSearchForm
                      title="Add Employees"
                      eventList={employeeList}
                      eventTypes={eventTypes}
                      resultDisplayfield1={"empName"}
                      resultDisplayfield2={"department"}
                      asignedEmployeesList={asignedEmployeesList}
                      setAsignedEmployeesList={setAsignedEmployeesList}
                    />
                    <table className="w-full min-w-max table-auto text-left">
                      <tr>
                        <td>
                          <div className="flex w-full shrink-0 gap-2 md:w-max h-11">
                            <div className="w-full md:w-1/2 "></div>
                          </div>
                        </td>
                        <td>
                          <div className="  w-full min-w-[200px]">
                            <div className="w-full"></div>
                            {/* <Select label="Select Version" className=" h-11">
                          <Option>Material Tailwind HTML</Option>
                          <Option>Material Tailwind React</Option>
                          <Option>Material Tailwind Vue</Option>
                          <Option>Material Tailwind Angular</Option>
                          <Option>Material Tailwind Svelte</Option>
                           </Select> */}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {/* <Card className=" w-4/5 bg-gray-400 flex align-top z-0">
                          <CardBody>
                            <Typography variant="lead" color="blue-gray" className=" ">
                              Emp-101
                            </Typography>
                              </CardBody>
                            </Card>
                            <Card className="mt-5 w-4/5 bg-gray-400 flex align-top">
                              <CardBody>
                                <Typography
                                  variant="paragraph"
                                  color="blue-gray"
                                  className="mb-2 "
                                >
                                  Emp-101
                                </Typography>
                              </CardBody>
                            </Card> */}
                        </td>
                        <td></td>
                      </tr>
                    </table>

                    {/* <div className="flex space-x-4">
                        <div>
                          
                        
                        </div>
                        <div>
                        
                          
                        </div>
                        </div> */}
                  </DialogBody>
                  <DialogFooter>
                    <Button
                      variant="text"
                      color="red"
                      onClick={handleOpenEmpModal}
                      className="mr-1"
                    >
                      <span>Cancel</span>
                    </Button>
                    <Button
                      variant="gradient"
                      color="green"
                      onClick={handleOpenEmpModal}
                    >
                      <span>Confirm</span>
                    </Button>
                  </DialogFooter>
                </Dialog>
              </div>
              <div className="bg-gray-50 w-full max-h-80 h-80">
                <DisplayListWithAvatar
                  itemList={asignedEmployeesList}
                  setAsignedEmployeesList ={setAsignedEmployeesList}

                  displayField1={"empName"}
                  displayField2={"empDepartment"}
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-8 mb-1 p-4 w-10/12 ">
              <div className="flex flex-col gap-6 mb-1 p-4 justify-center ">
                <h6 className="flex justify-center  -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                  Task date
                </h6>
                <div className="flex justify-center ">
                  <DayPicker
                  disabled={{ before: today }}
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="w-full border-0 max-w-xl" // Make the DayPicker full width
                    classNames={{
                      caption:
                        "flex justify-center py-4 mb-6 relative items-center text-lg", // Increase padding and font size
                      caption_label: "text-lg font-medium text-gray-900", // Increase font size
                      nav: "flex items-center",
                      nav_button:
                        "h-8 w-8 bg-transparent hover:bg-blue-gray-50 p-2 rounded-md transition-colors duration-300", // Increase size
                      nav_button_previous: "absolute left-2",
                      nav_button_next: "absolute right-2",
                      table: "w-full border-collapse",
                      head_row: "w-full flex font-medium text-gray-900",
                      head_cell: "w-full m-1 w-12 font-normal text-lg", // Increase size and font
                      row: "w-full flex w-full mt-3", // Increase margin top
                      cell: "w-full text-gray-600 rounded-md h-12 w-12 text-center text-lg p-0 m-1 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20", // Increase size and font
                      day: "w-full h-12 w-12 p-0 font-normal", // Increase size
                      day_range_end: "w-full day-range-end",
                      day_selected:
                        "w-full rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                      day_today: "w-full rounded-md bg-gray-200 text-gray-900",
                      day_outside:
                        "w-full day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                      day_disabled: "w-full text-gray-500 opacity-50",
                      day_hidden: "w-full invisible",
                    }}
                    components={{
                      IconLeft: ({ ...props }) => (
                        <ChevronLeftIcon
                          {...props}
                          className="h-6 w-6 stroke-2 w-full"
                        /> // Increase size
                      ),
                      IconRight: ({ ...props }) => (
                        <ChevronRightIcon
                          {...props}
                          className="h-6 w-6 stroke-2 w-full"
                        /> // Increase size
                      ),
                    }}
                  />
                </div>
                <div className=" flex relative  h-2/3 mt-8">
                  <textarea
                    className="peer h-full min-h-[200px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    onChange={(e) => setDescription(e.target.value)}
                  >
                    {" "}
                  </textarea>
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Description
                  </label>
                </div>
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                  // transition: Bounce,
                />
                ;
                <Button
                  fullWidth
                  onClick={() => createTask()}
                  variant="filled"
                  className="rounded-full "
                  color="green"
                >
                  Create Task
                </Button>
                {/* <Button
                  fullWidth
                  onClick={() =>  console.log("select event^^^^^^^^^^^^^^^ " + selectedEvent.id)}
                  variant="filled"
                  className="rounded-full "
                  color="green"
                >
                  Test
                </Button> */}
              </div>
            </div>
          </div>
        </tr>

       
      </form>
    </div>
  // );
};

export default CreateTask;
