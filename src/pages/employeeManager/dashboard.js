import React from 'react'

import EmployeeList from './employeeList.js'
import { QuickView } from './dashQuick.js'
import DashCard from './dashButtonCard.js'
import DashTableCard from './dashTableCard.js'
import RegisterEmployee from './empForms/registerEmployees.jsx'
import DashCard2 from './dashButtonCard copy.js'
import AdvanceSalary from './empForms/advanceSalary.jsx'





function EmployeeManagerDashboard() {
    return (
        <div>
            <div>
                <QuickView/>
            </div>

            <div className='flex justify-evenly pb-5'>
                {/* <DashCard title2={"Register Employee"} title3={"Add Personal Here"}/> */}
                <RegisterEmployee></RegisterEmployee>
                {/* <DashCard2 title2={"Advance Request"} title3={"Salary Advance"}/> */}
                <AdvanceSalary></AdvanceSalary>
            </div>

            <div className='employeeList'>
            <EmployeeList></EmployeeList>

            </div>



        </div>
    )
}
export default EmployeeManagerDashboard