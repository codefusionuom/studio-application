import React from 'react'
import { MagnifyingGlassIcon, ChevronUpDownIcon, } from "@heroicons/react/24/outline";
import { PencilSquareIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Input, Typography, Button, CardBody, Chip, CardFooter, Tabs, TabsHeader, Tab, Avatar, IconButton, Tooltip, Select, Option, } from "@material-tailwind/react";
import Datepicker from "../../components/datePicker/Datepicker";
import { Pagination } from "../../components/pagination/pagination";
import SmallCard from '../../components/cards/card';
import Card2 from '../../components/cards/Card2';


function CustomerRequests() {
    return (
        <div className='flex flex-col gap-10'>
                <Card2  title1="CREATE ADMINS" title2={'Make new admin account'}/> 
            <div>
                <Card className=" w-full border-2 rounded">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="flex flex-col items-center justify-between gap-4  md:flex-row ">
                            <Typography className='text-2xl'>Admin List</Typography>
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
                                    ({ img, name, status1,status2, EmployeeID, time, phoneNo,edit }, index) => {
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
                                                                {name}
                                                            </Typography>
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal opacity-70"
                                                            >
                                                                {status1}
                                                            </Typography>
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal opacity-70"
                                                            >
                                                                {status2}
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
                                                            {EmployeeID}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="w-max">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {time}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {phoneNo}
                                                        {}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Tooltip content="Edit User">
                                                <IconButton variant="text">
                                                    <PencilSquareIcon className="h-7 w-7" />
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
                </Card>
            </div>
        </div>
    )
}

export default CustomerRequests


const TABLE_HEAD = ["Name", "Employee ID", "Reported Time", "Phone Number",""];

const TABLE_ROWS = [
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
        name: "Jane Cooper",
        status1: "Customer manager",
        status2: "Event manager",
        EmployeeID: '#01ec2551',
        time: "8.00  AM",
        phoneNo:"077 88452631",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
        name: "Floyd Miles",
        status1: "Event manager",
        status2: "",
        EmployeeID: '#03ec1479',
        time: "10.00  AM",
        phoneNo:"071 45856921"
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
        name: "Ronald Richards",
        status1: "Employee manager",
        status2: "",
        EmployeeID: '#03ed4793',
        time: "11.00  AM",
        phoneNo:"045 2287456"
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
        name: "Marvin McKinney",
        status1: "Stock manager",
        status2: "",
        EmployeeID: '#07kc4863',
        time: "8.00  AM",
        phoneNo:"077 58645621"
    },
  
];