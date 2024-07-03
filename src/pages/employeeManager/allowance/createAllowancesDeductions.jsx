import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import DashCard from "../dashButtonCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashCard2 from "../dashButtonCard copy";
import { ToastError,ToastSuccess } from "../../customerManager/ToastAlert";


function CreateAllowancesDeductions({setOpenCreate}) {

  const [empName, setEmpName] = useState()
  // const [empId, setEmpId] = useState()
  const [empAdd, setEmpAdd] = useState()
  const [empType, setEmpType] = useState()
  const [empSalary, setEmpSalary] = useState()
  const [empDepartment, setEmpDepartment] = useState()
  const [empNumber, setEmpNumber] = useState()
  const navigate = useNavigate()
  const [errorAdd, setErrorAdd] = useState()
  const [errorDepartment, setErrorDepartment] = useState()
  // const [errorId, setErrorId] = useState()
  const [errorName, setErrorName] = useState()
  const [errorNumber, setErrorNumber] = useState()
  const [allowanceDeductionName, setAllowanceDeductionName] = useState()
  const [errorType, setErrorType] = useState()
  const [allowanceorDeduction,setAllowanceorDeduction] = useState("Select Allowance/Deduction")

  const Submit = (e) => {
    e.preventDefault()

    if (!allowanceorDeduction) {
      setErrorType(true);
      return;
    }
    setErrorType(false);
    if (!allowanceDeductionName) {
      setErrorName(true);
      return;
    }
    setErrorName(false);

    axios.post("http://localhost:5000/employeeManager/createAllowanceDeduction", { allowanceorDeduction, allowanceDeductionName })
      .then(result => {
        console.log(result)
        // window.location.reload()
        ToastSuccess("Record added successfully")
        setOpenCreate((prev)=>!prev)
      })
      .catch(err => {console.log(err);ToastError(err.message)})
  }

  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      
        <Card className="mx-auto w-full ">
          <CardBody className="flex flex-col gap-4">
            <form onSubmit={Submit}>
              <Typography variant="h4" color="blue-gray">
                Create Allowance
              </Typography>
              <div className=" flex flex-row justify-between ">
                <div className="flex flex-col justify-between">
                  <Typography className="mb-2" variant="h6">
                    Allowance/Deduction :
                  </Typography>
                  <Select label="Allowance/Deduction" onChange={(val) => setAllowanceorDeduction(val)} error={errorType ? "true" : null}>
                    <Option value="Allowance">Allowance</Option>
                    <Option value="Deduction">Deduction</Option>
                  </Select>
                  { errorType ? 
                    <Typography variant="small" color="red" className="  flex items-center gap-1 font-normal">Select Type</Typography> 
                  : 
                    null
                   }
                </div>
                <div className="flex flex-col justify-between">
                </div>
              </div>
              <div className=" flex flex-row justify-between ">
                <div className=" flex flex-col justify-between">
                  <Typography className="mb-2" variant="h6">
                    {allowanceorDeduction}
                  </Typography>
                  <Input label={allowanceorDeduction} size="lg" onChange={(e) => setAllowanceDeductionName(e.target.value)} error={errorName ? "true" : null} />
                  { errorName ? 
                    <Typography variant="small" color="red" className="  flex items-center gap-1 font-normal">Select Name</Typography> 
                  : 
                    null
                   }
                </div>
                <div className=" flex flex-col justify-between">
                </div>
              </div>
            </form>
          </CardBody>
          <CardFooter className="pt-0">
            <div className=" flex flex-row justify-between">
              {/* <Button className=" bg-yellow-800" onClick={handleOpen}>
                Clear
              </Button> */}
              <Button className=" bg-green-600" onClick={Submit}>
                Create
              </Button>
            </div>
          </CardFooter>
        </Card>
      
    </>
  );
}
export default CreateAllowancesDeductions