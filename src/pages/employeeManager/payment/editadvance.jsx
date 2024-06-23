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

function UpdateAdvance({ idx }) {

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
  const [advanceAmount,setAdvanceAmount] = useState()
  const [advancePaidAmount,setAdvancePaidAmount] = useState()
  const [advanceRemaining,setAdvanceRemaining] = useState()
  const [advancePayment,setAdvancePayment] = useState()
  const [errorAdvancePayment,setErrorAdvancePayment] = useState()
  const [advancePaidStatus, setAdvancePaidStatus] = useState()

  let newpaidstatus;


  useEffect(() => {
    axios.get('http://localhost:5000/employeeManager/getAdvanceByid/' + id)
      .then(result => {
        console.log(result)
        setAdvanceAmount(result.data.advanceAmount)
        setAdvancePaidAmount(result.data.advancePaidAmount)
        setAdvancePaidStatus(result.data.advancePaidStatus)
      })
      .catch(err => console.log(err))
  }, [])

  


  const Update = (e) => {
    e.preventDefault()
    // Basic validation

    if (!advancePayment) {
      setErrorAdvancePayment(true);
      alert("Please fill in payment amount");
      return;
    }
    if (isNaN(advancePayment)) {
      setErrorAdvancePayment(true);
      alert("Payment amount must be numeric");
      return;
    }
    if(advancePayment>(advanceAmount-advancePaidAmount)) {
        setErrorAdvancePayment(true);
        alert("Payment amount cannot exceed remaining amount");
        return;
    }
    setErrorAdvancePayment(false);

    // setAdvancePaidAmount(advancePaidAmount+advancePayment);

    const newAdvancePaidAmount = (parseInt(advancePaidAmount)) + (parseInt(advancePayment));
    console.log(newAdvancePaidAmount);
    console.log(advanceAmount);

    // if (newAdvancePaidAmount===advanceAmount) {
    //     setAdvancePaidStatus(true);
    //     console.log("runn");
    //     console.log(advancePaidStatus);
    //     setAdvancePaidStatus(true);
    //     console.log("runn");
    //     console.log(advancePaidStatus);
    // }
    // if (newAdvancePaidAmount===advanceAmount) {
    //     const newpaidstatus = true;
    //     console.log(newpaidstatus);
    // }

    if (newAdvancePaidAmount===advanceAmount) {
        const newpaidstatus = true;
        console.log(newpaidstatus);
        axios.put("http://localhost:5000/employeeManager/updateAdvance/" + id, { newAdvancePaidAmount, newpaidstatus })
      .then(result => {
        console.log(result)
        window.location.reload()
        // navigate('/')
      })
      .catch(err => console.log(err))
    } else {
        axios.put("http://localhost:5000/employeeManager/updateAdvance/" + id, { newAdvancePaidAmount, newpaidstatus })
      .then(result => {
        console.log(result)
        window.location.reload()
        // navigate('/')
      })
      .catch(err => console.log(err))
    }


    // axios.put("http://localhost:5000/employeeManager/updateAdvance/" + id, { newAdvancePaidAmount, newpaidstatus })
    //   .then(result => {
    //     console.log(result)
    //     // window.location.reload()
    //     // navigate('/')
    //   })
    //   .catch(err => console.log(err))
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
              Make Payment
            </Typography>
            <div className=" flex flex-row justify-between ">
              <div className="flex flex-col justify-between">
              <Typography className="mb-2" variant="h6">
                  Employee Name :
                </Typography>
                <Input label={empId} disabled size="lg" />
              </div>
              <div className="flex flex-col justify-between">
              <Typography className="mb-2" variant="h6">
                  Advance Amount:
                </Typography>
                <Input label={advanceAmount} disabled size="lg"/>
              </div>
            </div>
            <div className=" flex flex-row justify-between ">
              <div className=" flex flex-col justify-between">
              <Typography className="mb-2" variant="h6">
                  Amount Remaining:
                </Typography>
                <Input label={advanceAmount-advancePaidAmount} disabled size="lg"/>
              </div>
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Amount Paid:
                </Typography>
                <Input label={advancePaidAmount} disabled size="lg"/>
              </div>
            </div>
            <div className=" flex flex-row justify-between ">
              <div className=" flex flex-col justify-between">
              <Typography className="mb-2" variant="h6">
                  Payment Amount :
                </Typography>
                <Input label="Enter Amoubt" size="lg"  onChange={(e) => setAdvancePayment(e.target.value) } error={errorAdvancePayment ? "true" : null} />
              </div>
              <div className=" flex flex-col justify-between">
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <div className=" flex flex-row justify-between">
              <Button className=" bg-yellow-800" onClick={handleOpen}>
                Clear
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
export default UpdateAdvance