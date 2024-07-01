import { MagnifyingGlassIcon, ChevronUpDownIcon, } from "@heroicons/react/24/outline";
import { Card, CardHeader, Input, Typography, Button, CardBody, Chip, CardFooter, Tabs, TabsHeader, Tab, Avatar, IconButton, Tooltip, Select, Option, } from "@material-tailwind/react";
import { Pagination } from "../../../components/pagination/pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import UpdateAdvance from "../payment/editadvance";
import UpdateEmployee from "../empForms/updateEmployee";
import React from "react";
import { Dialog } from "@material-tailwind/react";
import EditRecordButton from "../../../components/buttons/EditRecordButton";

function AdvanceRequestList() {

    const [id,setid] = useState()
    const [empId,setEmpId] = useState()
    const [empName,setEmpName] = useState()
    const [advanceAmount,setAdvanceAmount] = useState()
    const [advancePaidAmount,setAdvencePaidAmount] = useState()
    const [advanceremaining,setAdvanceRemaining] = useState()
    const [users,setUser] = useState([])
    const [open, setOpen] = React.useState(false);
    const [result, setResult] = useState()
    const [active, setActive] = useState(1)
    const [advancerequest, setAdvanceRequest] = useState()
    const [reject, setReject] = useState()



    const handleEdit = (id) => {
        setOpen((cur) => !cur) 
        setid(id)
        console.log(id);
    };



    const handleAccept = (id) => {


        axios.put("http://localhost:5000/employeeManager/acceptAdvance/" + id)
      .then(result => {
        console.log(result)
        // window.location.reload()
        // navigate('/')
      })
      .catch(err => console.log(err))
      }

      const SetAccept = (id) => {
        setAdvanceRequest(false);
        handleAccept(id);
    };
    const SetReject = (id) => {
        setAdvanceRequest(false);
        setReject(true);
        handleReject(id);
    };


      const handleReject = (id) => {

        axios.put("http://localhost:5000/employeeManager/rejectAdvance/" + id)
      .then(result => {
        console.log(result)
        // window.location.reload()
        // navigate('/')
      })
      .catch(err => console.log(err))
      }

    


    useEffect(() => {
        axios.get(`http://localhost:5000/employeeManager/getAdvance/?page=${active}`)
          .then(result => {
            setUser(result.data.rows)
            setResult(result.data.count)
        })
          .catch(err => console.log(err))
        console.log(users)
      }, [active])





    return (
        <Card className=" w-full border-2 ">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="flex flex-col items-center justify-between gap-4  md:flex-row ">
                    <div className="text-2xl pt-6 pl-10 font-semibold">
                    <p>Advance Request List</p>
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
                        {users.map(  (user) => {
                                // const isLast = index === TABLE_ROWS.length - 1;
                                // const classes = isLast
                                //     ? "p-4"
                                //     : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={user.id}>
                                        <td className={"p-4 border-b border-blue-gray-50"}>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col pl-8">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {user.empId}
                                                    </Typography>
                                                    
                                                </div>
                                            </div>
                                        </td>
                                        <td className={"p-4 border-b border-blue-gray-50"}>
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {user.advanceAmount}
                                                </Typography>
                                                
                                            </div>
                                        </td>
                                        <td className={"p-4 border-b border-blue-gray-50"}>
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {user.description}
                                                </Typography>
                                                
                                            </div>
                                        </td>
                                        {/* <td className={"p-4 border-b border-blue-gray-50"}>
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {user.advanceAmount-user.advancePaidAmount}
                                                </Typography>
                                                
                                            </div>
                                        </td> */}
                                        
                                        
                                        
                                        <td className={"p-4 border-b border-blue-gray-50"}>
                                            <Tooltip content="Edit User">



                                            {user.advancerequest ? (
                                                <div className="flex">
                                                    <div>
                                                    <EditRecordButton onClick={() => SetAccept(user.id,)}></EditRecordButton>
                                                    </div>
                                                    <div>
                                                    <EditRecordButton onClick={() => SetReject(user.id,)}></EditRecordButton>
                                                    </div>
                                                </div>
                                                ) : (
                                                    <div>
                                                        <EditRecordButton onClick={() => handleEdit(user.id,)}></EditRecordButton>
                                                    </div>
                                                    )}
                                    




                                                {/* <EditRecordButton onClick={() => handleEdit(user.id,)}></EditRecordButton> */}
                                                {/* <UpdateEmployee idx={user.id}/> */}
                                                {/* <IconButton variant="text">
                                                    <PencilIcon className="h-4 w-4" />
                                                </IconButton> */}
                                            </Tooltip>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
                
                    <Dialog
                        open={open}
                        handler={handleEdit}
                        className="bg-transparent shadow-none w-fit"
                    >
                        <UpdateAdvance idx={id}/>
                    </Dialog>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography>
                    {result}
                </Typography>
                <div className="flex gap-2">
                <Pagination  active={active} setActive={setActive} />
                </div>
            </CardFooter>
        </Card>
    );
}
export default AdvanceRequestList



const TABLE_HEAD = ["Employee Name", "Advance", "Description", "Handle"];

