import React from 'react'

function DashCard2({title2,title3,onClick}) {
  return (
    <div  onClick={onClick} className='w-[500px] h-[140px] bg-cl-4 rounded font-lato text-xl text-cl-1 px-2 flex justify-evenly'>
          <div className='flex flex-col justify-center'>
              <div className='flex justify-center text-3xl'>
                  {title2}
              </div>
              <div className='flex justify-center text-gray-600 pt-2'>
                  {title3}
              </div>
          </div>
    </div>
  )
}

export default DashCard2