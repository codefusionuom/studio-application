import React from "react";
import {
  Dialog,
  Card,
  CardBody,
} from "@material-tailwind/react";
import DashCard2 from "../dashButtonCard copy";
import ViewAllowance from "../allowance/viewallowance";

function ButtomViewAllowance() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <DashCard2 title2={"View Allowance/Deduction"} title3={""} onClick={handleOpen} />
      <Dialog
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none w-fit"
      >
        <Card className="mx-auto w-full ">
          <CardBody className="flex">
            <ViewAllowance></ViewAllowance>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
export default ButtomViewAllowance