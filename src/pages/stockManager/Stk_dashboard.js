import React from 'react'
import Card from '../../components/cards/card.js'
import NotificationCard from '../../components/cards/notificationCard.js'
import Payment from '../../components/pos.js/index.js'
import LongCard from './Stk_components/LongCard.js'

function DashboardSmgr() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='flex gap-10'>
        <Card title={"Stock Item Availability"}/>
        <Card title={"+   Add Stock Item"}/>
        <Card title={"+   Add New Category"}/>
        </div>
        <div className=''>
        <LongCard title={"Stock Items" } title2={"View more >"}/>
        <LongCard title={"Categories" } title2={"View more >"}/>
        <LongCard title={"Returned Items" } title2={"View more >"}/>
        </div>
       
    </div>
  )
}

export default DashboardSmgr