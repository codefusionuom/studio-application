import React, {useState} from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";



 
function RegisterEmployee() {

    const [empName,setEmpName] = useState()
    const [empId,setEmpId] = useState()
    const [empAdd,setEmpAdd] = useState()
    const [empType,setEmpType] = useState()
    const [empSalary,setEmpSalary] = useState()
    const [empDepartment,setEmpDepartment] = useState()
    const [empNumber,setEmpNumber] = useState()
    const navigate = useNavigate()

    const Submit = (e) => {
      e.preventDefault()
      axios.post("http://localhost:5000/employeeManager/registerEmployee", {empName,empAdd,empDepartment,empId,empNumber,empSalary,empType})
      .then(result => {
          console.log(result)
          window.location.reload()
          // navigate('/employeeManager')
      })
      .catch(err => console.log(err))
    }



    
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
            <form onSubmit={Submit}>
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
                <Input label="Employee ID" size="lg" onChange={(e) => setEmpId(e.target.value)}/>
              </div>
              <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Employee Name :
                </Typography>
                <Input label="Employee Name" size="lg" onChange={(e) => setEmpName(e.target.value)}/>
              </div>
              

            </div>


            <div className=" flex flex-row justify-between ">
            <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                Address :
                </Typography>

                <Input label="Address" size="lg" onChange={(e) => setEmpAdd(e.target.value)}/>
              </div>
            
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Type:
                </Typography>

                <Input label="Type" size="lg" onChange={(e) => setEmpType(e.target.value)}/>
              </div>
             


             
            </div>

            <div className=" flex flex-row justify-between ">
            
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Basic Salary:
                </Typography>

                <Input label="Basic Salary" size="lg" onChange={(e) => setEmpSalary(e.target.value)}/>
              </div>
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Select Deoartment :
                </Typography>

                <Input label="Select Department" size="lg" onChange={(e) => setEmpDepartment(e.target.value)}/>
              </div>


             
            </div>

            <div className=" flex flex-row justify-between ">
            
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Contact number :
                </Typography>

                <Input label="Contact Number" size="lg" onChange={(e) => setEmpNumber(e.target.value)}/>
              </div>
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                </Typography>

              </div>


             
            </div>


            {/* <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div> */}
          </form>
          </CardBody>
          <CardFooter className="pt-0">
            <div className=" flex flex-row justify-between">
              <Button className=" bg-yellow-800" onClick={handleOpen}>
                Clear
              </Button>
              <Button className=" bg-green-600" onClick={Submit}>
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