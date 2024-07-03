import React from "react";
import { IconButton } from "@material-tailwind/react";
import { EyeIcon as ViewIcon } from "@heroicons/react/24/outline";

const ViewRecordButton = ({ onClick }) => {
  return (
    <div>
      <IconButton
        color="green"
        size="regular"
        onClick={onClick}
        ripple="light"
      >
        <ViewIcon className="h-6 w-6" />
      </IconButton>
    </div>
  );
};

export default ViewRecordButton;
