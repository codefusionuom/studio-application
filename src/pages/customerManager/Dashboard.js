import React from 'react'
import Card from '../../components/cards/card.js'
import NotificationCard from '../../components/cards/notificationCard.js'
import Payment from '../../components/pos.js/index.js'

function Dashboard() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='flex gap-10'>
        <NotificationCard title={"Customer Requests"} notificationNumber={4}/>
        <Card title={"+   Add New Request"}/>
        </div>
        <div className=''>
        <Payment/>
        </div>
       
    </div>
  )
}

export default Dashboard