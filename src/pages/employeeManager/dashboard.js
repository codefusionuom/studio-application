import React from 'react'

import EmployeeList from './employeeList.js'
import { QuickView } from './dashQuick.js'
import DashCard from './dashButtonCard.js'
import DashTableCard from './dashTableCard.js'





function EmployeeManagerDashboard() {
    return (
        <div>
            <div>
                <QuickView/>
            </div>

            <div className='flex justify-evenly pb-5'>
                <DashCard title2={"Add Employee"} title3={"Add Personal Here"}/>
                <DashCard title2={"Advance Request"} title3={"Salary Advance"}/>
            </div>

            <div className='employeeList'>
            <EmployeeList></EmployeeList>

            </div>



        </div>
    )
}
export default EmployeeManagerDashboard