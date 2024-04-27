import { Card, CardHeader, Typography, CardBody, CardFooter } from "@material-tailwind/react";
import { Pagination } from "../../components/pagination/pagination";
import { RadioHorizontalList } from "./attendanceradio";
import ViewAttendance from "./attendance/viewattendancebutton";
import { useState, useEffect } from "react";
import axios from "axios";

function AttendanceOverviewList() {


    const [users, setUser] = useState([])
    const [id, setid] = useState()

    useEffect(() => {
        axios.get('http://localhost:5000/employeeManager/getAttendance')
            .then(result => setUser(result.data))
            .catch(err => console.log(err))
        console.log(users);
    }, [])

    return (
        <Card className=" w-full border-2 ">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="flex flex-col items-center justify-between gap-4  md:flex-row ">
                    <div className="text-2xl pt-6 pl-10 font-semibold">
                        <p>Attendance Overview</p>
                    </div>
                    <div>
                        <RadioHorizontalList></RadioHorizontalList>
                    </div>
                    <ViewAttendance></ViewAttendance>

                </div>
            </CardHeader>
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
                                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70 justify-center items-center align-middle"
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
                                                    {user.dayType}
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
                                                    {user.checkIn}
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
                                                    {user.checkOut}
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
                    233 results
                </Typography>
                <div className="flex gap-2">
                    <Pagination />
                </div>
            </CardFooter>
        </Card>
    );
}
export default AttendanceOverviewList




const TABLE_HEAD = ["Date", "Employee Name", "Day Type", "Check-In", "Check-out", "Leave Type"];

