import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import SmallCard from "../../../components/cards/card";
import DashCard from "../dashButtonCard";
import AdvanceRequestList from "../advanceRequestList";
import DashCard2 from "../dashButtonCard copy";
import SalaryList from "./salaryList";
 
function ViewSalary() {

    
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur); 
 
  return (
    <>
      {/* <SmallCard className=" w-full cursor-pointer" title={title} onClick={handleOpen} /> */}



      <DashCard2  title2={"View Salary"} title3={""} onClick={handleOpen}/>






      <Dialog
       
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none w-fit"
      >
        <Card className="mx-auto w-full ">
          <CardBody className="flex">
            
            {/* <AdvanceRequestList></AdvanceRequestList> */}
            <SalaryList></SalaryList>
            

          </CardBody>
          
        </Card>
      </Dialog>
    </>
  );
}
export default ViewSalary