import React from 'react'

function DashCard({title2,title3,onClick}) {
  return (
    <div  onClick={onClick} className='w-[340px] h-[140px] bg-cl-4 rounded font-lato text-xl text-cl-1 px-2 flex justify-center'>
        <div className='flex'>
        <div className='flex items-center justify-around'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>

        </div>
        <div className='flex flex-col justify-center'>
            <div className=''>
                {title2}
            </div>
            <div className=''>
                {title3}
            </div>
        </div>
        </div>
    </div>



  )
}

export default DashCard