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
import { Textarea } from "@material-tailwind/react";
import { ToastError, ToastSuccess } from "../../customerManager/ToastAlert";

function UpdateAdvance({ idx,setRefresh,setOpenEdit }) {

  const [empName, setEmpName] = useState()
  // const [empId = idx, setEmpId] = useState(idx)
  const [id, setid] = useState(idx)
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
  const [advanceAmount,setAdvanceAmount] = useState()
  const [advancePaidAmount,setAdvancePaidAmount] = useState()
  const [advanceRemaining,setAdvanceRemaining] = useState()
  const [advancePayment,setAdvancePayment] = useState()
  const [errorAdvancePayment,setErrorAdvancePayment] = useState()
  const [advancePaidStatus, setAdvancePaidStatus] = useState()
  const [description, setDescription] = useState()


  useEffect(() => {
    axios.get('http://localhost:5000/employeeManager/getAdvanceByid/' + id)
      .then(result => {
        console.log(result)
        setAdvanceAmount(result.data.advanceAmount)
        // setAdvancePaidAmount(result.data.advancePaidAmount)
        setDescription(result.data.description)
        setEmpName(result.data.employee.empName)
      })
      .catch(err => {console.log(err);ToastError(err.message)})
      console.log(id);
  }, [])

  


  const Update = (e) => {
    e.preventDefault()
    // Basic validation

    if (!advanceAmount) {
      setErrorAdvancePayment(true);
      alert("Please fill in amount");
      return;
    }
    if (isNaN(advanceAmount)) {
      setErrorAdvancePayment(true);
      alert("Amount must be numeric");
      return;
    }
   
    setErrorAdvancePayment(false);



    


    axios.put("http://localhost:5000/employeeManager/updateAdvance/" + id, { advanceAmount, description })
      .then(result => {
        console.log(result)
        ToastSuccess("Advance updated successfully")
        setRefresh((prev)=>!prev)
        setOpenEdit((prev)=>!prev)
        // window.location.reload()
        // navigate('/')
      })
      .catch(err => {console.log(err);ToastError(err.message)})
  }


  const [open, setOpen] = React.useState(false);
  const Delete = () => {
    axios.delete(`http://localhost:5000/employeeManager/deleteAdvance/?id=${id}`)
      .then(result => {
        console.log(result)
        ToastSuccess("Advance deleted successfully")
        setRefresh((prev)=>!prev)
        setOpenEdit((prev)=>!prev)
        // window.location.reload()
        // navigate('/')
      })
      .catch(err => {console.log(err);ToastError(err.message)})
  };

  return (
    <>
        <Card className="mx-auto w-full ">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Make Payment
            </Typography>
            <div className=" flex flex-row justify-between ">
              <div className="flex flex-col justify-between">
              <Typography className="mb-2" variant="h6">
                  Employee Name :
                </Typography>
                <Input value={empName} disabled size="lg" />
              </div>
              <div className="flex flex-col justify-between">
              <Typography className="mb-2" variant="h6">
                  Advance Amount:
                </Typography>
                <Input value={advanceAmount} size="lg" onChange={(e) => setAdvanceAmount(e.target.value)}/>
              </div>
            </div>
            <div className=" flex flex-row justify-between ">
            <div className="w-96">
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)}/>
              </div>
            </div>
            <div className=" flex flex-row justify-between ">
              <div className=" flex flex-col justify-between">
              </div>
              <div className=" flex flex-col justify-between">
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <div className=" flex flex-row justify-between">
              <Button className=" bg-red-800" onClick={Delete}>
                Clear
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
export default UpdateAdvance