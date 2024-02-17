import React from 'react'

function SmallCard({title,onClick}) {
  return (
    <div  onClick={onClick} className='flex justify-center items-center w-[350px] h-[140px] bg-cl-4
     rounded font-lato text-xl text-cl-1 px-2 hover:bg-blue-50 hover:drop-shadow-lg'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
</svg>


{title}
    </div>
  )
}

export default SmallCard