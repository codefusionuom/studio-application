import React from 'react'

function LongCard({title,title2,onClick}) {

  return (

            <div  onClick={onClick} className='flex  items-center justify-between w-[1400px] h-[150px] bg-cl-4 rounded font-lato text-xl text-cl-1 px-5 mb-5'>
        
           <div className=''>
           {title}
           </div>
           <div onClick={onClick}  className=''>
           {title2}
           </div>
    </div>


    
  )
}

export default LongCard

