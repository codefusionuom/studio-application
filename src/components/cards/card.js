import React from 'react'

function SmallCard({title,onClick}) {
  return (
    <div  onClick={onClick} className='flex justify-center items-center w-[350px] h-[140px] bg-cl-4
     rounded font-lato text-xl text-cl-1 px-2 hover:bg-blue-50 hover:drop-shadow-lg'>
{title}
    </div>
  )
}

export default SmallCard