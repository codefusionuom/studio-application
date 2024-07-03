import React from "react";
import { IconButton } from "@material-tailwind/react";

import { PencilIcon as EditIcon } from "@heroicons/react/24/outline";



const AcceptButton = ({onClick}) => {
  return (
    <div>
      <IconButton
        color="green"
        size="regular"
        onClick={onClick}
        ripple="light"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </IconButton>
    </div>
  );
};

export default AcceptButton;
