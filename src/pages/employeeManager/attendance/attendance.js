import React, { useState, useEffect } from 'react'
import { Button, Input } from '@material-tailwind/react';
import AttendanceOverviewList from './attendanceoverview';
import { Select, Option } from "@material-tailwind/react";
import axios from 'axios';
import SelectOption from '@material-tailwind/react/components/Select/SelectOption';
import {
    Popover,
    PopoverHandler,
    PopoverContent,
} from "@material-tailwind/react";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import axiosInstance from '../../../config/axios.config';
import { Card } from '@material-tailwind/react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function Attendance() {

    const [users, setUser] = useState([])
    const [errorName, setErrorName] = useState(false)
    const [errorDate, setErrorDate] = useState(false)
    const [errorCheckIn, setErrorCheckIn] = useState(false)
    const [errorDayType, setErrorDayType] = useState(false)
    const [errorCheckOut, setErrorCheckOut] = useState(false)
    const [errorLeaveType, setErrorLeaveType] = useState(false)
    const [checkIn, setCheckIn] = useState()
    const [checkOut, setCheckOut] = useState()
    // const [dayType, setDayType] = useState()
    // const [leaveType, setLeaveType] = useState()
    const [id, setid] = useState()
    const [date, setDate] = useState()
    const [timein, setTimein] = useState()
    // const [checkInSeconds,setCheckInSeconds] = useState()
    // const [checkOutSeconds,setCheckOutSeconds] = useState()
    // const [todayDate, setTodayDate] = useState(new Date()); // Initialize date with today's date
    const [resultVisible, setResultVisible] = useState(false)
    const [search, setSearch] = useState()
    const [searchvalue, setSearchValue] = useState()
    const [ToastError, setToastError] = useState()
    const [empId, setEmpId] = useState()
    const [empName, setEmpName] = useState()

    function convertTimeToSeconds(timeString) {
        console.log("input:"+timeString);
        // Split the time string into hours, minutes, and seconds
        const [hoursStr, minutesStr] = timeString.split(':');

        // Convert string parts to numbers
        const hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);
        // console.log("hours:"+hours);
        // console.log(typeof hours);
        // console.log("min:"+minutes);
        // console.log(typeof minutes);


      
        // Calculate total seconds
        const totalSeconds = hours * 3600 + minutes * 60;
        // console.log("total"+totalSeconds);
        // console.log(typeof totalSeconds);
      
        return totalSeconds;
      }


    // useEffect(() => {
    //     axios.get('http://localhost:5000/employeeManager/getEmployees')
    //         .then(result => setUser(result.data))
    //         .catch(err => console.log(err))
    //     console.log(users)
    // }, [])

    const Submit = (e) => {
        e.preventDefault()
        if (!id) {
            setErrorName(true);
            alert("Please select employee Name");
            return;
        }
        setErrorName(false);
        if (!date) {
            setErrorDate(true);
            alert("Please select date");
            return;
        }
        setErrorDate(false);
        if (!checkIn) {
            setErrorCheckIn(true);
            alert("Please fill in Check-In time");
            return;
        }
        // if (isNaN(checkIn)) {
        //     setErrorCheckIn(true);
        //     alert("Time must be numeric");
        //     return;
        // }
        setErrorCheckIn(false);
        if (!checkOut) {
            setErrorCheckOut(true);
            alert("Please fill in Check-out time");
            return;
        }
        // if (isNaN(checkOut)) {
        //     setErrorCheckOut(true);
        //     alert("Time must be numeric");
        //     return;
        // }
        setErrorCheckOut(false);
        

        const checkInSeconds = convertTimeToSeconds(checkIn);
        const checkOutSeconds = convertTimeToSeconds(checkOut);

        // const checkintemp = convertTimeToSeconds(checkIn);
        // const checkouttemp = convertTimeToSeconds(checkOut);

        // console.log(checkintemp);
        // console.log(checkouttemp);

        // setCheckOutSeconds(checkintemp);
        // setCheckInSeconds(checkouttemp);
        
        console.log(checkInSeconds);
        console.log(checkOutSeconds);

        const newDate = new Date(date); // Create a new Date object based on the current date
        newDate.setDate(date.getDate() + 1);

        const dateString = newDate.toISOString().replace('Z', '+00:00');
        console.log(dateString);

        axios.post("http://localhost:5000/employeeManager/createAttendance", { id, dateString, checkIn, checkOut, checkInSeconds, checkOutSeconds })
            .then(result => {
                console.log(result)
                window.location.reload()
                // navigate('/employeeManager')
            })
            .catch(err => console.log(err))
    }

    // Search Employee
  const handleSearch = async () => {
    setResultVisible(true)
    console.log("searching begin");
    try {
    const { data } = await axiosInstance.get(`/employeeManager/getEmployeeSearch/?empName=${search}`)
    if (!data) {
        ToastError("no employee exist")
    }
    console.log(data);
    setUser(data);
    // setResults(data.count)
    } catch (error) {
    console.log(error);
    ToastError(error)
    }
};


