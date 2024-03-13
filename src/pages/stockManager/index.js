import React from 'react'
import DashboardSmgr from './Stk_dashboard'
import Suppliers from './Stk_supplier'
import GrnStock from './Stk_grn'
import StockItem from './Stk_StockItem'
import ReturnedStock from './Stk_returnedStock'
import Category from './Stk_category'
import SMpayment from './Stk_payment'
import SMpaymentDetails from './Stk_paymentDetail'
import { customerList } from '../../global/Layout/data'
import Layout from '../../global/Layout'
import { Outlet, Route, Routes } from 'react-router-dom'
import { stockManagerList } from '../../global/Layout/data'
import AddSupplier from './Stk_forms/AddSupplier'


function index() {
  return (
    <> 
    <Layout sections = {stockManagerList}>
             <Outlet />
        </Layout>      
    
</>
  )
}

export default index