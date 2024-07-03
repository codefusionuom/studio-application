import React from "react";
import { IconButton } from "@material-tailwind/react";

import { PencilIcon as EditIcon } from "@heroicons/react/24/outline";



const RejectButton = ({onClick}) => {
  return (
    <div>
      <IconButton
        color="red"
        size="regular"
        onClick={onClick}
        ripple="light"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </IconButton>
    </div>
  );
};

export default RejectButton;
