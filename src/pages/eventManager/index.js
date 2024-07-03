import React from 'react'
import { Outlet } from 'react-router-dom'
import Layout from '../../global/Layout'
import { customerList, eventManagerList } from '../../global/Layout/data'
import Dashboard from './EventManagerdashboard'
import EventManagerEventCalendar from './eventManagerEventCalendar'
import EventRequests from './eventRequests'
import CreateEvent from './createEvent' 
import EventManagerEvents from './eventManagerEvents'
import EventManagerEvents2 from './eventManagerEvents2'

function EventManager() {
  return ( 
    // section prop should be your topic list of side bar in /global/data.js
  <Layout sections={eventManagerList}>
      
    <Outlet />
  </Layout >

  )
}

export default EventManager