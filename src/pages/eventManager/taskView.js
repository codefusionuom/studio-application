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
  CardFooter,
  CardBody,
  TabsHeader,
  Tabs,
  Tab,
  CardHeader,
  Tooltip,
  IconButton,
  Avatar,
  Chip,
} from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import { format} from "date-fns";
import ErrorDisplayWindow from "../../components/eventManager/errorDisplayWindow";
import SearchForm from "../../components/eventManager/searchForm";
import EmployeeSearchForm from "../../components/eventManager/employeeSearchForm";
import DisplayListWithAvatar from "../../components/eventManager/listDisplayWithAvatar";
import { PencilIcon } from "@heroicons/react/24/outline";
import EventCalender from "../../components/eventManager/eventCalender";

const TaskView = () => {
  const location = useLocation();
  console.log("id : " + location.state.taskId);
  const taskId = location.state.taskId;

  const [selectedEvent, setSelectedEvent] = React.useState([]);
  const [notFormatedDate, setNotFormatedDate] = React.useState();
  const [date, setDate] = React.useState();
  const [taskDetails, setTaskDetails] = React.useState({});
  const [eventTypes, setEventTypes] = React.useState([]);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(1);
  const [mode, setMode] = useState(false);
  let [eventList, setEventList] = React.useState([]);
  const [isStatusError, setIsStatusError] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [existError, setExistError] = useState(null);
  const [openEventModal, setOpenEventModal] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [assignedEmployees, setAsssignedEmployees] = useState([]);
  const [taskName, setTaskName] = useState();

  const [openEmpModal, setOpenEmpModal] = React.useState(false);
  let [employeeList, setEmployeeList] = React.useState([]);
  const [asignedEmployeesList, setAsignedEmployeesList] =
    useState([]); //here
    // const today = new Date();

  const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Monitored",
      value: "monitored",
    },
    {
      label: "Unmonitored",
      value: "unmonitored",
    },
  ];

  const TABLE_HEAD = [
    "Employee Name",
    "Department",
    "Contact No",
    "Assigned Date",
    "",
  ];

  useEffect(() => {
    console.log("task details -", taskDetails);
    getTaskDetail(taskId);
    getAssignedEmployees(taskId);
    setDescription(taskDetails.description)
    console.log("taskDetails.description=================== ",taskDetails.description)
    // if (Object.keys(taskDetails).length === 0) {
    //   console.log("Empty task")
    // }
   
    console.log(
      "****************************asignedEmployeesList",asignedEmployeesList);
    console.log("task details ------", taskDetails.id);
  }, []);

  useEffect(() => {
    console.log("date after update", date);
  
  }, [date , description]);

  useEffect(() => {

    console.log('Updated taskDetails:', taskDetails);
    console.log(
      "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!asignedEmployeesList",asignedEmployeesList);
  }, [taskDetails, asignedEmployeesList ])
  


  const getTaskDetail = async (taskId) => {
    await axios
      .get(`http://localhost:5000/eventManager/tasks/task-dettail/`, {
        params: { taskId: taskId },
      })
      .then((response) => {
        console.log("taskkkyy detaileeesss :",response.data.task.id);
        setTaskDetails(response.data.task);
        console.log('id of taskDetails ||||||||||||||' , taskDetails)
        console.log("taskDetails.description=================== ",taskDetails.description)

        console.log("date :", response.data.task.date);
      })
      .catch((error) => {
        console.log(error);
        setExistError(error.message);
        console.log("error :", error.message);
      });
  };

  const getEmployees = () => {
    const response = axios
      .get("http://localhost:5000/employeeManager/getEmployees" , {
        params: { taskId: taskId },
      })
      .then((res) => {
        console.log(res.data);
        setEmployeeList(res.data);
      })
      .catch((error) => {
        setExistError(error.message);
        console.log(error);
      });
  };

  const updateTask = async (taskId) => {
    asignedEmployeesList.map((asignedEmployee) =>  console.log("asignedEmployeesList[0].id " ,asignedEmployee.id));
    let empIdList = asignedEmployeesList
    .filter((employee) => employee.id)
    .map((asignedEmployee) => asignedEmployee.id);
    console.log("empIdList :" , empIdList)


  console.log("empIdList");
  console.log(empIdList)
  
    const updatedTaskData = {
    //  selectedEvent.id === id ?? undefined : taskId : taskId ,
    ...(taskDetails.id === selectedEvent.id? { } : {eventId : selectedEvent.id }),
    // taskName: "New Task Name",
    ...(taskDetails.taskName === taskName ? { } : {taskName : taskName }),
    // // department: "photography",
    // ...(taskDetails.department === selectedEvent.department ? { } : {department : selectedEvent.department }),
    // status: "Upcoming",
    ...(taskDetails.status === status ? { } : {status : status }),
    // description: "Updated task description",
    ...(taskDetails.description === description ? { } : {description : description }),
    // date: "2023-07-02T10:00:00Z",
    ...(taskDetails.date === date ? { } : {date : date }),
      employeeIdList: empIdList,
    };
    const response = await axios
      .post(
        `http://localhost:5000/eventManager/tasks/updateTask/`,updatedTaskData, {
          params: { taskId: taskId }, 
        }
      )
      .then((response) => {
        console.log("updateeeeeeeeeeeeeeeee :", response);
        

        // setTaskDetails(response.data.task);
        // console.log("date :" , response.data.task.date);
      })
      .catch((error) => {
        console.log(error);
        setExistError(error.message);
        console.log("error :", error.message);
      });
    // console.log("event Details :"+eventDetails.serviceType);
  };

  const getAssignedEmployees = async (taskId) => {
    const response = await axios
      .get(
        `http://localhost:5000/eventManager/task/assigned-employees/${taskId}`
      )
      .then((response) => {
        const employees =
        response.data.assignedTasks === "undefined"
        ? ""
        : response.data.assignedTasks.map(
          (assignedTask) => assignedTask.employee
        );
        console.log("employees from getAssignedEmployees:", employees);
        setAsignedEmployeesList(employees);
        setAsssignedEmployees(employees);
        console.log("Assigned employees :", assignedEmployees);

        // setTaskDetails(response.data.task);
        // console.log("date :" , response.data.task.date);
      })
      .catch((error) => {
        console.log(error);
        setExistError(error.message);
        console.log("error :", error.message);
      });
    // console.log("event Details :"+eventDetails.serviceType);
  };

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

  const getEventCategories = () => {
    axios
      .get("http://localhost:5000/eventManager/event-categories")
      .then((res) => {
        setEventTypes(res.data.serviceTypes); // setEventList(events);
      })
      .catch((error) => {
        setExistError(error.message);
        console.log(error);
      });
  };


