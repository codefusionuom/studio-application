import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Option,
} from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Select, SelectOption } from "@material-tailwind/react";
import axiosInstance from "../../../config/axios.config";
import { ToastSuccess } from "../../customerManager/ToastAlert";


function RegisterEmployee({setReload,setOpen}) {

  const [empName, setEmpName] = useState()
  const [empEmail, setEmpEmail] = useState()
  const [empAdd, setEmpAdd] = useState()
  const [empType, setEmpType] = useState()
  const [empDepartment, setEmpDepartment] = useState()
  const [empNumber, setEmpNumber] = useState()
  const navigate = useNavigate()
  const [errorAdd, setErrorAdd] = useState()
  const [errorDepartment, setErrorDepartment] = useState()
  const [errorEmail, setErrorEmail] = useState()
  const [errorName, setErrorName] = useState()
  const [errorNumber, setErrorNumber] = useState()
  const [errorType, setErrorType] = useState()
  const [departments, setDepartments] = useState([])
  const [ToastError, setToastError] = useState()
  const [errorPassword, setErrorPassword] = useState()
  const [empPassword, setEmpPassword] = useState()

  // const [depId, setDepID] = useState()

  useEffect(() => {
    axios.get('http://localhost:5000/superAdmin/department')
      .then(result => setDepartments(result.data.rows))
      .catch(err => {console.log(err);ToastError(err.message)})
    console.log(departments)
  }, [])

  const handleClear = () => {
    setEmpName("");
    setEmpAdd("");
    setEmpDepartment("");
    setEmpEmail("");
    setEmpNumber("");
    setEmpPassword("");
    setEmpType("");
  }


  const Submit = (e) => {
    e.preventDefault()

    // Basic validation
    
    if (!empName) {
      setErrorName(true);
      return;
    }
    // Validation for string fields
    const lettersRegex = /^[a-zA-Z\s]+$/; // Regex to match only letters
    if (!lettersRegex.test(empName)) {
      setErrorName(true);
      return;
    }
    setErrorName(false);
    const Emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!empEmail) {
      setErrorEmail(true);
      return;
    }
    if (!Emailregex.test(empEmail)) {
      setErrorEmail(true);
      return;
    }
    setErrorEmail(false);
    if (!empAdd) {
      setErrorAdd(true);
      return;
    }
    setErrorAdd(false);
    if (!empType) {
      setErrorType(true);
      return;
    }
    setErrorType(false);
    if (!empNumber) {
      setErrorNumber(true);
      return;
    }
    // Validation for phone number
    const phoneRegex = /^(?:\+94|0)([1-9][0-9]{8})$/; // Regex to match a 10-digit phone number
    if (!phoneRegex.test(empNumber)) {
      setErrorNumber(true);
      return;
    }
    setErrorNumber(false);
    if (!empDepartment) {
      setErrorDepartment(true)
      return;
    }
    setErrorDepartment(false);
    if (!empPassword) {
      setErrorPassword(true)
      return;
    }
    setErrorPassword(false)

    axios.post("http://localhost:5000/employeeManager/registerEmployee", { empName, empAdd, empDepartment, empNumber, empType, empEmail, empPassword })
      .then(result => {
        console.log(result)
        setReload((prev)=>!prev)
        setOpen((prev)=>!prev)
        ToastSuccess("Employee created successfully")
        // window.location.reload()
        // navigate('/employeeManager')
      })
      .catch(err => {console.log(err);ToastError(err.message)})

      
  }



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
                  <Input label="Employee Name" size="lg" value={empName} onChange={(e) => setEmpName(e.target.value)} error={errorName ? "true" : null} />
                  { errorName ? 
                    <Typography variant="small" color="red" className="  flex items-center gap-1 font-normal">Incorrect Name</Typography> 
                  : 
                    null
                   }

                  
                </div>
                <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                    Employee Email :
                  </Typography>
                  <Input label="Employee Email" size="lg" value={empEmail} onChange={(e) => setEmpEmail(e.target.value)} error={errorEmail ? "true" : null} />
                  { errorEmail ? 
                    <Typography variant="small" color="red" className="  flex items-center gap-1 font-normal">Incorrect Email</Typography> 
                  : 
                    null
                   }
                  
                </div>
              </div>
              <div className=" flex flex-row justify-between ">
                <div className=" flex flex-col justify-between">
                  <Typography className="mb-2" variant="h6">
                    Address :
                  </Typography>
                  <Input label="Address" size="lg" value={empAdd} onChange={(e) => setEmpAdd(e.target.value)} error={errorAdd ? "true" : null} />
                  { errorAdd ? 
                    <Typography variant="small" color="red" className="  flex items-center gap-1 font-normal">Incorrect Address</Typography> 
                  : 
                    null
                   }
                </div>
                <div className=" flex flex-col justify-between">
                  <Typography className="mb-2" variant="h6">
                    Type:
                  </Typography>
                  {/* <Input label="Type" size="lg" onChange={(e) => setEmpType(e.target.value)} error={errorType ? "true" : null} /> */}
                  <Select label="Select Type" size="lg" value={empType}  onChange={(e) => setEmpType(e)} error={errorType ? "true" : null}>
                    <Option value="Part-Time">Part-Time</Option>
                    <Option value="Full-Time">Full-Time</Option>
                  </Select>
                  { errorType ? 
                    <Typography variant="small" color="red" className="  flex items-center gap-1 font-normal">Incorrect Type</Typography> 
                  : 
                    null
                   }
                </div>
              </div>
              <div className=" flex flex-row justify-between ">
                <div className=" flex flex-col justify-between">
                  <Typography className="mb-2" variant="h6">
                    Contact number :
                  </Typography>
                  <Input label="Contact Number" type="number" value={empNumber} size="lg" onChange={(e) => setEmpNumber(e.target.value)} error={errorNumber ? "true" : null} />
                  { errorNumber ? 
                    <Typography variant="small" color="red" className="  flex items-center gap-1 font-normal">Incorrect Number</Typography> 
                  : 
                    null
                   }
                </div>
                <div className=" flex flex-col justify-between">
                  <Typography className="mb-2" variant="h6">
                    Select Department :
                  </Typography>
                  <Select label='Select Name' onChange={(e) => setEmpDepartment(e)} error={errorDepartment ? "true" : null}>
                      {departments.map((department) => {
                      return (
                        <Option   key={department.id} value={department.id}>{department.departmentName}  </Option>
                          );},
                          )}
                        </Select>
                        { errorDepartment ? 
                    <Typography variant="small" color="red" className="  flex items-center gap-1 font-normal">Select Department</Typography> 
                  : 
                    null
                   }
                </div>
              </div>
              <div className=" flex flex-row justify-between ">
                <div className=" flex flex-col justify-between">
                  <Typography className="mb-2" variant="h6">
                    Password :
                  </Typography>
                  <Input label="Password" size="lg" value={empPassword} onChange={(e) => setEmpPassword(e.target.value)} error={errorPassword ? "true" : null} />
                  { errorPassword ? 
                    <Typography variant="small" color="red" className="  flex items-center gap-1 font-normal">Password cannot be empty</Typography> 
                  : 
                    null
                   }
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
              <Button className=" bg-yellow-800" onClick={handleClear}>
                Clear
              </Button>
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