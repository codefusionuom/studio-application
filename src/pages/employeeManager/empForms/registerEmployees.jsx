import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Option,
} from "@material-tailwind/react";
import DashCard from "../dashButtonCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Select, SelectOption } from "@material-tailwind/react";
import axiosInstance from "../../../config/axios.config";


function RegisterEmployee() {

  const [empName, setEmpName] = useState()
  const [empEmail, setEmpEmail] = useState()
  const [empAdd, setEmpAdd] = useState()
  const [empType, setEmpType] = useState()
  const [empSalary, setEmpSalary] = useState()
  const [empDepartment, setEmpDepartment] = useState()
  const [empNumber, setEmpNumber] = useState()
  const navigate = useNavigate()
  const [errorAdd, setErrorAdd] = useState()
  const [errorDepartment, setErrorDepartment] = useState()
  const [errorEmail, setErrorEmail] = useState()
  const [errorName, setErrorName] = useState()
  const [errorNumber, setErrorNumber] = useState()
  const [errorSalary, setErrorSalary] = useState()
  const [errorType, setErrorType] = useState()
  // const [departments, setDepartment] = useState([])
  const [departments, setDepartments] = useState([]);
  const [ToastError, setToastError] = useState()

  // const [depId, setDepID] = useState()

  useEffect(() => {
    axios.get('http://localhost:5000/superAdmin/getDepartment')
      .then(result => setDepartments(result.data.rows))
      .catch(err => console.log(err))
    console.log(departments)
  }, [])


  const Submit = (e) => {
    e.preventDefault()

    // Basic validation
    const Emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!empEmail) {
      setErrorEmail(true);
      alert("Please fill in email");
      return;
    }
    if (!Emailregex.test(empEmail)) {
      setErrorEmail(true);
      alert("Email must follow email format");
      return;
    }
    setErrorEmail(false);
    if (!empName) {
      setErrorName(true);
      alert("Please fill in employee name");
      return;
    }
    // Validation for string fields
    const lettersRegex = /^[a-zA-Z\s]+$/; // Regex to match only letters
    if (!lettersRegex.test(empName)) {
      setErrorName(true);
      alert("Employee name must contain only letters");
      return;
    }
    setErrorName(false);
    if (!empAdd) {
      setErrorAdd(true);
      alert("Please fill in employee address");
      return;
    }
    setErrorAdd(false);
    if (!empType) {
      setErrorType(true);
      alert("Please select employee type");
      return;
    }
    setErrorType(false);
    // if (!empSalary) {
    //   setErrorSalary(true);
    //   alert("Please fill in basic salary");
    //   return;
    // }
    // if (isNaN(empSalary)) {
    //   setErrorSalary(true);
    //   alert("Salary must be numeric");
    //   return;
    // }
    // setErrorSalary(false);
    if (!empDepartment) {
      alert("Please select department");
      return;
    }
    setErrorDepartment(false);
    if (!empNumber) {
      setErrorNumber(true);
      alert("Please fill in employee phone number");
      return;
    }
    // Validation for phone number
    const phoneRegex = /^(?:\+94|0)([1-9][0-9]{8})$/; // Regex to match a 10-digit phone number
    if (!phoneRegex.test(empNumber)) {
      setErrorNumber(true);
      alert("Please enter a valid phone number");
      return;
    }
    setErrorNumber(false);

    axios.post("http://localhost:5000/employeeManager/registerEmployee", { empName, empAdd, empDepartment, empNumber, empType, empEmail })
      .then(result => {
        console.log(result)
        window.location.reload()
        // navigate('/employeeManager')
      })
      .catch(err => console.log(err))
  }

  
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      
        <Card className="mx-auto w-full ">
          <CardBody className="flex flex-col gap-4">
            <form onSubmit={Submit}>
              <Typography variant="h4" color="blue-gray">
                Register new employee
              </Typography>
              <div className=" flex flex-row justify-between ">
                <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                    Employee Name :
                  </Typography>
                  <Input label="Employee Name" size="lg" onChange={(e) => setEmpName(e.target.value)} error={errorName ? "true" : null} />
                </div>
                <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                    Employee Email :
                  </Typography>
                  <Input label="Employee Email" size="lg" onChange={(e) => setEmpEmail(e.target.value)} error={errorEmail ? "true" : null} />
                  
                </div>
              </div>
              <div className=" flex flex-row justify-between ">
                <div className=" flex flex-col justify-between">
                  <Typography className="mb-2" variant="h6">
                    Address :
                  </Typography>
                  <Input label="Address" size="lg" onChange={(e) => setEmpAdd(e.target.value)} error={errorAdd ? "true" : null} />
                </div>
                <div className=" flex flex-col justify-between">
                  <Typography className="mb-2" variant="h6">
                    Type:
                  </Typography>
                  {/* <Input label="Type" size="lg" onChange={(e) => setEmpType(e.target.value)} error={errorType ? "true" : null} /> */}
                  <Select label="Select Type" size="lg"  onChange={(e) => setEmpType(e)} error={errorType ? "true" : null}>
                    <Option value="Part-Time">Part-Time</Option>
                    <Option value="Full-Time">Full-Time</Option>
                  </Select>
                </div>
              </div>
              <div className=" flex flex-row justify-between ">
                <div className=" flex flex-col justify-between">
                  <Typography className="mb-2" variant="h6">
                    Contact number :
                  </Typography>
                  <Input label="Contact Number" size="lg" onChange={(e) => setEmpNumber(e.target.value)} error={errorNumber ? "true" : null} />
                </div>
                <div className=" flex flex-col justify-between">
                  <Typography className="mb-2" variant="h6">
                    Select Deoartment :
                  </Typography>
                  <Select label='Select Name' onChange={(e) => setEmpDepartment(e)}>
                      {departments.map((department) => {
                      return (
                        <Option   key={department.id} value={department.id}>{department.departmentName}  </Option>
                          );},
                          )}
                        </Select>
                        {/* <Input label="Department" size="lg" onChange={(e) => setEmpDepartment(e.target.value)} /> */}
                </div>
              </div>
              <div className=" flex flex-row justify-between ">
                <div className=" flex flex-col justify-between">
                  {/* <Typography className="mb-2" variant="h6">
                    Contact number :
                  </Typography>
                  <Input label="Contact Number" size="lg" onChange={(e) => setEmpNumber(e.target.value)} error={errorNumber ? "true" : null} /> */}
                </div>
                <div className=" flex flex-col justify-between">
                  <Typography className="mb-2" variant="h6">
                  </Typography>
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
export default RegisterEmployee