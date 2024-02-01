import React from 'react'
import { Outlet } from 'react-router-dom'
import Layout from '../../global/Layout'
import { customerList } from '../../global/Layout/data'

function SuperAdmin() {
  return ( 
    // section should be your topic list of side bar in /global/data.js
  <Layout sections={customerList}>
    superAdmin
    <Outlet />
  </Layout >

  )
}

export default SuperAdmin