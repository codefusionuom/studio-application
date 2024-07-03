import React from "react";
import { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  IconButton,
  Tooltip, 
  Input,
  PopoverContent,
  PopoverHandler,
  Popover,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import { DayPicker } from "react-day-picker";
import { Spinner } from "@material-tailwind/react";
import { format } from "date-fns";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ToastError, ToastSuccess } from "../customerManager/ToastAlert";
import { Pagination } from "../../components/pagination/pagination";

const TaskPage = () => {
  const [date, setDate] = React.useState('');
  const [loading, setLoading] = useState(false);
  let [taskList, setTaskList] = React.useState([]);
  const [active, setActive] = useState(1);
  const [results, setResults] = useState(0);
  let [selectedDateEventList, setselectedDateEventList] = React.useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    console.log("use effect");
  getTasks()
    //   getEvents();
  }, [active]);
  useEffect(() => {
    console.log("use effect");
 
    //   getEvents();
  }, [taskList , date]);

  const getTasks = () => {
    setLoading(true);
    axios.get(`http://localhost:5000/eventManager/tasks/all-tasks/?page=${active}&limit=8`)
    .then( (response) => {
      console.log("tasks -  : " , response)
    setTaskList(response.data.tasks)
    })
    .catch((error) => {
      console.log("error : " + error)
      ToastError("Could not get tasks")

    }) 
    .finally(() => {
      setLoading(false);
    });
  }
  const taskSearch = (taskName) => {
    axios
    .post("http://localhost:5000/eventManager/task/searchTaskName", {
      taskName: taskName,
    } ,{ params: { taskName: taskName, } })
    .then( (response) => {
      console.log("tasks -  : " , response)
      console.log(response.data);
      
    setTaskList(response.data)
    })
    .catch((error) => {
      console.log("error : " + error)
      ToastError(error.message)
    })
  }
  // const taskDelete = (taskId) => {
  //   console.log("tasks idddddddddddddd-  : " , taskId)
  //   axios
  //   .post("http://localhost:5000/eventManager/task/deleteTask", {
  //     // taskName: taskName,
  //   } ,{ params: { taskId: taskId, } })
  //   .then( (response) => {
  //     console.log("tasks -  : " , response)
  //     console.log("delete ")
  //     console.log(response.data);
  //     if(response.status === 200) {
  //       console.log("Status -  : " , response.status)
  //       console.log("data delete -  : " , response.data)
  //       handleRemoveItem(taskId);
  //       setTaskList(response.data)
  //     }
      
  //   })
  //   .catch((error) => {
  //     console.log("error : " + error)
  //   })
  // }
  // const taskDelete = async(taskId) => {
  //   console.log("tasks id -  : ", taskId);
  //   await axios
  //     .post("http://localhost:5000/eventManager/task/deleteTask", {}, { params: { taskId: taskId } })
  //     .then((response) => {
  //       console.log("tasks -  : ", response);
  //       console.log("delete ");
  //       console.log(response.data);
  //       if (response.status === 200) {
  //         console.log("Status -  : ", response.status);
  //         console.log("data delete -  : ", response.data);
  //         handleRemoveItem(taskId); // Update state in the frontend
  //         toast.success('Task deleted succesfully!', {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "colored",
  //           // transition: Bounce,
  //           });
  //           // ToastSuccess('Task deleted succesfully!')
  //       }
  //       else {
  //         ToastError("Could not delete the task")
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("error : " + error);
  //       ToastError("Could not delete the task")

  //     });
  // };
  // const handleRemoveItem = (id) => {
  //   // Remove the task from the taskList state
  //   var updatedTaskList = taskList.filter(item => item.id !== id);
  //   setTaskList(updatedTaskList);
  // };
  const taskDelete = async (taskId) => {
    console.log("tasks id -  : ", taskId);
 
       await axios.post(
        "http://localhost:5000/eventManager/task/deleteTask",
        {},
        { params: { taskId: taskId } }
      ).then((res) => {
        // setExistError("error.message");
        // const task = res.data.task;
        console.log("tasks -  : ", res);
        console.log("delete ");
        console.log(res.data);

        if (res.status === 200) {
          console.log("Status -  : ", res.status);
          console.log("data delete -  : ", res.data);
          handleRemoveItem(taskId); // Update state in the frontend
          ToastSuccess(" Task Created Successfully!")
        } else {
         
        ToastError(" Task creation was not Successfull! Try again");
          
        }
      })
      .catch((error) => {
        console.log("got error: ", error.message);
        // setExistError(error.message);
        console.log(error);
        ToastError("Could not delete the task");      });
      
      
     
  }
  
  const handleRemoveItem = (id) => {
    // Remove the task from the taskList state
    var updatedTaskList = taskList.filter(item => item.id !== id);
    setTaskList(updatedTaskList);
    // toast.success('Task deleted successfully!', {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "colored",
    // });
    ToastSuccess("Task deleted successfully!");
  };
  
  
  


  
  const getSelectedDayEvents = (date) => {
    console.log("kkkkkkkkkkkkkkkkkkkk");
    axios
      .post("http://localhost:5000/eventManager/task/searchTaskDate", {
        date: date,
      })
      .then((res) => {
        // const events = res.data.events;
        // console.log("event 0: " , events[0]);
        // setEventList(res.data)

        console.log(res.data.todayEvents);
        // setselectedDateEventList(res.data.todayEvents)
        setTaskList(res.data.todayEvents);
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log("response: ", response);
    // console.log(response.events);
  };

  const TABLE_HEAD = [
    "Task Name",
    "Department",
    "date",
    "status",
    "",
    "",
    ""
  ];
  <ToastContainer
position="top-center"
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
//   const handleRemoveItem = (id) => {
//     // console.log("itemList[0].id " , itemList[0].id)
//     var updatedTaskList = taskList.filter(item => item.id !== id);
//     setTaskList(updatedTaskList)
// }

  // const statusTypes = ["Active", "Desertion", "Upcoming", "Done", "Offline"];
  const statusTypes = ["Upcoming","Paused", "Done" , "Rejected"];
  return (
    
    <div>
      <div className="flex  justify-between items-center w-full h-[140px] rounded font-lato text-xl text-cl-1   p-4 pt-2">
      <Button className=" w-3/12 h-[140px] flex justify-center items-center bg-cl-4 rounded font-lato text-xl text-cl-1   p-4 pt-2 mr-4"
      onClick={()=> navigate('/eventManager/createTask')}
      >
      <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 inline-block mr-2  font-semibold"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span className="font-semibold"> Create Task</span>
      </Button>
    
        <div className="flex  justify-end items-center w-full h-[140px] bg-cl-4 rounded font-lato text-xl text-cl-1   p-4 pt-2">

        <div className="flex  space-x-4 justify-evenly ">
          <div className="w-1/2 h-[46px]">
            <Input
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              }
              label="Search"
              onChange={(e) => {
                console.log(e.target.value);
                taskSearch(e.target.value);
              }}
            />
          </div>
          <div>
            <Popover placement="bottom">
              <PopoverHandler>
                <Input
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 mr-2 text-blue-gray" // Adjust the styling as needed
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                      />
                    </svg>
                  }
                  className=" "
                  label="Sort by : Date"
                  onChange={(e) => {
                    setDate(Date);
                    // console.log(date);
                  }}
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
                  // onSelect={setDate}
                  onSelect={(selectedDate) => {
                    //tttttttttttttttttttttt
                    setDate(selectedDate);
                    console.log(selectedDate);
                    // Call your function here
                      getSelectedDayEvents(selectedDate);
                    console.log("Updated eventList :", taskList);
                    // setEventList()
                  }}
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
            {/* <Button variant="outlined" className="rounded-full" size="sm" onClick={
             useEffect(() => {
               setDate('')
              //  getEvents()
             },[])
             
             }>Clear</Button> */}
          </div>
        </div>
</div>
      </div>
      <div className="h-8"></div>

      <Card className="h-full w-full p-4 pt-2">
        <CardHeader floated={false} shadow={false} className="rounded-none ">
          <div className="mb-8 flex items-center justify-between gap-8">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <tr className="flex justify-between">
                <td>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="text-3xl flex justify-center items-center  "
                  >
                    Task
                  </Typography>
                </td>
                <td>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="text-3xl flex "
                  >
                    <div className=" flex items-center font-bold  px-7  ">
                      {statusTypes.map((statusT) => (
                        <Chip
                          className="w-fit h-9 mx-5 px-6"
                          style={{
                            color: "black",
                            display: "flex",
                            justifyContent: "center",
                            // background: status ? "#0f9ae8" : "red",
                          }}
                          variant="filled" //up status
                          size="sm"
                          value={(function () {
                            switch (statusT) {
                              // case "Active":
                              //   return "Active";
                              // case "Desertion":
                              //   return "Desertion";
                              case "Done":
                                return "Done";
                              case "Upcoming":
                                return "Upcoming";
                              case "Paused":
                                return "Paused";
                              case "Rejected":
                                return "Rejected";
                              default:
                                return "nothing";
                            }
                          })()}
                          color={(function () {
                            switch (statusT) {
                              // case "Active":
                              //   return "blue";
                              case "Upcoming":
                                return "green";
                              case "Desertion":
                                return "red";
                                case "Rejected":
                                  return "red";
                                  case "Done":
                                    return "amber";
                                    case "Paused":
                                      return "blue-gray";
                                      default:
                                return "red";
                            }
                          })()}
                          fontWeight="bold"
                        />
                      ))}
                    </div>
                  </Typography>
                </td>
              </tr>
            </table>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
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
            {/* <tbody>
              {
              
              taskList && taskList.length === 0 ? (
                <tr>
                  <td colSpan={TABLE_HEAD.length} className="text-center">
                    <div className="flex justify-center items-center h-full p-10">
                      <div className="max-w-full animate-pulse">
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
                          className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                        >
                          &nbsp;
                        </Typography>
                        <Typography
                          as="div"
                          variant="paragraph"
                          className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                        >
                          &nbsp;
                        </Typography>
                        <Typography
                          as="div"
                          variant="paragraph"
                          className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                        >
                          &nbsp;
                        </Typography>
                        <Typography
                          as="div"
                          variant="paragraph"
                          className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                        >
                          &nbsp;
                        </Typography>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                taskList?.map((oneTask, index) => {
                  const isLast = index === taskList.length ;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    // <Link to={{ pathname: "/eventManager/eventDetails", state: { oneTask } }}>
                    <tr
                      key={oneTask.id}
                      // onClick={() =>
                      //   navigate("/eventManager/Tasks/view-Task", {
                      //     state: { taskId: oneTask.id },
                      //   })
                      // }
                    >
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="paragraph"
                              color="blue-gray"
                              className="font-normal"
                            >
                             {oneTask.taskName}
                                
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="paragraph"
                              color="blue-gray"
                              className="font-bold"
                            >{oneTask.department}
                              
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="paragraph"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {oneTask.date.slice(0, 10)}
                          </Typography>
                        </div>
                      </td>

                    
                      <td className={classes}>
                        <div className="w-[80px]  flex items-center font-bold">
                          <Chip
                            className="w-[80px] "
                            style={{
                              color: "black",
                              display: "flex",
                              justifyContent: "center",
                              // background: status ? "#0f9ae8" : "red",
                            }}
                            variant="filled"
                            size="sm"
                            value={(function () {
                              switch (oneTask.status) {
                                case "Active":
                                  return "Active";
                                case "Desertion":
                                  return "Desertion";
                                case "Done":
                                  return "Done";
                                case "Upcoming":
                                  return "Upcoming";
                                default:
                                  return "nothing";
                              }
                            })()}
                            color={(function () {
                              switch (oneTask.status) {
                                case "Active":
                                  return "blue";
                                case "Upcoming":
                                  return "green";
                                case "Desertion":
                                  return "red";
                                case "Done":
                                  return "amber";

                                default:
                                  return "red";
                              }
                            })()}
                            fontWeight="bold"
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="paragraph"
                          color="blue-gray"
                          className="font-bold"
                        >
                           <Tooltip content="Edit User">
                        <IconButton variant="text" onClick={( ) => { navigate("/eventManager/Tasks/view-Task", {
                          state: { taskId: oneTask.id },
                        })}}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            className="w-8 h-8 "
                            color="#21179F"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                          </svg>
                        </IconButton>
                      </Tooltip>
                        </Typography>
                      </td>
                      <td>
                      <Button variant="outlined" className="rounded-full" size="sm" onClick={( ) => { navigate("/eventManager/Tasks/view-Task", {
                          state: { taskId: oneTask.id },
                        })}}>
                        View</Button>
                      </td>
                      <td>
                      <IconButton variant="text" color="blue-gray" onClick={()=>{
                        taskDelete(oneTask.id);
                      }}>
                <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
              >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
              clipRule="evenodd"
            />
          </svg>
            </IconButton>
                      </td>

                    </tr>
                    // </Link>
                  );
                })
              )}
            </tbody> */}
            <tbody>
  {
    // taskList.length === 0 ? (
   loading ?     <tr>
        <td colSpan={TABLE_HEAD.length} className="text-center">
          <div className="flex justify-center items-center h-full p-10">
            <div className="max-w-full animate-pulse">
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
                className="mb-2 h-2 w-72 rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>
              <Typography
                as="div"
                variant="paragraph"
                className="mb-2 h-2 w-72 rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>
              <Typography
                as="div"
                variant="paragraph"
                className="mb-2 h-2 w-72 rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>
              <Typography
                as="div"
                variant="paragraph"
                className="mb-2 h-2 w-72 rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>
            </div>
          </div>
        </td>
      </tr> :  taskList.length === 0 ?  <tr className=" bg-blue-gray-50 m-4"> 
                    <td colSpan={TABLE_HEAD.length} className="text-center p-16">
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
                            // handleOpen();
                          }}
                        >
                          Assign Now !{" "}
                        </Button>{" "}
                      </Typography>
                    </td>
                  </tr>:(
    //   <tr>
    //     <td colSpan={TABLE_HEAD.length} className="text-center">
    //       <div className="flex justify-center items-center h-full p-10">
    //         <div className="max-w-full animate-pulse">
    //           <Typography
    //             as="div"
    //             variant="h1"
    //             className="mb-4 h-3 w-56 rounded-full bg-gray-300"
    //           >
    //             &nbsp;
    //           </Typography>
    //           <Typography
    //             as="div"
    //             variant="paragraph"
    //             className="mb-2 h-2 w-72 rounded-full bg-gray-300"
    //           >
    //             &nbsp;
    //           </Typography>
    //           <Typography
    //             as="div"
    //             variant="paragraph"
    //             className="mb-2 h-2 w-72 rounded-full bg-gray-300"
    //           >
    //             &nbsp;
    //           </Typography>
    //           <Typography
    //             as="div"
    //             variant="paragraph"
    //             className="mb-2 h-2 w-72 rounded-full bg-gray-300"
    //           >
    //             &nbsp;
    //           </Typography>
    //           <Typography
    //             as="div"
    //             variant="paragraph"
    //             className="mb-2 h-2 w-72 rounded-full bg-gray-300"
    //           >
    //             &nbsp;
    //           </Typography>
    //         </div>
    //       </div>
    //     </td>
    //   </tr>
    // ) : 
    // (
      taskList.map((oneTask, index) => {
        let isLast = index === taskList.length;
        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

        return (
          <tr key={oneTask.id} className="">
            <td className={classes}>
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {oneTask.taskName}
                  </Typography>
                </div>
              </div>
            </td>
            <td className={classes}>
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="font-bold"
                  >
                    {oneTask.department}
                  </Typography>
                </div>
              </div>
            </td>
            <td className={classes}>
              <div className="flex flex-col">
                <Typography
                  variant="paragraph"
                  color="blue-gray"
                  className="font-bold"
                >
                  {oneTask.date.slice(0, 10)}
                </Typography>
              </div>
            </td>
            <td className={classes}>
              <div className="w-[80px]  flex items-center font-bold">
                <Chip
                  className="w-[80px]"
                  style={{
                    color: "black",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  variant="filled"
                  size="sm"
                  value={(function () {
                    switch (oneTask.status) {
                      // 'Upcoming ','Paused', 'Done' , "Closed"
                      case "Rejected":
                        return "Rejected";
                      case "Paused":
                        return "Paused";
                      case "Done":
                        return "Done";
                      case "Upcoming":
                        return "Upcoming";
                      default:
                        return "nothing";
                    }
                  })()}
                  color={(function () {
                    switch (oneTask.status) {
                      case "Rejected":
                        return "blue-gray";
                      case "Upcoming":
                        return "green";
                        case "Paused":
                        return "red";
                      case "Done":
                        return "amber";
                      default:
                        return "red";
                    }
                  })()}
                  fontWeight="bold"
                />
              </div>
            </td>
            <td className={classes}>
              <Typography
                variant="paragraph"
                color="blue-gray"
                className="font-bold"
              >
                <Tooltip content="Edit User">
                  <IconButton
                    variant="text"
                    onClick={() => {
                      navigate("/eventManager/Tasks/view-Task", {
                        state: { taskId: oneTask.id },
                      });
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-8 h-8 "
                      color="#21179F"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </IconButton>
                </Tooltip>
              </Typography>
            </td>
            <td>
              <Button
                variant="outlined"
                className="rounded-full"
                size="sm"
                onClick={() => {
                  navigate("/eventManager/Tasks/view-Task", {
                    state: { taskId: oneTask.id },
                  });
                }}
              >
                View
              </Button>
            </td>
            <td>
              <IconButton
                variant="text"
                color="blue-gray"
                onClick={() => {
                  taskDelete(oneTask.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 011.5 0v8.25a.75.75 0 01-1.5 0v-8.25zm3.75-.75a.75.75 0 00-1.5 0v8.25a.75.75 0 001.5 0v-8.25z"
                    clipRule="evenodd"
                  />
                </svg>
              </IconButton>
            </td>
          </tr>
        );
      })
    )
  }
</tbody>;

          </table>
        </CardBody>
        <CardFooter>
        <Typography>{results} results</Typography>
            <div className="flex gap-2 flex justify-end items-start">
              <Pagination active={active} setActive={setActive} />
            </div>
        </CardFooter>
     </Card>
    </div>
  );
};

export default TaskPage;
