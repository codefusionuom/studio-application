import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EditRecordButton from "../../../components/buttons/EditRecordButton";
import { Select, Option } from "@material-tailwind/react";
import { ToastError, ToastSuccess } from "../../customerManager/ToastAlert";

function UpdateEmployee({ idx,setOpen,setRefresh }) {

  const [empName, setEmpName] = useState()
  // const [empId, setEmpId] = useState(idx)
  const [id, setid] = useState(idx)
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
  const [empEmail, setEmpEmail] = useState()
  const [departments, setDepartment] = useState([])
  const [empDepartmentName, setEmpDepartmentName] = useState()


  useEffect(() => {
    axios.get('http://localhost:5000/employeeManager/getEmployeeByid/' + id)
      .then(result => {
        console.log(result)
        setEmpName(result.data.empName)
        setEmpAdd(result.data.empAdd)
        setEmpDepartmentName(result.data.department.departmentName)
        setEmpDepartment(result.data.empDepartment)
        setEmpType(result.data.empType)
        setEmpNumber(result.data.empNumber)
        setEmpEmail(result.data.empEmail)
        // setEmpEmail(result.date.empEmail)
      })
      .catch(err => {console.log(err); ToastError(err.message); })
  }, [])


  const Update = (e) => {
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

    axios.put("http://localhost:5000/employeeManager/updateEmployee/" + id, { empAdd, empDepartment, empName, empNumber, empType, empEmail })
      .then(result => {
        console.log(result)
        ToastSuccess("Employee updated successfully")
        setRefresh((prev)=>!prev)
        setOpen((prev)=>!prev)
        // window.location.reload()
        // navigate('/')
      })
      .catch(err => {console.log(err); ToastError(err.message)})
  }

  const handleDelete = (e) => {
    axios.delete('http://localhost:5000/employeeManager/deleteEmployee/' + id)
      .then(res => {
        console.log(res)
        window.location.reload()
      })
      .catch(err => {console.log(err); ToastError(err.message)})

  }
  useEffect(() => {
    axios.get('http://localhost:5000/superAdmin/department')
      .then(result => setDepartment(result.data.rows))
      .catch(err => {console.log(err);ToastError(err.message)})
    console.log(departments)
  }, [])
  

  

  return (
    <>


      
        <Card className="mx-auto w-full ">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Update employee
            </Typography>
            <div className=" flex flex-row justify-between ">
              <div className="flex flex-col justify-between">
              <Typography className="mb-2" variant="h6">
                  Employee Name :
                </Typography>
                <Input label="" size="lg" value={empName} onChange={(e) => setEmpName(e.target.value)} error={errorName ? "true" : null} />
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
                <Input label="" size="lg" value={empEmail} onChange={(e) => setEmpEmail(e.target.value)} error={errorEmail ? "true" : null} />
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
                <Input label="" size="lg" value={empAdd} onChange={(e) => setEmpAdd(e.target.value)} error={errorAdd ? "true" : null} />
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
                <Input label="" size="lg" value={empNumber} onChange={(e) => setEmpNumber(e.target.value)} error={errorNumber ? "true" : null} />
                { errorNumber ? 
                    <Typography variant="small" color="red" className="  flex items-center gap-1 font-normal">Incorrect Number</Typography> 
                  : 
                    null
                   }
              </div>
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Add Department :
                </Typography>
                <Select label={empDepartmentName} onChange={(e) => setEmpDepartment(e)} error={errorDepartment ? "true" : null}>
                      {departments && departments.map((department) => {
                      return (
                        <Option   key={department.id} value={department.id}>{department.departmentName}</Option>
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
                
              </div>
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                </Typography>
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <div className=" flex flex-row justify-between">
              {/* <Button className=" bg-yellow-800" onClick={handleOpen}>
                Clear
              </Button> */}
              <Button className=" bg-red-500" onClick={handleDelete}>
                Delete
              </Button>
              <Button className=" bg-green-600" onClick={Update}>
                Update
              </Button>
            </div>
          </CardFooter>
        </Card>
    </>
  );
}
export default UpdateEmployee