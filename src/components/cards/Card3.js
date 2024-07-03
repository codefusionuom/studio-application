import { ListBulletIcon } from "@heroicons/react/24/outline";
import { Typography } from "@material-tailwind/react";
import React from "react";

function Card3({ title, onClick }) {
  return (
    <div className="">
      <div
        onClick={onClick}
        className="flex justify-center items-center w-[300px] h-[140px]   bg-white
     rounded font-lato text-lg font-semibold  text-cl-1  hover:to-blue-50 hover:drop-shadow-lg"
      >
        <Typography variant="h5" className= " mr-5 items-start" >
            <ListBulletIcon className="h-10 w-10" />
        </Typography>
        {title}



       
      </div>
    </div>
  );
}

export default Card3;
