import { PlusIcon } from "@heroicons/react/24/outline";
import { Typography } from "@material-tailwind/react";
import React from "react";

function SmallCard({ title, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex justify-center items-center w-[450px] h-[140px] bg-cl-4
     rounded font-lato text-xl font-semibold text-cl-1 px-2  hover:to-blue-50  hover:drop-shadow-lg"
    >

      <Typography variant="h5" className=" mr-5 ">
        <PlusIcon className="h-10 w-10" />
      </Typography>

      {title}
    </div>
  );
}

export default SmallCard;
