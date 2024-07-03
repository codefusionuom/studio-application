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




function AllowancePage() {

    const [openCreate, setOpenCreate] = React.useState(false);
    const handleOpenCreate = () => setOpenCreate((cur) => !cur);
    const [openView, setOpenView] = React.useState(false);
    const handleOpenView = () => setOpenView((cur) => !cur);
    const [openAdd, setOpenAdd] = React.useState(false);
    const handleOpenAdd = () => setOpenAdd((cur) => !cur);

    return (
        <div>
            <div>
                <div className='flex justify-evenly pb-5'>
                    <div>
                        <DashCard2  title2={"Create Allowences/Deductions"} title3={""} onClick={handleOpenCreate}/>
                        <Dialog
                            open={openCreate}
                            handler={handleOpenCreate}
                            className="bg-transparent shadow-none w-fit"
                        >
                            <CreateAllowancesDeductions/>
                        </Dialog>
                    </div>
                    <div className='flex justify-evenly pb-5'>
                    <DashCard2 title2={"View Allowance/Deduction"} title3={""} onClick={handleOpenView} />
                    <Dialog
                        open={openView}
                        handler={handleOpenView}
                        className="bg-transparent shadow-none w-fit"
                    >
                        {/* <Card className="mx-auto w-full "> */}
                        {/* <CardBody className="flex"> */}
                            <ViewAllowance/>
                        {/* </CardBody> */}
                        {/* </Card> */}
                    </Dialog>
                    </div>
                    {/* <ButtomViewAllowance></ButtomViewAllowance> */}
                </div>
                <div className='flex justify-evenly pb-5'>
                    <div>
                        <DashCard2  title2={"Add Allowences/Deductions"} title3={""} onClick={handleOpenAdd}/>
                        <Dialog
                            open={openAdd}
                            handler={handleOpenAdd}
                            className="bg-transparent shadow-none w-fit"
                        >
                            {/* <CreateAllowancesDeductions/> */}
                            <AddAllowance/>
                        </Dialog>
                    </div>
                    <div className='flex justify-evenly pb-5'>
                    {/* <DashCard2 title2={"View Allowance/Deduction"} title3={""} onClick={handleOpenView} />
                    <Dialog
                        open={openView}
                        handler={handleOpenView}
                        className="bg-transparent shadow-none w-fit"
                    >
                            <ViewAllowance/>
                    </Dialog> */}
                    </div>
                </div>
            </div>
            <div>
                <AllowanceList/>
            </div>
        </div>
    )
}
export default AllowancePage