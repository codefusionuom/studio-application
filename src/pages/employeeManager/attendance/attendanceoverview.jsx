import { Card, CardHeader, Typography, CardBody, CardFooter } from "@material-tailwind/react";
import { Pagination } from "../../../components/pagination/pagination";
import { RadioHorizontalList } from "../attendanceradio";
import ViewAttendance from "./viewattendancebutton";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input } from '@material-tailwind/react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Popover, PopoverHandler, PopoverContent } from "@material-tailwind/react";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import axiosInstance from "../../../config/axios.config";



function AttendanceOverviewList() {


    const [users, setUser] = useState([])
    const [id, setid] = useState()
    const [active, setActive] = useState(1)
    const [results, setResults] = useState()
    const [empName, setEmpName] = useState()
    const [search, setSearch] = useState()
    const [resultVisible, setResultVisible] = useState(false)
    const [searchvalue, setSearchValue] = useState()
    const [empId, setEmpId] = useState()
    const [date, setDate] = useState()
    const [ToastError, setToastError] = useState()
    const [searchUser, setSearchUser] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/employeeManager/getAttendance/?page=${active}`)
            .then(result => {setUser(result.data.rows); setResults(result.data.count)})
            .catch(err => console.log(err))
        console.log(users);
    }, [active])

    useEffect(() => {
        if (search !== "") {
        handleEmpSearch();
        console.log(search);
        console.log("search when name change");
        }
      }, [search]);


    const handleEmpSearch = async () => {
        setResultVisible(true)
        console.log("searching begin");
        try {
        const { data } = await axiosInstance.get(`/employeeManager/getEmployeeSearch/?empName=${search}`)
        if (!data) {
            ToastError("no employee exist")
        }
        console.log(data);
        setSearchUser(data);
        // setResults(data.count)
        } catch (error) {
        console.log(error);
        ToastError(error)
        }
    };

    const handleClear = () => {
        setEmpId();
        setDate();
        setEmpName("");
    };



    const handleButtonSearch = async () => {
        if (!empId && !date) {
            axios.get(`http://localhost:5000/employeeManager/getAttendance/?page=${active}`)
            .then(result => {setUser(result.data.rows); setResults(result.data.count)})
            .catch(err => console.log(err))
            console.log("boohoo");
        } else { 
            console.log("searching begin");
            
            if (!empId) {
                const formatedDate = formatDate(date)
                console.log("no id");
                setEmpId("None")
                console.log(empId);
                console.log(formatedDate);
                try {
                    const { data } = await axiosInstance.get(`/employeeManager/getAttendanceandSearch/?id=None&date=${formatedDate}&page=${active}`)
                    if (!data) {
                        ToastError("no employee exist")
                    }
                    console.log(data);
                    setUser(data.rows);
                    setResults(data.count)
                    } catch (error) {
                    console.log(error);
                    ToastError(error)
                    }
            }
            else if(!date) {
                // const formatedDate = formatDate(date)
                console.log("no date");
                const formatedDate = "None";
                console.log(empId);
                console.log(formatedDate);
                try {
                    const { data } = await axiosInstance.get(`/employeeManager/getAttendanceandSearch/?id=${empId}&date=None&page=${active}`)
                    if (!data) {
                        ToastError("no employee exist")
                    }
                    console.log(data);
                    setUser(data.rows);
                    setResults(data.count)
                    } catch (error) {
                    console.log(error);
                    ToastError(error)
                    }
                
            }
            else{
                const formatedDate = formatDate(date)
                console.log("id is "+empId);
                console.log("date is "+formatedDate);
                try {
                    const { data } = await axiosInstance.get(`/employeeManager/getAttendanceandSearch/?id=${empId}&date=${formatedDate}&page=${active}`)
                    if (!data) {
                        ToastError("no employee exist")
                    }
                    console.log(data.rows);
                    setUser(data);
                    setResults(data.count)
                    } catch (error) {
                    console.log(error);
                    ToastError(error)
                    }
            }

        }
        
    };


    function formatDate(inputDate) {
        if (inputDate !== "") {
        // Parse the input date string into a Date object
        const dateObj = new Date(inputDate);
    
        // Extract year, month, and day
        const year = dateObj.getFullYear();
        // JavaScript months are zero-indexed, so we add 1 to get the correct month
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
    
        // Return the formatted date string in "YYYY/MM/DD" format
        return `${year}-${month}-${day}`;
        }
        else {
            return "";
        }
    }

    const DayOfWeek = ({ dateString }) => {
        // Parse the date string into a Date object
        const date = new Date(dateString);
      
        // Array of day names
        const daysOfWeek = ["Saturday","Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      
        // Get the day of the week as an integer (0 = Sunday, 1 = Monday, etc.)
        const dayIndex = date.getDay();
      
        // Get the name of the day from the array
        const dayName = daysOfWeek[dayIndex];
      
        return <div>{dayName}</div>;
      };

    return (
        <Card className=" w-full border-2 ">
            <CardBody floated={false} shadow={false} className="rounded-none">
                <div className="flex flex-col items-center justify-between gap-4  md:flex-row ">
                    <div className="text-2xl pt-6 pl-10 font-semibold">
                        <p>Attendance Overview</p>
                    </div>
                    <div>
                        {/* <RadioHorizontalList></RadioHorizontalList> */}
                    </div>
                    {/* <ViewAttendance></ViewAttendance> */}
                    <div>
                        <div className="relative ">
                            <div className="relative flex w-full max-w-[24rem] ">
                                <Input
                                    label="Enter Name"
                                    value={empName}
                                    onChange={(e) => {setSearch(e.target.value);setEmpName(e.target.value)}}
                                    className="pr-20"
                                    containerProps={{
                                    className: "min-w-0",
                                    }}
                                />
                                <Button
                                    size="sm"
                                    color={search ? "gray" : "blue-gray"}
                                    className="!absolute right-0 bottom-0 rounded "
                                    onClick={(e) => {setActive(1);handleButtonSearch();}}
                                >
                                    <MagnifyingGlassIcon className="h-6 w-5" />
                                </Button>
                                <Button
                                    size="sm"
                                    color={search ? "gray" : "blue-gray"}
                                    className="!absolute left-0 bottom-0 rounded "
                                    onClick={handleClear}
                                >
                                    <MagnifyingGlassIcon className="h-6 w-5" />
                                </Button>
                            </div>

                            {resultVisible ? (
                                <div>
                                {searchUser && searchUser.map((user)=>{
                                return (
                                    <Card className="p-2 rounded-md absolute top-10 w-full max-h-36 overflow-scroll z-[999]">
                                    <div className="" onClick={()=>{setEmpId(user.id); setEmpName(user.empName); setSearchValue(""); setResultVisible(false)}}>
                                    <div className="text-"> 
                                    {user.empName}
                                    </div>
                                    </div>
                                    </Card>
                                )
                                })}
                                </div>
                            ) : null}
                
                        </div>
                    </div>
                    <div>
                        <div className="">
                                        <Popover placement="bottom">
                                            <PopoverHandler>
                                                <Input
                                                    label="Select a Date"
                                                    onChange={() => null}
                                                    // value={date ? format(date, "PPP") : ""}
                                                    value={date ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` : ""}
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
                                                        caption: "flex justify-center py-2 mb-4 relative items-center",
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
                                                            <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                                                        ),
                                                        IconRight: ({ ...props }) => (
                                                            <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                                                        ),
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                    </div>


                </div>
            </CardBody>
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
                                        className="flex  gap-2 font-normal leading-none opacity-70 justify-center items-center align-middle"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {(users).map((user) => {
                            return (
                                <tr key={id}>
                                    <td >
                                        <div className="flex items-center gap-3 justify-center">
                                            <div className="flex flex-col justify-center items-center align-middle">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {user.date.slice(0, 10)}
                                                </Typography>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3 justify-center">
                                            <div className="flex flex-col justify-center items-center align-middle">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {user.employee.empName}
                                                </Typography>
                                            </div>
                                        </div>
                                    </td>
                                    <td >
                                        <div className="flex items-center gap-3 justify-center">
                                            <div className="flex flex-col justify-center items-center align-middle">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    <DayOfWeek dateString={user.date} />
                                                </Typography>
                                            </div>
                                        </div>
                                    </td>
                                    <td >
                                        <div className="flex items-center gap-3 justify-center">
                                            <div className="flex flex-col justify-center items-center align-middle">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {user.checkIn.slice(12, 16)}
                                                </Typography>
                                            </div>
                                        </div>
                                    </td>
                                    <td >
                                        <div className="flex items-center gap-3 justify-center">
                                            <div className="flex flex-col justify-center items-center align-middle">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {user.checkOut.slice(12, 16)}
                                                </Typography>
                                            </div>
                                        </div>
                                    </td>
                                    <td >
                                        <div className="flex items-center gap-3 justify-center">
                                            <div className="flex flex-col justify-center items-center align-middle">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {user.leaveType}
                                                </Typography>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        },
                        )}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography>
                    {results}
                </Typography>
                <div className="flex gap-2">
                    <Pagination  active={active} setActive={setActive} />
                </div>
            </CardFooter>
        </Card>
    );
}
export default AttendanceOverviewList




const TABLE_HEAD = ["Date", "Employee Name", "Day Type", "Check-In", "Check-out", "Leave Type"];

