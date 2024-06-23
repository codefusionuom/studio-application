import React from "react";
import { IconButton } from "@material-tailwind/react";

import { PencilIcon as EditIcon } from "@heroicons/react/24/outline";

const EditButton = ({ onClick }) => {
  return (
    <div>
      <IconButton color="blue" size="regular" onClick={onClick} ripple="light">
        <EditIcon className="h-6 w-6" />
      </IconButton>
    </div>
  );
};

export default EditButton;