const formatDateToISO = (dateString) => {
  const date = new Date(dateString);
  // Set the time to 16:00:00
  date.setUTCHours(16, 0, 0, 0);
  return date.toISOString(); // This converts to the format YYYY-MM-DDTHH:mm:ss.sssZ
};

  const handleOpenEmpModal = () => setOpenEmpModal(!openEmpModal);

  const handleOpenEventModal = () => setOpenEventModal(!openEventModal);

  const handleOpen = () => setOpen(!open);
  return (
    // Object.keys(taskDetails).length === 0 ?
    existError != null ? (
      <ErrorDisplayWindow errorMsg={existError} />
    ) : (
      <div className="flex flex-col">
        <div className="flex  justify-evenly items-center w-full h-[140px] bg-cl-4 rounded font-lato text-xl text-cl-1   p-4 pt-2">
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-3xl mr-80 flex items-center   ml-0"
          >
            Task
          </Typography>

          <Button
            className="flex items-center gap-3 "
            color="blue"
            onClick={() => {
              handleOpen();
            }}
          >
            Edit Task
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
          </Button>
          {/* <Button
            className="flex items-center gap-3 "
            color="blue"
            onClick={() => {
              handleOpen();
            }}
          >
            Test
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
          </Button> */}
         
          <Dialog
          open={open} 
          handler={handleOpen}
          // style={innerHeight}
          style={{ height: '80%' }}    // height of dialog box changes
          className=""
                      // size="md"
          >
            <DialogHeader className="flex justify-center">
              Edit Task
            </DialogHeader>
            <DialogBody className=""       // dialog body 
            >             
              
              <tr div className="flex space-x-2 justify-between  items-baseline w-11/12">
                <div className="flex flex-col gap-6 mb-1 p-4 w-3/6">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="-mb-3"
                    placeholder="Task Name"
                  >
                    Task Name
                  </Typography>
                  <Input
                  defaultValue={taskDetails.taskName}
                    size="lg"
                    placeholder={taskDetails.taskName}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => {setTaskName(e.target.value);
                      console.log(taskName)
                    }}
                  />
                  <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    Select Event
                  </h6>
                  <Select
                    // label="Select Version"
                    value={`${selectedEvent.serviceName ?? "Select an event"} ${
                      selectedEvent.serviceName ? " -  Mr." : ""
                    }${selectedEvent.customer?.firstname ?? ""}`}
                    className="relative h-11 w-full min-w-[200px] overflow-hidden ..."
                    onClick={() => {
                      console.log("sele:" + selectedEvent);
                      console.log("Heyyyyyyyyyyy clicked");
                      // getEventCategories();
                      getEvents();
                      handleOpenEventModal();
                    }}
                  >
                    {eventList.map((event) => (
                      <Option value={event.service['serviceName']}>
                        {event.service['serviceName']}
                      </Option>
                    ))}
                  </Select>
                  <div className="relative  w-full min-w-[200px]">
                    <Dialog
                      open={openEventModal}
                      handler={handleOpenEventModal}
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
                          // resultDisplayfield1={"serviceType"}
                          resultDisplayfield1={'serviceName'}
                          resultDisplayfield2={"serviceDate"}
                          selectedItem={setSelectedEvent}
                          setOpen={setOpenEventModal}
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
                    <DialogFooter 
                      // className="pt-52"
                      >
                        <Button
                          variant="text"
                          color="red"
                          onClick={handleOpenEventModal}
                          className="mr-1"
                        >
                          <span>Cancel</span>
                        </Button>
                        <Button
                          variant="gradient"
                          color="green"
                          onClick={handleOpenEventModal}
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
                      <Option value="Upcoming">Upcoming</Option>
                      <Option value="Paused">Paused</Option>
                      <Option value="Done">Done</Option>
                      <Option value="Rejected">Rejected</Option>
                    </Select>
                  </div>
                  <h6 className="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    Date :
                  </h6>

                  <Input
                  // defaultValue={format(new Date(taskDetails?.date), "yyyy-MM-dd")}
                  // disabled={{ before: today }}
                    label="Date"
                    size="lg"
                    type="date"
                    placeholder="DD/MM/YYYY"
                    value={notFormatedDate} // Ensure to bind the value to state
                    onChange={(e) => {
                      setNotFormatedDate(e.target.value)
                      setDate( formatDateToISO(e.target.value));
                      console.log("date" , e.target.value)
                      console.log("date" , date)
                    }}  

                  />

                  {/* <div className="flex justify-center ">
                  <DayPicker                                                            // DayPicker
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="w-full border-0 max-w-md max-h-min h-20" // Make the DayPicker full width
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
                </div> */}
                </div>

                <div className=" flex flex-col  gap-6 w-3/6  ">
                  <div className="   w-full h-2/3 ">
                  <h6 className="block  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                  Description
                  </h6>
                    <Textarea
                    defaultValue={taskDetails.description}
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
                    {/* <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Description
                    </label> */}
                  </div>
                  <h6 className="block  font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    Assigned Employees
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
                              {employee.serviceType}
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
                          resultDisplayfield2={"empDepartment"}
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
                            <td></td>
                            <td></td>
                          </tr>
                        </table>
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
                  <div className="bg-gray-50 w-full max-h-60 h-60  overflow-y-auto  overflow-x-hidden">
                <DisplayListWithAvatar
                  itemList={asignedEmployeesList}
                  setAsignedEmployeesList ={setAsignedEmployeesList}

                  displayField1={"empName"}
                  displayField2={"empDepartment"}
                />
              </div>
                  {/* <div className="flex relative w-full h-2/3 mt-8"></div> */}
        </div>
              </tr>
              {/* <Button
              onClick={() => {
                console.log("selected date " , date)

                // let empIdList = asignedEmployeesList
                // .filter((employee) => employee.id)
                // .map((asignedEmployee) => asignedEmployee.id);
                // console.log("empIdList :" , empIdList)
                
                console.log("description ",description)
                // console.log("selected date " , )
              }}
              >Test</Button> */}
            </DialogBody>
            <DialogFooter >
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button variant="gradient" color="green" onClick={()=>{
                handleOpen();
                updateTask(taskId)
                }}>
                <span>Update</span>
              </Button>
            </DialogFooter>
          </Dialog>
        </div>
        <div className="h-8"></div>

        <div className="  bg-cl-4  rounded-md">
          {Object.keys(taskDetails).length === 0 &&
          taskDetails.constructor === Object ? ( //checks for empty object and  display animate pulse untill get an object
            <tr className="flex justify-center items-center min-h-96">
              <div className=" animate-pulse  ">
                <Typography
                  as="div"
                  variant="h1"
                  className="mb-4 h-3 w-56 rounded-full bg-gray-300"
                >
                  &nbsp;
                </Typography>
                <Typography
                  as="div"
                  variant="paragraph"
                  className="mb-2 h-2 w-96 rounded-full bg-gray-300"
                >
                  &nbsp;
                </Typography>
                <Typography
                  as="div"
                  variant="paragraph"
                  className="mb-2 h-2 w-96 rounded-full bg-gray-300"
                >
                  &nbsp;
                </Typography>
                <Typography
                  as="div"
                  variant="paragraph"
                  className="mb-2 h-2 w-96 rounded-full bg-gray-300"
                >
                  &nbsp;
                </Typography>
                <Typography
                  as="div"
                  variant="paragraph"
                  className="mb-2 h-2 w-96 rounded-full bg-gray-300"
                >
                  &nbsp;
                </Typography>
              </div>
            </tr>
          ) : (
            <div>
              <div className="flex  justify-between ">
                <div className="flex      w-full  p-4">
                  <div className="flex flex-col">
                    <span className="font-bold my-1.5">Task Name</span>

                    <span className="font-bold my-1.5">Service Type</span>

                    <span className="font-bold my-1.5">Date</span>
                    <span className="font-bold my-1.5">Department</span>
                  </div>

                  <div className="flex flex-col ">
                    <span className="ml-2 my-1.5">
                      : {taskDetails.taskName}
                    </span>

                    <span className="ml-2 my-1.5">
                      : {taskDetails.serviceType}
                    </span>

                    <span className="ml-2 my-1.5">
                      {/* <span className="ml-2">{taskDetails.date.slice(0,10)}</span> */}
                      :{" "}
                      {taskDetails.date
                        ? format(new Date(taskDetails.date), "yyyy-MM-dd")
                        : "yyyy-mm-dd"}
                    </span>

                    <span className="ml-2 my-1.5">
                      : {taskDetails.department}
                    </span>
                  </div>
                </div>

                <div className="flex  flex-col  p-4 w-full ">
                  <div className="flex   w-full">
                    <div className="flex flex-col">
                      <span className="font-bold my-1.5">Status</span>

                      <span className="font-bold my-1.5">Description</span>
                    </div>

                    <div className="flex flex-col  ">
                      <span className="ml-2 my-1.5">
                        : {taskDetails.status}
                      </span>
                      <span className="ml-2 my-1.5">: </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 w-11/12 max-h-80 h-60 overflow-y-auto  p-4">
                    {taskDetails.description}
                  </div>
                </div>
              </div>

              <Card className="h-full w-full p-4">
                <CardHeader
                  floated={false}
                  shadow={false}
                  className="rounded-none"
                >
                  {/* <div className="mb-8 flex items-center justify-between gap-8"> */}
                  <div className=" flex items-center justify-between gap-8">
                    <div>
                      <Typography variant="h5" color="blue-gray">
                        Assigned Employees
                      </Typography>
                    </div>
                    {/* <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Button className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button>
          </div> */}
                  </div>
                  {/* <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
          </div> */}
                </CardHeader>
                {assignedEmployees.length === 0 ? (
                  <tr className="flex justify-center items-center p-8 bg-blue-gray-50 m-4">
                    <td className="">
                      <Typography variant="h3">
                        No employees assigned !{" "}
                      </Typography>

                      <Typography
                        variant="h6"
                        className="flex justify-center mt-4"
                        color="green"
                      >
                        {" "}
                        <Button
                          variant="outlined"
                          className="flex justify-center rounded-full"
                          color="green"
                          onClick={() => {
                            handleOpen();
                          }}
                        >
                          Assign Now !{" "}
                        </Button>{" "}
                      </Typography>
                    </td>
                  </tr>
                ) : (
                  <CardBody className="  px-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left ">
                      <thead>
                        <tr>
                          {TABLE_HEAD.map((head) => (
                            <th
                              key={head}
                              className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                            >
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                              >
                                {head}
                              </Typography>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="  ">
                        {assignedEmployees.map(
                          (
                            {
                              id,
                              empName,
                              empDepartment,
                              empNumber,
                              createdAt,
                            },
                            index
                          ) => {
                            const isLast =
                              index === assignedEmployees.length - 1;
                            const classes = isLast
                              ? "p-4"
                              : "p-4 border-b border-blue-gray-50";

                            return (
                              <tr key={id} className="">
                                <td className={classes}>
                                  <div className="flex items-center gap-3">
                                    <Avatar
                                      src={
                                        "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                                      }
                                      alt={empName}
                                      size="sm"
                                    />
                                    <div className="flex flex-col">
                                      <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                      >
                                        {empName}
                                      </Typography>
                                      {/* <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {empDepartment}
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
                                      {empDepartment}
                                    </Typography>
                                    {/* <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {createdAt}
                        </Typography> */}
                                  </div>
                                </td>
                                {/* <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={online ? "online" : "offline"}
                          color={online ? "green" : "blue-gray"}
                        />
                      </div>
                    </td> */}
                                <td className={classes}>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    {empNumber}
                                  </Typography>
                                </td>
                                <td className={classes}>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    {format(new Date(createdAt), "yyyy-MM-dd")}
                                  </Typography>
                                </td>
                                <td className={classes}>
                                  <Tooltip content="Edit User">
                                    <IconButton variant="text">
                                      <PencilIcon className="h-4 w-4" />
                                    </IconButton>
                                  </Tooltip>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </CardBody>
                  
                )}
                {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <Typography variant="small" color="blue-gray" className="font-normal">
                Page 1 of 10
              </Typography>
              <div className="flex gap-2">
                <Button variant="outlined" size="sm">
                  Previous
                </Button>
                <Button variant="outlined" size="sm">
                  Next
                </Button>
              </div>
            </CardFooter> */}
              </Card>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default TaskView;
