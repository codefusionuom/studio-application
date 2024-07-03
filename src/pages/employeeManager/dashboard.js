import React from 'react'
import EmployeeList from './employeeList.js'
import RegisterEmployee from './empForms/registerEmployees.jsx'
import AdvanceSalary from './empForms/advanceSalary.jsx'
import { QuickView1 } from './dashQuick copy.js'
import DashCard from './dashButtonCard.js'
import { Dialog } from '@material-tailwind/react'
import { useState } from 'react'
import SmallCard from '../../components/cards/card.js'



function EmployeeManagerDashboard() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    const [reload, setReload] = useState(false)

    return (
        <div>
            {/* <div>
                <QuickView1></QuickView1>
            </div> */}
            <div className='flex justify-left pb-5'>
                {/* <RegisterEmployee></RegisterEmployee> */}
                <div>
                    {/* <DashCard className="cursor-pointer" title2={"Register Employee"} title3={"Add Personal Here"} onClick={handleOpen} /> */}
                    <SmallCard
                        className=" w-full cursor-pointer"
                        title="+ Register Employee"
                        onClick={handleOpen}
                        />
                    <Dialog
                        open={open}
                        handler={handleOpen}
                        className="bg-transparent shadow-none w-fit"
                    ><RegisterEmployee setReload={setReload} setOpen={setOpen}/>
                    </Dialog>
                </div>
                {/* <AdvanceSalary></AdvanceSalary> */}
            </div>
            <div className='employeeList'>
                <EmployeeList reload={reload}></EmployeeList>
            </div>
        </div>
    )
}
export default EmployeeManagerDashboard