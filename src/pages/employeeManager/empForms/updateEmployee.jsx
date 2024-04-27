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

function UpdateEmployee({ idx }) {

  const [empName, setEmpName] = useState()
  const [empId = idx, setEmpId] = useState()
  const [id = idx, setid] = useState()
  const [empAdd, setEmpAdd] = useState()
  const [empType, setEmpType] = useState()
  const [empSalary, setEmpSalary] = useState()
  const [empDepartment, setEmpDepartment] = useState()
  const [empNumber, setEmpNumber] = useState()
  const navigate = useNavigate()
  const [errorAdd, setErrorAdd] = useState()
  const [errorDepartment, setErrorDepartment] = useState()
  const [errorId, setErrorId] = useState()
  const [errorName, setErrorName] = useState()
  const [errorNumber, setErrorNumber] = useState()
  const [errorSalary, setErrorSalary] = useState()
  const [errorType, setErrorType] = useState()


  useEffect(() => {
    axios.get('http://localhost:5000/employeeManager/getEmployeeByid/' + id)
      .then(result => {
        console.log(result)
        setEmpName(result.data.empName)
        setEmpAdd(result.data.empAdd)
        setEmpDepartment(result.data.empDepartment)
        setEmpType(result.data.empType)
        setEmpNumber(result.data.empNumber)
        setEmpSalary(result.data.empSalary)
      })
      .catch(err => console.log(err))
  }, [])


  const Update = (e) => {
    e.preventDefault()
    // Basic validation
    if (!empId) {
      setErrorId(true);
      alert("Please fill in employee ID");
      return;
    }
    if (isNaN(empId)) {
      setErrorId(true);
      alert("Employee ID must be numeric");
      return;
    }
    setErrorId(false);
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
    if (!empSalary) {
      setErrorSalary(true);
      alert("Please fill in basic salary");
      return;
    }
    if (isNaN(empSalary)) {
      setErrorSalary(true);
      alert("Salary must be numeric");
      return;
    }
    setErrorSalary(false);
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

    axios.put("http://localhost:5000/employeeManager/updateEmployee/" + id, { empAdd, empDepartment, empName, empNumber, empSalary, empType })
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>


      <EditRecordButton onClick={handleOpen}></EditRecordButton>
      <Dialog
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none w-fit"
      >
        <Card className="mx-auto w-full ">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Update employee
            </Typography>
            <div className=" flex flex-row justify-between ">
              <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Employee ID :
                </Typography>
                <Input label="" size="lg" value={empId} disabled />
              </div>
              <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Employee Name :
                </Typography>
                <Input label="" size="lg" value={empName} onChange={(e) => setEmpName(e.target.value)} error={errorName ? "true" : null} />
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
                <Input label="  " size="lg" value={empType} onChange={(e) => setEmpType(e.target.value)} error={errorType ? "true" : null} />
              </div>
            </div>
            <div className=" flex flex-row justify-between ">
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Basic Salary:
                </Typography>
                <Input label="" size="lg" value={empSalary} onChange={(e) => setEmpSalary(e.target.value)} error={errorSalary ? "true" : null} />
              </div>
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Add Department :
                </Typography>
                <Input label=" " size="lg" value={empDepartment} onChange={(e) => setEmpDepartment(e.target.value)} error={errorDepartment ? "true" : null} />
              </div>
            </div>
            <div className=" flex flex-row justify-between ">
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Contact number :
                </Typography>
                <Input label="" size="lg" value={empNumber} onChange={(e) => setEmpNumber(e.target.value)} error={errorNumber ? "true" : null} />
              </div>
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                </Typography>
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <div className=" flex flex-row justify-between">
              <Button className=" bg-yellow-800" onClick={handleOpen}>
                Clear
              </Button>
              <Button className=" bg-red-500" onClick={handleDelete}>
                Delete
              </Button>
              <Button className=" bg-green-600" onClick={Update}>
                Update
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
export default UpdateEmployee