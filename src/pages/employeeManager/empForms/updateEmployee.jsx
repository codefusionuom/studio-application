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

function UpdateEmployee({ idx }) {

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


  useEffect(() => {
    axios.get('http://localhost:5000/employeeManager/getEmployeeByid/' + id)
      .then(result => {
        console.log(result)
        setEmpName(result.data.empName)
        setEmpAdd(result.data.empAdd)
        setEmpDepartment(result.data.empDepartment)
        setEmpType(result.data.empType)
        setEmpNumber(result.data.empNumber)
        setEmpEmail(result.data.empEmail)
        // setEmpEmail(result.date.empEmail)
      })
      .catch(err => console.log(err))
      console.log("helllllo");
  }, [])


  const Update = (e) => {
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

    axios.put("http://localhost:5000/employeeManager/updateEmployee/" + id, { empAdd, empDepartment, empName, empNumber, empType, empEmail })
      .then(result => {
        console.log(result)
        window.location.reload()
        // navigate('/')
      })
      .catch(err => console.log(err))
  }

  const handleDelete = (e) => {
    axios.delete('http://localhost:5000/employeeManager/deleteEmployee/' + id)
      .then(res => {
        console.log(res)
        window.location.reload()
      })
      .catch(err => console.log(err))

  }
  useEffect(() => {
    axios.get('http://localhost:5000/superAdmin/getDepartment')
      .then(result => setDepartment(result.data.rows))
      .catch(err => console.log(err))
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
                
              </div>
              <div className="flex flex-col justify-between">
              <Typography className="mb-2" variant="h6">
                  Employee Email :
                </Typography>
                <Input label="" size="lg" value={empEmail} onChange={(e) => setEmpEmail(e.target.value)} error={errorEmail ? "true" : null} />
              </div>
            </div>
            <div className=" flex flex-row justify-between ">
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Address :
                </Typography>
                <Input label="" size="lg" value={empAdd} onChange={(e) => setEmpAdd(e.target.value)} error={errorAdd ? "true" : null} />
              </div>
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Type:
                </Typography>
                <Select label="Select Type" size="lg"  onChange={(e) => setEmpType(e)} error={errorType ? "true" : null}>
                    <Option value="Part-Time">Part-Time</Option>
                    <Option value="Full-Time">Full-Time</Option>
                  </Select>
              </div>
            </div>
            <div className=" flex flex-row justify-between ">
              <div className=" flex flex-col justify-between">
                {/* <Typography className="mb-2" variant="h6">
                  Basic Salary:
                </Typography>
                <Input label="" size="lg" value={empSalary} onChange={(e) => setEmpSalary(e.target.value)} error={errorSalary ? "true" : null} /> */}
                <Typography className="mb-2" variant="h6">
                  Contact number :
                </Typography>
                <Input label="" size="lg" value={empNumber} onChange={(e) => setEmpNumber(e.target.value)} error={errorNumber ? "true" : null} />
              </div>
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Add Department :
                </Typography>
                <Select label={empDepartment} onChange={(e) => setEmpDepartment(e)}>
                      {departments && departments.map((department) => {
                      return (
                        <Option   key={department.id} value={department.id}>{department.departmentName}</Option>
                          );},
                          )}
                        </Select>
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