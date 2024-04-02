import React, {useState, useEffect} from 'react'
import { Button, Input } from '@material-tailwind/react';
import AttendanceOverviewList from './attendanceoverview';
import { Select, Option } from "@material-tailwind/react";
// import axios, {useNavigate} from 'axios';
import axios from 'axios';
import Datepicker from '../../components/datePicker/Datepicker';
import Dayselect from './dayselect';
import SelectOption from '@material-tailwind/react/components/Select/SelectOption';


import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";






function Attendance() {


    const [users, setUser] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:5000/employeeManager/getEmployees')
        .then(result => setUser(result.data))
        .catch(err => console.log(err))
        console.log(users)
    },[])




    // const [empName,setEmpName] = useState()
    const [checkIn,setCheckIn] = useState()
    const [checkOut,setCheckOut] = useState()
    const [dayType,setDayType] = useState()
    const [leaveType,setLeaveType] = useState()
    const [empId,setEmpId] = useState()
    const [id,setid] = useState()
    const [date,setDate] = useState()
    // const [empDepartment,setEmpDepartment] = useState()
    // const [empNumber,setEmpNumber] = useState()
    // const navigate = useNavigate()

    // console.log(rt);

    const Submit = (e) => {
      e.preventDefault()
      axios.post("http://localhost:5000/employeeManager/createAttendance", {id,date,checkIn,checkOut,dayType,leaveType})
      .then(result => {
          console.log(result)
          window.location.reload()
          // navigate('/employeeManager')
      })
      .catch(err => console.log(err))
    }



    







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
                        {/* <Input label="Name"  /> */}

                        
                            <Select label='Select Name' onChange={item => { setid(item)}}>
                            {users.map((user) => {
                            return (
                                <SelectOption  key={user.id} value={user.id}>{user.empName}</SelectOption>
                                );},
                                )}
                            </Select>
                        
                    </div>
                    </div>
                    <div className='pt-5'>
                    <p>Select Date :</p>
                    <div className="w-80 pt-1 pb-10">
                        {/* <Select label='Employee ID'>
                            <Option>Select</Option>
                        </Select> */}

                        {/* <Dayselect onChange={(date => setDate(date))}></Dayselect> */}




                        <div className="">
                            <Popover placement="bottom">
                                <PopoverHandler>
                                <Input
                                    label="Select a Date"
                                    onChange={() => null}
                                    // value={date ? format(date, "PPP") : ""}
                                    value={date ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`: ""}
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
                            <Input  onChange={(e) => setCheckIn(e.target.value)}/>
                        </div>
                    </div>
                    <div>
                        <p>Day Type :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Select label='Day Type' onChange={item => { setDayType(item)}}>
                                <Option value='Monday'>Moday</Option>
                                <Option value='Tuesday'>Tuesday</Option>
                                <Option value='Wednesday'>Wednesday</Option>
                                <Option value='Thursday'>Thursday</Option>
                                <Option value='Friday'>Friday</Option>
                                <Option value='Saturday'>Saturday</Option>
                                <Option value='Sunday'>Sunday</Option>

                            </Select>

                        </div>
                    </div>
                </div>
                <div className='flex justify-evenly'>
                    <div>
                        <p>Check Out Time :</p>
                        <div className="w-80 pt-1 pb-1-">
                            <Input  onChange={(e) => setCheckOut(e.target.value)}/>
                        </div>
                    </div>
                    <div>
                        <p>Leaving Type :</p>
                        <div className="w-80 pt-1 pb-10">
                            <Select label='Leave Type' onChange={(item) => setLeaveType(item)}>
                                <Option value='HalfDay'>Half-Day</Option>
                                <Option value='Later Arival'>Late Arival</Option>
                                <Option value='Absent'>Absent</Option>
                            </Select>
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