import { MagnifyingGlassIcon, } from "@heroicons/react/24/outline";
import { Card, CardHeader, Input, Typography, CardBody, CardFooter, Tooltip, Select, Option, } from "@material-tailwind/react";
import { Pagination } from "../../components/pagination/pagination";
import UpdateEmployee from "./empForms/updateEmployee";
import { useState, useEffect } from "react";
import axios from "axios";


function EmployeeList() {

    const [users, setUser] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/employeeManager/getEmployees')
            .then(result => setUser(result.data))
            .catch(err => console.log(err))
        console.log(users)
    }, [])

    return (
        <Card className=" w-full border-2 ">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="flex flex-col items-center justify-between gap-4  md:flex-row ">
                    <div className="text-2xl pt-6 pl-10 font-semibold">
                        <p>Employee List</p>
                    </div>
                    <div className=" flex p-4 gap-6">
                        <Select size="lg" label="Sort By: Newest" className="z-10">
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
                                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50 "
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
                        {users.map((user) => {

                            return (
                                <tr key={user.empId}>
                                    <td >
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col pl-8">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {user.empName}
                                                </Typography>

                                            </div>
                                        </div>
                                    </td>
                                    <td >
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {user.empDepartment}
                                            </Typography>

                                        </div>
                                    </td>
                                    <td >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {user.empNumber}
                                        </Typography>
                                    </td>
                                    <td >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {user.id}
                                        </Typography>
                                    </td>
                                    <td >
                                    <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {user.empAdd}
                                        </Typography>
                                    </td>
                                    <td >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {user.empType}
                                        </Typography>
                                    </td>
                                    <td >
                                        <Tooltip content="Edit User">
                                            <UpdateEmployee idx={user.id} />
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
export default EmployeeList

const TABLE_HEAD = ["Employee Name", "Department", "Phone Number", "Employee ID", "Address", "Employed", "Edit"];