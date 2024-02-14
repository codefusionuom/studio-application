import React from 'react'
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Typography, CardBody, IconButton, Tooltip, } from "@material-tailwind/react";
import Card2 from '../../components/cards/Card2';


function CustomerRequests() {
    return (
        <div className='flex flex-col gap-10'>
                <Card2  title1="CREATE DEPARTMENT" title2={'Structure Teams & Assets'}/> 

            {/* table */}
            <div>
                <Card className=" w-full border-2 rounded">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="flex flex-col items-center justify-between gap-4  md:flex-row ">
                            <Typography className='text-2xl'>Department List</Typography>
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
                                    ({ img, name, dep,head  }, index) => {
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
                                                            {dep}
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
                                                            {head}
                                                        </Typography>
                                                    </div>
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


const TABLE_HEAD = ["Name", "Department ID", "Head of Department", ""];

const TABLE_ROWS = [
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
        name: "Photography",
        dep:'#da456',
        head:'Kamal Perera'
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
        name: "Videography",
        dep:'#de789',
        head:'Amali Franando'
    },
    {
       img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
        name: "Mug Printing",
        dep:'#dr146',
        head:'Amali Welmilla'
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
        name: "Editorial",
        dep:'#dw148',
        head:'Namal Perera'
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
        name: "Digital Printing",
        dep:'#dw147',
        head:'Piyumi Amarasinghe'
    },
  
  
];