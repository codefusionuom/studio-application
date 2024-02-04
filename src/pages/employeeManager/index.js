import React from 'react'
import { Outlet } from 'react-router-dom'
import Layout from '../../global/Layout'
import { employeeManagerList } from '../../global/Layout/data'

function EmployeeManager() {
  return ( 
    // section should be your topic list of side bar in /global/data.js
  <Layout sections={employeeManagerList}>
    <Outlet />
    
  </Layout >

  )
}

export default EmployeeManager