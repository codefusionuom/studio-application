
import { Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'

function Topbar() {
  const [dateTime, setDateTime] = useState({
    date: '',
    time: '',
    day: '',
    greeting: ''
  });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const date = now.toLocaleDateString(undefined, options);
      const time = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
      const day = now.toLocaleDateString(undefined, { weekday: 'long' });

      const hour = now.getHours();
      let greeting = 'Good Morning';
      if (hour >= 12 && hour < 18) {
        greeting = 'Good Afternoon';
      } else if (hour >= 18) {
        greeting = 'Good Evening';
      }

      setDateTime({
        date,
        time,
        day,
        greeting
      });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
  return (
    <div className="w-[100%] bg-bg flex justify-between py-10 px-10 bg-[#F3F3F3] bg-opacity-57">
      <div >

      <Typography className="text-black font-lato text-3xl font-normal">
          {dateTime.greeting}
        </Typography>
        <Typography className="text-black font-lato text-base font-normal" >
          Have a Good day
        </Typography>
      </div>
      <div className="flex ">

        <div className="flex gap-5">
          <div className="border-r border-2 border-gray-400 "></div>
          <div className="flex flex-col gap-4">
            <Typography className="text-gray-700 font-lato text-sm font-medium leading-5">
              {dateTime.date}
            </Typography>
            <Typography className="text-gray-700 font-lato text-2xl font-bold leading-5 tracking-wide">
              {dateTime.day}
            </Typography>
            <Typography className="text-gray-700 font-lato text-lg font-medium leading-5">
              {dateTime.time}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar