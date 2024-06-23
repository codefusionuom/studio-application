import React from 'react'
import EmployeeList from './employeeList.js'
import RegisterEmployee from './empForms/registerEmployees.jsx'
import AdvanceSalary from './empForms/advanceSalary.jsx'
import { QuickView1 } from './dashQuick copy.js'

function EmployeeManagerDashboard() {
    return (
        <div>
            <div>
                <QuickView1></QuickView1>
            </div>
            <div className='flex justify-evenly pb-5'>
                <RegisterEmployee></RegisterEmployee>
                <AdvanceSalary></AdvanceSalary>
            </div>
            <div className='employeeList'>
                <EmployeeList></EmployeeList>
            </div>
        </div>
    )
}
export default EmployeeManagerDashboard