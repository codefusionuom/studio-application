import { MagnifyingGlassIcon, ChevronUpDownIcon, } from "@heroicons/react/24/outline";
import { PencilSquareIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Input, Typography, Button, CardBody, Chip, CardFooter, Tabs, TabsHeader, Tab, Avatar, IconButton, Tooltip, Select, Option, } from "@material-tailwind/react";
import Datepicker from "../../components/datePicker/Datepicker";
import { Pagination } from "../../components/pagination/pagination";

function PaymentListTable() {
    return (
        <Card className=" w-full border-2 mt-5">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="flex flex-col items-center justify-between gap-4  md:flex-row ">
                    <Datepicker />
                    <div className=" flex p-4 gap-6">
                        <Select size="lg" label="Select By: Event Id" className="z-10">
                            <Option>Material Tailwind HTML</Option>
                            <Option>Material Tailwind React</Option>
                            <Option>Material Tailwind Vue</Option>
                            <Option>Material Tailwind Angular</Option>
                            <Option>Material Tailwind Svelte</Option>
                        </Select>

                        <Input size="lg"
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        />
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
                            ({ img, name, email, ServiceType1,ServiceType2, org, EventID, TotCost, TotPaid }, index) => {
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
                                                    {/* <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70"
                                                    >
                                                        {email}
                                                    </Typography> */}
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
                                                    {ServiceType1}
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {ServiceType2}
                                                </Typography>
                                                {/* <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal opacity-70"
                                                >
                                                    {org}
                                                </Typography> */}
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                {/* <Chip
                                                    variant="ghost"
                                                    size="sm"
                                                    value={online ? "online" : "offline"}
                                                    color={online ? "green" : "blue-gray"}
                                                /> */}
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {EventID}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {TotCost}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {TotPaid}
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
export default PaymentListTable


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

const TABLE_HEAD = ["Customer Name", "Service Type", "Event ID", "Total Cost", "Total Paid", "Edit"];

const TABLE_ROWS = [
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
        name: "John Michael",
        // email: "john@creative-tim.com",
        ServiceType1: "Wedding",
        ServiceType2: "Photography",
        // org: "Organization",
        EventID: 'WP-1002',
        TotCost: "23/04/18",
        TotPaid:"150,000.00"
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
        name: "Floyd MIles",
        // email: "john@creative-tim.com",
        ServiceType1: "Mug Printing",
        // org: "Organization",
        EventID: 'MP-20',
        TotCost: "1,500.00",
        TotPaid:"10,000.00"
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
        name: "John Michael",
        // email: "john@creative-tim.com",
        ServiceType1: "Birthday Shoot",
        // org: "Organization",
        EventID: 'BP-201',
        TotCost: "20,000.00",
        TotPaid:"150,000.00"
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
         name: "Marvin McKinney",
        // email: "john@creative-tim.com",
        ServiceType1: "Digital Printing",
        // org: "Organization",
        EventID: 'DP-38',
        TotCost: "4750.00",
        TotPaid:"80,000.00"
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
        name: "Jerome Bell",
        // email: "john@creative-tim.com",
        ServiceType1: "Mug Printing",
        // org: "Organization",
        EventID: 'MP-41',
        TotCost: "750.00",
        TotPaid:"550,000.00"
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
        name: "Kathryn Murphy",
        // email: "john@creative-tim.com",
        ServiceType1: "Pre shoot",
        // org: "Organization",
        EventID: 'PS-402',
        TotCost: "50,000.00",
        TotPaid:"20,000.00"
    },
];