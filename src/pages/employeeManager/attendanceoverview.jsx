import { MagnifyingGlassIcon, ChevronUpDownIcon, } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Input, Typography, Button, CardBody, Chip, CardFooter, Tabs, TabsHeader, Tab, Avatar, IconButton, Tooltip, Select, Option, } from "@material-tailwind/react";
import Datepicker from "../../components/datePicker/Datepicker";
import { Pagination } from "../../components/pagination/pagination";
import { RadioHorizontalList } from "./attendanceradio";

function AttendanceOverviewList() {
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
                    <div className=" flex p-4 gap-6">
                        <div className="w-72">
                            <Input label="Date" disabled />
                        </div>

                        <Button>View Attendance</Button>
                    </div>
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
                                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {TABLE_ROWS.map(
                            ({ day, name, chin, chout, interval, whours, employeeId, status, date }, index) => {
                                const isLast = index === TABLE_ROWS.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={name}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {date}
                                                    </Typography>
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
                                                    {day}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {employeeId}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {chin}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                        <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {chout}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {whours}
                                            </Typography>
                                        </td>
                                        <td className="p-4 border-b border-blue-gray-50 w-2/12">
                                        {(() => {
                                            switch(status) {
                                                    // case "wfh": return <div className="flex"><Chip color="gray" value="Work from home" /></div>;
                                                    // case "wfo": return <div className="flex"><Chip color="blue" value="Work from office" /></div>;
                                                    // case "la": return <div className="flex"><Chip color="yellow" value="Late arrival" /></div>;
                                                    // default: return <div className="flex"><Chip color="red" value="Absent" /></div>
                                                    case "wfh": return <div className="flex"><Typography className="flex bg-gray-600 rounded pl-3 pr-3 text-sm font-semibold pt-1 pb-1 text-white w-3/4 justify-center">Work from home</Typography></div>;
                                                    case "wfo": return <div className="flex"><Typography className="flex justify-center bg-light-blue-400 rounded pl-3 pr-3 text-sm font-semibold pt-1 pb-1 text-white w-3/4">Work from office</Typography></div>;
                                                    case "la": return <div className="flex"><Typography className="flex justify-center bg-yellow-500 rounded pl-3 pr-3 text-sm font-semibold pt-1 pb-1 text-black w-3/4">Late Arrival</Typography></div>;
                                                    default: return <div className="flex"><Typography className="flex justify-center bg-red-500 rounded pl-3 pr-3 text-sm font-semibold pt-1 pb-1 text-white w-3/4">Absent</Typography></div>;
                                                }
                                                })()}
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


// const TABS = [
//     {
//         label: "All",
//         value: "all",
//     },
//     {
//         label: "Monitored",
//         value: "monitored",
//     },
//     {
//         label: "Unmonitored",
//         value: "unmonitored",
//     },
// ];

const TABLE_HEAD = ["Date", "Day", "Employee ID", "Check-In", "Check-out", "Work hours", "Status"];

const TABLE_ROWS = [
    {
        day: "Monday",
        name: "John Michael",
        email: "john@creative-tim.com",
        job: "Manager",
        org: "Organization",
        phoneNumber: "0714567890",
        employeeId: "#12345",
        status: "wfh",
        date: "23/04/18",
    },
    {
        day: "Tuesday",
        name: "Alexa Liras",
        email: "alexa@creative-tim.com",
        job: "Programator",
        org: "Developer",
        phoneNumber: "0714567890",
        employeeId: "#12345",
        status: "wfo",
        date: "23/04/18",
    },
    {
        day: "Wensday",
        name: "Laurent Perrier",
        email: "laurent@creative-tim.com",
        job: "Executive",
        org: "Projects",
        phoneNumber: "0714567890",
        employeeId: "#12345",
        status: "la",
        date: "19/09/17",
    },
    {
        day: "Thursday",
        name: "Michael Levi",
        email: "michael@creative-tim.com",
        job: "Programator",
        org: "Developer",
        phoneNumber: "0714567890",
        employeeId: "#12345",
        online: true,
        date: "24/12/08",
    },
    {
        day: "Friday",
        name: "Richard Gran",
        email: "richard@creative-tim.com",
        job: "Manager",
        org: "Executive",
        phoneNumber: "0714567890",
        employeeId: "#12345",
        online: false,
        date: "04/10/21",
    },
];