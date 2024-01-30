import { Badge } from '@material-tailwind/react'
import React from 'react'

function NotificationCard({title,notificationNumber}) {
  return (
    <Badge content={notificationNumber} >
    <div className='flex justify-center items-center w-[314px] h-[140px] bg-cl-4 rounded font-lato text-xl text-cl-1'>
      {title}

    </div>
    </Badge>
  )
}

export default NotificationCard