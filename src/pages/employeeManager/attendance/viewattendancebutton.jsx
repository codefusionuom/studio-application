import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  Input,
} from "@material-tailwind/react";
import AttendanceList from "./attendancetable";

function ViewAttendance() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <div className=" flex p-4 gap-6">
        <div className="w-72">
          <Input label="Date" disabled />
        </div>
        <Button color="blue" onClick={handleOpen}>View Attendance</Button>
      </div>
      <Dialog
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none w-max"
      >
        <Card className="mx-auto w-full ">
          <CardBody className="flex">
            <AttendanceList></AttendanceList>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
export default ViewAttendance