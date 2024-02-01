import React from 'react'
import { Outlet } from 'react-router-dom'
import Layout from '../../global/Layout'
import { customerList } from '../../global/Layout/data'

function StockManager() {
  return ( 
    // section should be your topic list of side bar in /global/data.js
  <Layout sections={customerList}>
    StockManager
    <Outlet />
  </Layout >

  )
}

export default StockManager