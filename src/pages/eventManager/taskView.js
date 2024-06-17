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
import { DayPicker } from "react-day-picker";
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon, PencilIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { format, t } from "date-fns";
import ErrorDisplayWindow from "../../components/eventManager/errorDisplayWindow";
const TaskView = () => {
  const location = useLocation();
  console.log("id : " + location.state.taskId);
  const taskId = location.state.taskId;

  const [date, setDate] = React.useState();
  const [taskDetails, setTaskDetails] = React.useState({});
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(1);
  const [mode, setMode] = useState(false);
  const [isStatusError, setIsStatusError] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [existError, setExistError] = useState(null);
  const [open, setOpen] = useState(false);
  const [assignedEmployees, setAsssignedEmployees] = useState([]);
  
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
   
  const TABLE_HEAD = ["Employee Name", "Department", "Contact No", "Assigned Date" , "" ];
   
  // const TABLE_ROWS = [
  //   {
  //     img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
  //     name: "John Michael",
  //     email: "john@creative-tim.com",
  //     job: "Manager",
  //     org: "Organization",
  //     online: true,
  //     date: "23/04/18",
  //   },
  //   {
  //     img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
  //     name: "Alexa Liras",
  //     email: "alexa@creative-tim.com",
  //     job: "Programator",
  //     org: "Developer",
  //     online: false,
  //     date: "23/04/18",
  //   },
  //   {
  //     img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
  //     name: "Laurent Perrier",
  //     email: "laurent@creative-tim.com",
  //     job: "Executive",
  //     org: "Projects",
  //     online: false,
  //     date: "19/09/17",
  //   },
  //   {
  //     img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
  //     name: "Michael Levi",
  //     email: "michael@creative-tim.com",
  //     job: "Programator",
  //     org: "Developer",
  //     online: true,
  //     date: "24/12/08",
  //   },
  //   {
  //     img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
  //     name: "Richard Gran",
  //     email: "richard@creative-tim.com",
  //     job: "Manager",
  //     org: "Executive",
  //     online: false,
  //     date: "04/10/21",
  //   },
  // ];

  
  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    console.log("task details -" , taskDetails)
    getTaskDetail(taskId);
    getAssignedEmployees(taskId)
    // if (Object.keys(taskDetails).length === 0) {
    //   console.log("Empty task")
    // }
    console.log("task details -" , taskDetails)
  }, []);

  const getTaskDetail = async (taskId) => {
    const response = await axios.get(
      `http://localhost:5000/eventManager/tasks/task-dettail/${taskId}`
    ).then((response) => {
      console.log(response.data);
      setTaskDetails(response.data.task);
      console.log("date :" , response.data.task.date);
    }).catch((error) => {
      console.log(error)
      setExistError(error.message);
      console.log("error :" , error.message)
    })
  }
  const getAssignedEmployees = async (taskId) => {
    console.log("77777777777777777777777777777777777777777777777777")
    const response = await axios.get(
      `http://localhost:5000/eventManager/task/assigned-employees/${taskId}`
    ).then((response) => {
      console.log("employees :" ,response.data.assignedTasks);
      const employees = response.data.assignedTasks.map((assignedTask) => assignedTask.employee)
      setAsssignedEmployees(employees)
      console.log("Assigned employees :" , assignedEmployees)

      // setTaskDetails(response.data.task);
      // console.log("date :" , response.data.task.date);
    }).catch((error) => {
      console.log(error)
      setExistError(error.message);
      console.log("error :" , error.message)
    })
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
    // Object.keys(taskDetails).length === 0 ? 
    existError != null ? (
      <ErrorDisplayWindow errorMsg={existError} />
    ) :

    
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
   
      
                 
      <div className="  bg-cl-4  rounded-md">
        {Object.keys(taskDetails).length === 0 && taskDetails.constructor === Object?   //checks for empty object and  display animate pulse untill get an object
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
        : 
      <div className="flex  justify-between ">
        <div className="flex      w-full  p-4">
          <div className="flex flex-col">
            <span className="font-bold my-1.5">Task Name</span>

            <span className="font-bold my-1.5">Service Type</span> 

            <span className="font-bold my-1.5">Date</span>
            <span className="font-bold my-1.5">Department</span>
          </div>

          <div className="flex flex-col ">
            <span className="ml-2 my-1.5">: {taskDetails.taskName}</span>

            <span className="ml-2 my-1.5">: {taskDetails.serviceType}</span>

            <span className="ml-2 my-1.5">
            {/* <span className="ml-2">{taskDetails.date.slice(0,10)}</span> */}
              : {taskDetails.date ? format(new Date(taskDetails.date), "yyyy-MM-dd") : "yyyy-mm-dd"}
            </span>

            <span className="ml-2 my-1.5">: {taskDetails.department}</span>
          </div> 
        </div>

        <div className="flex  flex-col  p-4 w-full ">
          <div className="flex   w-full">

          <div className="flex flex-col">
            <span className="font-bold my-1.5">Status</span>

            <span className="font-bold my-1.5">Description</span>

          </div>

          <div className="flex flex-col  ">
            <span className="ml-2 my-1.5">: {taskDetails.status}</span>
            <span className="ml-2 my-1.5">: </span>
          </div>
          </div>

          <div className="bg-gray-50 w-11/12 max-h-80 h-60 overflow-y-auto  p-4">
          {taskDetails.description}
          </div>
        </div>
      </div>
      
        
      }
    <Card className="h-full w-full p-4">
      <CardHeader floated={false} shadow={false} className="rounded-none">
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
          <tbody className="  " >
            {assignedEmployees.map(
              ({id, empName, empDepartment, empNumber , createdAt}, index) => {
                const isLast = index === assignedEmployees.length -1 ;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={id} className="" >
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={"https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"} alt={empName} size="sm" />
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
                        {format(new Date(createdAt), "yyyy-MM-dd") }
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
              },
            )}
          </tbody>
        </table>
      </CardBody>
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
     
    </div>
  );
};

export default TaskView;
