import React from 'react'
import EmployeeList from '../employeeList.js'
import RegisterEmployee from '../empForms/registerEmployees.jsx'
import AdvanceSalary from '../empForms/advanceSalary.jsx'
import { QuickView1 } from '../dashQuick copy.js'
import DashCard from '../dashButtonCard.js'
import { Dialog } from '@material-tailwind/react'
import { useState } from 'react'
import AdvanceRequestList from './advanceRequestList.js'
import DashCard2 from '../dashButtonCard copy.js'
import CreateAdvance from './createadvance.jsx'
import RejectAdvanceList from './viewRejectAdvance.jsx'



function AdvancePage() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);


    const [openCreate, setOpenCreate] = React.useState(false);
    const handleOpenCreate = () => setOpenCreate((cur) => !cur);
    const [openView, setOpenView] = React.useState(false);
    const handleOpenView = () => setOpenView((cur) => !cur);
    const [openAdd, setOpenAdd] = React.useState(false);
    const handleOpenAdd = () => setOpenAdd((cur) => !cur);
    const [openReject, setOpenReject] = React.useState(false);
    const handleOpenReject = () => setOpenReject((cur) => !cur);


    return (
        <div>

                <div className='flex justify-evenly pb-5'>
                <div>
                <DashCard2  title2={"Create Advance"} title3={""} onClick={handleOpenCreate}/>
                <Dialog
                    open={openCreate}
                    handler={handleOpenCreate}
                    className="bg-transparent shadow-none w-fit"
                >
                    <CreateAdvance/>
                </Dialog>
                </div>
                <div>
                <DashCard2  title2={"View Rejected Advance"} title3={""} onClick={handleOpenReject}/>
                <Dialog
                    open={openReject}
                    handler={handleOpenReject}
                    className="bg-transparent shadow-none w-fit"
                >
                    <RejectAdvanceList/>
                </Dialog>
                </div>
                
                
            </div>
            <div className='employeeList'>
                <AdvanceRequestList/>
            </div>
        </div>
    )
}
export default AdvancePage