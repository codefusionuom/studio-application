import React from 'react'
import { Outlet } from 'react-router-dom'
import Layout from '../../global/Layout'
import { customerList } from '../../global/Layout/data'

function EventManager() {
  return ( 
    // section prop should be your topic list of side bar in /global/data.js
  <Layout sections={customerList}>
    EventManager 123
    <Outlet />
  </Layout >

  )
}

export default EventManager