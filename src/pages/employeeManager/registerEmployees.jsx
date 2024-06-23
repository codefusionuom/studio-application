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
 
function RegisterEmployee() {

    
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur); 
 
  return (
    <>
      {/* <SmallCard className=" w-full cursor-pointer" title={title} onClick={handleOpen} /> */}



      <DashCard className="cursor-pointer" title2={"Register Employee"} title3={"Add Personal Here"} onClick={handleOpen}/>






      <Dialog
       
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none w-fit"
      >
        <Card className="mx-auto w-full ">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
             Register new employee
            </Typography>
            {/* <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter  Stock item details Here
            </Typography> */}

            
            <div className=" flex flex-row justify-between ">
              

              <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Employee ID :
                </Typography>
                <Input label="Employee ID" size="lg"/>
              </div>
              <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Employee Name :
                </Typography>
                <Input label="Employee Name" size="lg"/>
              </div>
              

            </div>


            <div className=" flex flex-row justify-between ">
            <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                Address :
                </Typography>

                <Input label="Address" size="lg"/>
              </div>
            
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Type:
                </Typography>

                <Input label="Type" size="lg"/>
              </div>
             


             
            </div>

            <div className=" flex flex-row justify-between ">
            
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Basic Salary:
                </Typography>

                <Input label="Basic Salary" size="lg"/>
              </div>
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Select Deoartment :
                </Typography>

                <Input label="Select Department" size="lg"/>
              </div>


             
            </div>

            <div className=" flex flex-row justify-between ">
            
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Contact number :
                </Typography>

                <Input label="Contact Number" size="lg"/>
              </div>
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                </Typography>

              </div>


             
            </div>


            {/* <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div> */}
          </CardBody>
          <CardFooter className="pt-0">
            <div className=" flex flex-row justify-between">
              <Button className=" bg-yellow-800" onClick={handleOpen}>
                Clear
              </Button>
              <Button className=" bg-green-600" onClick={handleOpen}>
                Create
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
export default RegisterEmployee