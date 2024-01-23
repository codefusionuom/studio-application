
import { Typography } from '@material-tailwind/react'
import React from 'react'

function Topbar() {
  return (
    <div className="w-[100%] bg-bg flex justify-between py-10 px-10 bg-[#F3F3F3] bg-opacity-57">
      <div >

        <Typography className="text-black font-lato text-3xl font-normal" >
          Good Morning
        </Typography>
        <Typography className="text-black font-lato text-base font-normal" >
          Have a Good day
        </Typography>
      </div>
      <div className="flex ">

        <div className="flex gap-5">
          <div className="border-r border-2 border-gray-400 "></div>
          <div className="flex flex-col gap-4">
            <Typography
              className="text-gray-700 font-lato text-sm font-medium leading-5"
            >
              21 September 2022
            </Typography>
            <Typography
              className="text-gray-700 font-lato text-2xl font-bold leading-5 tracking-wide"
            >
              Monday
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar