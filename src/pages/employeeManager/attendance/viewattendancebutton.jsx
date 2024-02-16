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
import AttendanceList from "./attendancetable";
 
function ViewAttendance() {

    
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur); 
 
  return (
    <>
      {/* <SmallCard className=" w-full cursor-pointer" title={title} onClick={handleOpen} /> */}



      {/* <DashCard2  title2={"Advance Request"} title3={"Salary Advance"} onClick={handleOpen}/> */}

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