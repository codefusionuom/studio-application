import React from 'react'
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Input, Typography, Button, CardBody, Chip, CardFooter, Tabs, TabsHeader, Tab, Avatar, IconButton, Tooltip, Select, Option, } from "@material-tailwind/react";
import Datepicker from '../../../components/datePicker/Datepicker';
import { Pagination } from '../../../components/pagination/pagination';

function Table({title}) {
  return (
    <div>
        <div>

            <Card className=" w-full border-2 rounded">
                    {/* <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="flex flex-col items-center justify-between gap-4  md:flex-row ">
                            <Typography className='text-2xl'>{title}</Typography>
                        </div>
                    </CardHeader> */}

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
                                    ({ idx,item, name, email, online, date,amount }, index) => {
                                        const isLast = index === TABLE_ROWS.length - 1;
                                        const classes = isLast
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={idx}>
                                                {/* <td className={classes}> */}
                                                    {/* <div className="flex items-center gap-3"> */}

                                                    <td className={classes}>
                                                        <div className="flex flex-col">
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            >
                                                                {idx}
                                                            </Typography>
                                                           
                                                            </div>
                                                    </td>

                                                    <td className={classes}>
                                                        <div className="flex flex-col">

                                                    <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal opacity-70"
                                                            >
                                                                {item}
                                                            </Typography>
                                                            </div>
                                                    </td>
                                                  

                                                    <td className={classes}>
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
                                                                {email}
                                                            </Typography>
                                                        </div>
                                                    </td>
                                               
                                               
                                               
                                                <td className={classes}>
                                                    <div className="w-max">
                                                        <Chip
                                                            variant="ghost"
                                                            size="sm"
                                                            value={online ? "online" : "offline"}
                                                            color={online ? "green" : "gray"}
                                                        />
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {date}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {amount}
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
                    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                        <Typography>
                            233 results
                        </Typography>
                        <div className="flex gap-2">
                            <Pagination />
                        </div>
                    </CardFooter>
                </Card>
            </div> 
    </div>
  )
}

export default Table


const TABLE_HEAD = ["GRN No","Item","Supplier Name", "Status", "Date", "Amount", "Edit"];

const TABLE_ROWS = [
    {
        idx: "G-001",
        name: "John Michael",
        email: "john@creative-tim.com",
        item: "Frame",
        online: true,
        date: "23/04/18",
        amount: "$500"
    },
    {
        idx: "G-001",
        name: "Alexa Liras",
        email: "alexa@creative-tim.com",
        item: "Photograph",
        online: false,
        date: "23/04/18",
        amount: "$500"
    },
    {
        idx: "G-001",
        name: "Laurent Perrier",
        email: "laurent@creative-tim.com",
        item: "Frame",
        online: false,
        date: "19/09/17",
        amount: "$500"
    },
    {
        idx: "G-001",
        name: "Michael Levi",
        email: "michael@creative-tim.com",
        item: "Frame",
        online: true,
        date: "24/12/08",
        amount: "$500"
    },
    {
        idx: "G-001",
        name: "Richard Gran",
        email: "richard@creative-tim.com",
        item: "Frame",
        online: false,
        date: "04/10/21",
        amount: "$500"
    },

];