useEffect(() => {
    if (search !== "") {
    handleSearch();
    console.log(search);
    console.log("search when name change");
    }
  }, [search]);

    return (
        <div>
            <div className='bg-cl-4 rounded'>
                <form>
                    <div className='PersonalInfo pt-10'>
                        <div className=''>
                            <div className='bg-gray-400 ml-20 mr-20 flex justify-evenly rounded'>
                                <div className='w-80 pt-5 pb-5'>
                                    <p className='text-2xl'>Attendance</p>
                                </div>
                                <div className='w-80 pt-5 pb-5'>
                                </div>
                                <div className='w-80 pt-5 pb-5'></div>
                                <div className='w-80 pt-5 pb-5'></div>
                            </div>
                        </div>
                        <div className='flex justify-evenly'>
                            <div>
                                <p className='pt-5'>Employee Name :</p>
                                <div className="w-80 pt-1 pb-10">
                                    {/* <Select label='Select Name' onChange={item => { setid(item) }} error={errorName ? "true" : null}>
                                        {users.map((user) => {
                                            return (
                                                <SelectOption key={user.id} value={user.id}>{user.empName}</SelectOption>
                                            );
                                        },
                                        )}
                                    </Select> */}
                                    <div className="relative ">
                                    <div className="relative flex w-full max-w-[24rem] ">
                                    <Input
                                        label="Enter Name"
                                        value={empName}
                                        onChange={(e) => {setSearch(e.target.value)}}
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
                                        onClick={handleSearch}
                                    >
                                        <MagnifyingGlassIcon className="h-6 w-5" />
                                    </Button>
                                    </div>

                                    {resultVisible ? (
                                    <div>
                        
                    
                                    {users && users.map((user)=>{
                                    return (
                                        <Card className="p-2 rounded-md absolute top-10 w-full max-h-36 overflow-scroll z-[999]">
                                        <div className="" onClick={()=>{setid(user.id); setEmpName(user.empName); setSearchValue(""); setResultVisible(false)}}>
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
                            </div>
                            <div className='pt-5'>
                                <p>Select Date :</p>
                                <div className="w-80 pt-1 pb-10">
                                    <div className="">
                                        <Popover placement="bottom">
                                            <PopoverHandler>
                                                <Input
                                                    label="Select a Date"
                                                    onChange={() => null}
                                                    // value={date ? format(date, "PPP") : ""}
                                                    value={date ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` : ""}
                                                    error={errorDate ? "true" : null}
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
                        </div>
                        <div className='flex justify-evenly'>
                            <div>
                                <p>Check In Time :</p>
                                <div className="w-80  pt-1 pb-10">
                                    {/* <Input onChange={(e) => setCheckIn(e.target.value)} error={errorCheckIn ? "true" : null}/> */}
                                    <TimePicker  onChange={setCheckIn} disableClock={true} value={checkIn} />
                                </div>
                            </div>
                            <div>
                            <p>Check Out Time :</p>
                                <div className="w-80 pt-1 pb-1-">
                                    {/* <Input onChange={(e) => setCheckOut(e.target.value)} error={errorCheckOut ? "true" : null} /> */}
                                    <TimePicker  onChange={setCheckOut} disableClock={true} value={checkOut} />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className='flex justify-evenly pb-10 pt-10'>
                        <div>
                        </div>
                        <div>
                            <Button color="green" onClick={Submit}>Create</Button>
                        </div>
                    </div>
                </form>
            </div>

            <div className='pt-10'>
                <AttendanceOverviewList></AttendanceOverviewList>
            </div>
        </div>
    )
}
export default Attendance