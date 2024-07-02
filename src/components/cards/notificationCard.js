import { Badge } from '@material-tailwind/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotificationCard({title,notificationNumber}) {
  const handleclick=()=>{
    navigate("/customerManager/customerRequest")
  }
  const navigate=useNavigate()
  return (
    <Badge content={notificationNumber}  >
    <div onClick={handleclick} className='cursor-pointer flex justify-center items-center w-[314px] h-[140px] bg-cl-4 rounded font-lato text-xl text-cl-1'>
      {title}

    </div>
    </Badge>
  )
}

export default NotificationCard