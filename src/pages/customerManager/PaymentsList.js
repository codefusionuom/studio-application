import { MagnifyingGlassIcon, ChevronUpDownIcon, } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Input, Typography, Button, CardBody, Chip, CardFooter, Tabs, TabsHeader, Tab, Avatar, IconButton, Tooltip, Select, Option, } from "@material-tailwind/react";
import Datepicker from "../../components/datePicker/Datepicker";
import { Pagination } from "../../components/pagination/pagination";
import { useState } from "react";
import axios from "axios";
import { Try } from "@mui/icons-material";
import { isAsyncThunkAction } from "@reduxjs/toolkit";
import { setActive } from "@material-tailwind/react/components/Tabs/TabsContext";
import { useNavigate } from "react-router-dom";

function PaymentList() {
    const [search, setSearch] = useState("")
    const [active, setActive] = useState(1)
    const [numberofresults, setNumberofresults] = useState(1)
    const [payments,setPayments]=useState([])
    const [date, setDate] = useState();


    const navigate=useNavigate()
    const handlePaymentDetails=async(id)=>{
            navigate(`/customerManager/paymentDetails/${id}`)
    }
    const handleSearch = async(query) => {
        if (!query) {
            return
        }

        console.log(date)
        try {
            const {data}=await axios.get(`http://localhost:5000/customerManager/payment/?search=${search}&page=${active}&date=${date}`)
            setNumberofresults(data.count)
            setPayments(data.rows)
        } catch (error) {
            
        }
       
    }


    return (
        <Card className=" w-full border-2 ">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="flex flex-col items-center justify-start gap-4  md:flex-row ">
                    <Datepicker  date={date} setDate={setDate}/>
                    {/* <Input size="lg"
                        label="Search"
                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        className=""
                        onChange={(e) => handleSearch(e.target.value)}
                    /> */}
                    <div className="relative flex w-full max-w-[24rem] ">
                        <Input
                            type="email"
                            label="Email Address"
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                            className="pr-20"
                            containerProps={{
                                className: "min-w-0",
                            }}
                        />
                        <Button
                            size="sm"
                            color={search ? "gray" : "blue-gray"}
                            disabled={!search}
                            className="!absolute right-0 bottom-0 rounded"
                            onClick={handleSearch}
                        >
                            <MagnifyingGlassIcon className="h-6 w-5" />
                        </Button>
                    </div>

                    {/* <div className=" flex p-4 gap-6"> */}
                    {/* <Select size="lg" label="Select By: Event Id" className="z-10">
                            <Option>Material Tailwind HTML</Option>
                            <Option>Material Tailwind React</Option>
                            <Option>Material Tailwind Vue</Option>
                            <Option>Material Tailwind Angular</Option>
                            <Option>Material Tailwind Svelte</Option>
                        </Select> */}

                    {/* <Input size="lg"
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        /> */}
                    {/* </div> */}
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
                        {payments.map(
                            ({ id,amount,payment }, index) => {
                                const isLast = index === TABLE_ROWS.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={id} onClick={()=>handlePaymentDetails(id)}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {amount}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70"
                                                    >
                                                        {payment}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        {/* <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {job}
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal opacity-70"
                                                >
                                                    {org}
                                                </Typography>
                                            </div>
                                        </td> */}
                                        {/* <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    variant="ghost"
                                                    size="sm"
                                                    value={online ? "online" : "offline"}
                                                    color={online ? "green" : "blue-gray"}
                                                />
                                            </div>
                                        </td> */}
                                        {/* <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {date}
                                            </Typography>
                                        </td> */}
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
                    {numberofresults}
                </Typography>
                <div className="flex gap-2">
                    <Pagination active={active} setActive={setActive}/>
                </div>
            </CardFooter>
        </Card>
    );
}
export default PaymentList


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

const TABLE_HEAD = ["Member", "Function", "Status", "Employed", "Edit"];

const TABLE_ROWS = [
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
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