import React from 'react'

function SmallCard({title,onClick}) {
  return (
    <div  onClick={onClick} className='flex justify-center items-center w-[340px] h-[140px] bg-cl-4 rounded font-lato text-xl text-cl-1 px-2'>
{title}
    </div>
  )
}

export default SmallCard