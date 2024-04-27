import { IconButton } from "@material-tailwind/react";
import React from "react";
import { TrashIcon as DeleteIcon } from "@heroicons/react/24/outline";

const DeleteRecordButton = ({onClick}) => {
  return (
    <div>
      <IconButton
        color="red"
        size="regular"
        onClick={onClick}
        ripple="light"
      >
        <DeleteIcon className="h-6 w-6" />
      </IconButton>
    </div>
  );
};

export default DeleteRecordButton;
