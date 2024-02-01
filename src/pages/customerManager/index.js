import React from 'react'
import PaymentDetails from './paymentDetails'
import PaymentList from './PaymentsList'
import CustomerRequests from './CustomerRequests'
import Customers from './Customers'
import CreateCustomerRequest from './CreateCustomerRequest'
import Dashboard from './Dashboard'
import EventCalandar from './EventCalandar'
import { Outlet, Route, Routes } from 'react-router-dom'
import Layout from '../../global/Layout'
import { customerList } from '../../global/Layout/data'

function CustomerManager() {
  return (

 <>
        
  <Layout sections={customerList}>
    <Outlet />
  </Layout >
    {/* <PaymentList/> */}
    {/* <CustomerRequests/> */}
    {/* <Customers></Customers> */}
    {/* <CreateCustomerRequest /> */}
    {/* <EventCalandar /> */}
    {/* <Dashboard/> */}
</>

  )
}

export default CustomerManager