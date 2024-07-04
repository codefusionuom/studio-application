import React, { useEffect, useState } from 'react'
import { Input } from "@material-tailwind/react";
import Datepicker from '../../../components/datePicker/Datepicker';
import { Button } from "@material-tailwind/react";
import ViewSalary from '../payment/viewSalartbutton';
import DashCard2 from '../dashButtonCard copy';
import EmployeePaymentDetails from '../payment/employeePaymentDetails';
import ViewEmployeePaymentDetails from '../payment/viewemployeePaymentDetails';
import axios from "axios";
import { Select } from "@material-tailwind/react";
import SelectOption from "@material-tailwind/react/components/Select/SelectOption";
import CreateAllowancesDeductions from './createAllowancesDeductions';
import ButtomViewAllowance from '../payment/buttonViewAllowance';
import { Dialog } from '@material-tailwind/react';
import ViewAllowance from './viewallowance';
import AddAllowance from './addallowance';
import AllowanceList from './allowanceList';
import SmallCard from '../../../components/cards/card';




function AllowancePage() {

    const [openCreate, setOpenCreate] = React.useState(false);
    const handleOpenCreate = () => setOpenCreate((cur) => !cur);
    const [openView, setOpenView] = React.useState(false);
    const handleOpenView = () => setOpenView((cur) => !cur);
    const [openAdd, setOpenAdd] = React.useState(false);
    const handleOpenAdd = () => setOpenAdd((cur) => !cur);
    const [reload,setReload] = useState(false)

    return (
        <div>
            <div>
                <div className='flex  pb-5'>
                    <div>
                        {/* <DashCard2  title2={"Create Allowences/Deductions"} title3={""} onClick={handleOpenCreate}/> */}
                        <SmallCard
                        className=" w-full cursor-pointer"
                        title="+ Create Allowance/Deduction"
                        onClick={handleOpenCreate}
                        />
                        <Dialog
                            open={openCreate}
                            handler={handleOpenCreate}
                            className="bg-transparent shadow-none w-fit"
                        >
                            <CreateAllowancesDeductions setOpenCreate={setOpenCreate}/>
                        </Dialog>
                    </div>
                    <div className='pl-10'>
                    {/* <DashCard2 title2={"View Allowance/Deduction"} title3={""} onClick={handleOpenView} /> */}
                    <SmallCard
                        className=" w-full cursor-pointer"
                        title="View Allowance/Deduction"
                        onClick={handleOpenView}
                        />
                    <Dialog
                        open={openView}
                        handler={handleOpenView}
                        className="bg-transparent shadow-none w-fit"
                    >
                            <ViewAllowance/>
                    </Dialog>
                    </div>
                    <div className='pl-10'>
                        {/* <DashCard2  title2={"Add Allowences/Deductions"} title3={""} onClick={handleOpenAdd}/> */}
                        <SmallCard
                        className=" w-full cursor-pointer"
                        title="+ Asign Allowance/Deduction"
                        onClick={handleOpenAdd}
                        />
                        <Dialog
                            open={openAdd}
                            handler={handleOpenAdd}
                            className="bg-transparent shadow-none w-fit"
                        >
                            <AddAllowance setOpenAdd={setOpenAdd} setReload={setReload}/>
                        </Dialog>
                    </div>
                </div>
            </div>
            <div>
                <AllowanceList reload={reload}/>
            </div>
        </div>
    )
}
export default AllowancePage