import React from "react";
import {
  Dialog,
  Card,
  CardBody,
} from "@material-tailwind/react";
import AdvanceRequestList from "../advanceRequestList";
import DashCard2 from "../dashButtonCard copy";

function AdvanceSalary() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <DashCard2 title2={"Advance Request"} title3={"Salary Advance"} onClick={handleOpen} />
      <Dialog
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none w-fit"
      >
        <Card className="mx-auto w-full ">
          <CardBody className="flex">
            <AdvanceRequestList></AdvanceRequestList>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
export default AdvanceSalary