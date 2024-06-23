import React from 'react'
import { Outlet } from 'react-router-dom'
import Layout from '../../global/Layout'
import { customerList,superAdminList } from '../../global/Layout/data'


function SuperAdmin() {
  return ( 
    // section should be your topic list of side bar in /global/data.js
  <Layout sections={superAdminList}>
    <Outlet />
  </Layout >

  )
}

export default SuperAdmin