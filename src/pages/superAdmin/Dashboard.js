import React from 'react'
import Card from '../../components/cards/card.js'
import BarAnimation from '../../components/graphs/BarGraph.js'
import BasicBars from '../../components/graphs/BarGraph.js'
import { CardHeader, Input, Typography, Button, CardBody, Chip, CardFooter, Tabs, TabsHeader, Tab, Avatar, IconButton, Tooltip, Select, Option, } from "@material-tailwind/react";
import PieChar from '../../components/graphs/PieChart.js'
import Datepicker from "../../components/datePicker/Datepicker";
import { Pagination } from "../../components/pagination/pagination";
import { MagnifyingGlassIcon, ChevronUpDownIcon, } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import Test from './Test.js'
import PaymentListTable from '../../components/tables/PaymentListTable.js';
import CountViewCard from '../../components/cards/CountViewCard.js';

function SuperAdminDashboard() {
  return (
            <div>
                {/* <Test /> */}
                <CountViewCard />
                <div className='flex'>
                  <BasicBars />
                  <PieChar />
                </div>
                <PaymentListTable />
              
                
                
                
            </div>
    
  )
}

export default SuperAdminDashboard
