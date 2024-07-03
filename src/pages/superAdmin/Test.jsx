// import React from "react";
// import { Button } from "@material-tailwind/react";

// function Test({ onClick }) {
//   return (
//     <Button onClick={onClick} variant="gradient">
//       Open Dialog
//     </Button>
//   );
// }

// export default Test;

import React, { useState } from "react";
import DialogComp from "./Dialog";

function Test() {
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <button onClick={handleDialogOpen} variant="gradient">
        Open Dialog
      </button>
      {/* <ButtonComponent onClick={handleDialogOpen} /> */}
      <DialogComp open={openDialog} onClose={handleDialogClose} />
    </div>
  );
}

export default Test;
