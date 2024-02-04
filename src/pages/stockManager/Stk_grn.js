import React from 'react'
import { MagnifyingGlassIcon, ChevronUpDownIcon, } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Input, Typography, Button, CardBody, Chip, CardFooter, Tabs, TabsHeader, Tab, Avatar, IconButton, Tooltip, Select, Option, } from "@material-tailwind/react";
import Datepicker from "../../components/datePicker/Datepicker";
import { Pagination } from "../../components/pagination/pagination";
import SmallCard from '../../components/cards/card';
import Table from './Stk_components/Table';

function GrnStock() {
    return (
        <div className='flex flex-col gap-10'>
            <div className='flex gap-10'>
                <SmallCard className=" w-full" title="+ Create GRN" />
                <Card className='w-full rounded'>
                    <div className=" flex p-4 gap-6 items-center">
                        <Select size="lg" label="Select By: GRN Id" className="z-10">
                            <Option>GRN Id</Option>
                            <Option>Date</Option>
                            <Option>Supplier Name</Option>
                            <Option>Item Id</Option>
                            <Option>Item Name</Option>
                        </Select>

                        <Input size="lg"
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        />
                    </div>
                </Card>
            </div>

            <div>
                <Card className=' w-full boarder-2 rounded'>
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className=' flex flex-col items-center justify-between gap-4 md:flex-row '>
                            <Typography className=' text-xl'>GRN</Typography>
                        </div>
                    </CardHeader>
                   
                        <Table/>
                   

                </Card>
            </div>

           

       </div>
    )
}

export default GrnStock


const TABLE_HEAD =["GRN No", "SupplierID", "Date", "Amount", "Edit"];

const TABLE_ROWS = [
    {
        idx:"G-001",
        name: "John Michael",
        email: "john@creative-tim.com",
        job: "Manager",
        org: "Organization",
        online: true,
        date: "23/04/18",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
        name: "Alexa Liras",
        email: "alexa@creative-tim.com",
        job: "Programator",
        org: "Developer",
        online: false,
        date: "23/04/18",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
        name: "Laurent Perrier",
        email: "laurent@creative-tim.com",
        job: "Executive",
        org: "Projects",
        online: false,
        date: "19/09/17",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
        name: "Michael Levi",
        email: "michael@creative-tim.com",
        job: "Programator",
        org: "Developer",
        online: true,
        date: "24/12/08",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
        name: "Richard Gran",
        email: "richard@creative-tim.com",
        job: "Manager",
        org: "Executive",
        online: false,
        date: "04/10/21",
    },



];