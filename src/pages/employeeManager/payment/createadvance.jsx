import React, { useState, useEffect } from "react";
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
import SelectOption from "@material-tailwind/react/components/Select/SelectOption";




function CreateAdvance() {

  const [empName, setEmpName] = useState()
  const [users, setUser] = useState([])
  const [empId, setEmpId] = useState()
  const [empAdd, setEmpAdd] = useState()
  const [empType, setEmpType] = useState()
  const [empSalary, setEmpSalary] = useState()
  const [empDepartment, setEmpDepartment] = useState()
  const [empNumber, setEmpNumber] = useState()
  const navigate = useNavigate()
  const [errorAdd, setErrorAdd] = useState()
  const [errorDepartment, setErrorDepartment] = useState()
  // const [errorId, setErrorId] = useState()
  const [errorAmount, setErrorAmount] = useState()
  const [errorName, setErrorName] = useState()
  const [advanceAmount, setAdvanceAmount] = useState()
  const [errorType, setErrorType] = useState()
  const [allowanceorDeduction,setAllowanceorDeduction] = useState("Select Allowance/Deduction")

  useEffect(()=>{
    axios.get('http://localhost:5000/employeeManager/getEmployees')
    .then(result => setUser(result.data))
    .catch(err => console.log(err))
    console.log(users)
},[])




  const Submit = (e) => {
    e.preventDefault()

    if (!empId) {
      setErrorName(true);
      alert("Please Select Employee");
      return;
    }
    setErrorName(false);
    if (!advanceAmount) {
        setErrorAmount(true);
        alert("Please fill amount");
        return;
      }
    setErrorName(false);
    if (isNaN(advanceAmount)) {
        setErrorAmount(true);
        alert("Allowance must be numeric");
        return;
     }

    axios.post("http://localhost:5000/employeeManager/createAdvance", { empId, advanceAmount })
      .then(result => {
        console.log(result)
        window.location.reload()
      })
      .catch(err => console.log(err))
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <DashCard2  title2={"Create Advance"} title3={""} onClick={handleOpen}/>
      <Dialog
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none w-fit"
      >
        <Card className="mx-auto w-full ">
          <CardBody className="flex flex-col gap-4">
            <form onSubmit={Submit}>
              <Typography variant="h4" color="blue-gray">
                Create Advance
              </Typography>
              <div className=" flex flex-row justify-between ">
                <div className="flex flex-col justify-between">
                  <Typography className="mb-2" variant="h6">
                    Select Employee
                  </Typography>
                  <Select label='Select Name' onChange={(val) => setEmpId(val)}>
                            {users.map((user) => {
                            return (
                                <SelectOption   key={user.id} value={user.id}>{user.empName} </SelectOption>
                                );},
                                )}
                          </Select>
                </div>
                <div className="flex flex-col justify-between">
                </div>
              </div>
              <div className=" flex flex-row justify-between ">
                <div className=" flex flex-col justify-between">
                  <Typography className="mb-2" variant="h6">
                    Advance Amount:
                  </Typography>
                  <Input label="Advance Amount" size="lg" onChange={(e) => setAdvanceAmount(e.target.value)} error={errorAdd ? "true" : null} />
                </div>
                <div className=" flex flex-col justify-between">
                </div>
              </div>
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
export default CreateAdvance