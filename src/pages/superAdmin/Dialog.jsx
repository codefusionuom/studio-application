import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  dialog,
} from "@material-tailwind/react";

function DialogComp({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogHeader>Its a simple dialog.</DialogHeader>
      <DialogBody>
        The key to more success is to have a lot of pillows. Put it this way, it
        took me twenty-five years to get these plants, twenty-five years of
        blood, sweat, and tears, and I'm never giving up, I'm just getting
        started. I'm up to something. Fan luv.
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose} className="mr-1">
          Cancel
        </Button>
        <Button variant="gradient" color="green" onClick={onClose}>
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default DialogComp;
