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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashCard2 from "../dashButtonCard copy";
import { Select } from "@material-tailwind/react";
import SelectOption from "@material-tailwind/react/components/Select/SelectOption";


function ViewEmployeePaymentDetails() {

  const [users, setUser] = useState([])
  const [bank, setBank] = useState()
  const [id, setid] = useState()
  const [epfNumber, setEpfNumber] = useState()
  const [accountNumber, setAccountNumber] = useState()
  const [overtimeRate, setOvertimeRate] = useState()
  const [doubleovertimeRate, setDoubleovertimeRate] = useState()
  const navigate = useNavigate()
  const [empType, setEmpType] = useState()
  const [empDepartment, setEmpDepartment] = useState()
  const [errorBank,setErrorBank] = useState()
  const [errorid,setErrorId] = useState()
  const [errorepfNumber,setErrorEpfNumber] = useState()
  const [erroraccoutNumber,setErrorAccountNumber] = useState()
  const [errorovertimeRate,setErrorOvertimeRate] = useState()
  const [errordoubleovertimeRate,setErrorDoubleovertimeRate] = useState()


  const Submit = (e) => {
    e.preventDefault()


    // validation
    if (!id) {
      setErrorId(true);
      alert("Please Select employee name");
      return;
    }
    setErrorId(false);
    if (!bank) {
      setErrorBank(true);
      alert("Please fill in bank");
      return;
    }
    setErrorBank(false);
    if (!epfNumber) {
      setErrorEpfNumber(true);
      alert("Please fill in EPF Number");
      return;
    }
    if (isNaN(epfNumber)) {
      setErrorEpfNumber(true);
      alert("EPF number must be numeric");
      return;
    }
    setErrorEpfNumber(false);
    if (!accountNumber) {
      setErrorAccountNumber(true);
      alert("Please fill in account number");
      return;
    }
    if (isNaN(accountNumber)) {
      setErrorAccountNumber(true);
      alert("Account number must be numeric");
      return;
    }
    setErrorAccountNumber(false);
    if (!overtimeRate) {
      setErrorOvertimeRate(true);
      alert("Please fill in overtime rate");
      return;
    }
    if (isNaN(overtimeRate)) {
      setErrorOvertimeRate(true);
      alert("overtime rate must be numeric");
      return;
    }
    setErrorOvertimeRate(false);
    if (!doubleovertimeRate) {
      setErrorDoubleovertimeRate(true);
      alert("Please fill in doubleovertime rate");
      return;
    }
    if (isNaN(doubleovertimeRate)) {
      setErrorDoubleovertimeRate(true);
      alert("doubleovertime rate must be numeric");
      return;
    }
    setErrorDoubleovertimeRate(false);

    ////// Update database
    axios.put("http://localhost:5000/employeeManager/updateEmployeePaymentDatails/" + id, { bank, epfNumber, accountNumber, overtimeRate, doubleovertimeRate })
      .then(result => {
        console.log(result)
        window.location.reload()
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    axios.get('http://localhost:5000/employeeManager/getEmployees')
      .then(result => setUser(result.data))
      .catch(err => console.log(err))
    console.log(users)
  }, [])

  const OpenSelectHandle = async (e) => {
    axios.get('http://localhost:5000/employeeManager/getEmployeeByid/' + e)
      .then(result => {
        console.log(result)
        setid(e)
        setEmpDepartment(result.data.empDepartment)
        setEmpType(result.data.empType)
      })
      .catch(err => console.log(err))

    axios.get('http://localhost:5000/employeeManager/getEmployeePaymentDetailsByid/' + e)
      .then(result => {
        console.log(result)
        setBank(result.data.bank)
        setEpfNumber(result.data.epfNumber)
        setAccountNumber(result.data.accountNumber)
        setOvertimeRate(result.data.overtimeRate)
        setDoubleovertimeRate(result.data.doubleovertimeRate)
      })
      .catch(err => console.log(err))
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
<>
      <DashCard2 title2={"View Employee Payment Details"} title3={""} onClick={handleOpen} />
      <Dialog
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none w-fit"
      >
        <Card className="mx-auto w-full ">
          <CardBody className="flex flex-col gap-4">
            <form onSubmit={Submit}>
              <Typography variant="h4" color="blue-gray">
                View Employee Payment Details
              </Typography>
              <div className='PersonalInfo pt-10'>
                <div className=''>
                  <div className='bg-gray-400 ml-20 mr-20 flex justify-evenly rounded'>
                    <div className='w-80 pt-5 pb-5'>
                      <p className='text-xl pl-5'>Personal Information</p>
                    </div>
                    <div className='w-80 pt-5 pb-5'></div>
                  </div>
                </div>
                <div className='flex justify-evenly pt-5'>
                  <div className='pt-5'>
                    <p>Employee Name :</p>
                    <div className="w-80 pt-1 pb-10">
                      <Select label='Select Name' onChange={OpenSelectHandle} error={errorid ? "true": null}>
                        {users.map((user) => {
                          return (
                            <SelectOption key={user.id} value={user.id}>{user.empName} </SelectOption>
                          );
                        },
                        )}
                      </Select>
                    </div>
                  </div>
                  <div>
                    <p className='pt-5'>Department :</p>
                    <div className="w-80 pt-1 pb-10">
                      <Input label="Department" value={empDepartment} disabled />
                    </div>
                  </div>
                </div>
                <div className='flex justify-evenly'>
                  <div>
                    <p>Employee Type :</p>
                    <div className="w-80  pt-1 pb-10">
                      <Input label="Employee Type" value={empType} disabled />
                    </div>
                  </div>
                  <div>
                    <p>Bank :</p>
                    <div className="w-80 pt-1 pb-10">
                      <Input label="Bank" value={bank} onChange={(e) => setBank(e.target.value)} error={errorBank ? "true": null}/>
                    </div>
                  </div>
                </div>
                <div className='flex justify-evenly'>
                  <div>
                    <p>EPF Number :</p>
                    <div className="w-80 pt-1 pb-10">
                      <Input label="EPF Number" value={epfNumber} onChange={(e) => setEpfNumber(e.target.value)} error={errorepfNumber ? "true": null}/>
                    </div>
                  </div>
                  <div>
                    <p>Account Number :</p>
                    <div className="w-80 pt-1 pb-10">
                      <Input label="Account Number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} error={erroraccoutNumber ? "true": null}/>
                    </div>
                  </div>
                </div>
                <div className='flex justify-evenly'>
                  <div>
                    <p>Overtime Rate :</p>
                    <div className="w-80 pt-1 pb-10">
                      <Input label="Overtime Rate" value={overtimeRate} onChange={(e) => setOvertimeRate(e.target.value)} error={errorovertimeRate ? "true": null}/>
                    </div>
                  </div>
                  <div>
                    <p>Double Overtime Rate :</p>
                    <div className="w-80 pt-1 pb-10">
                      <Input label="Double Overtime Rate" value={doubleovertimeRate} onChange={(e) => setDoubleovertimeRate(e.target.value)} error={errordoubleovertimeRate ? "true": null}/>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </CardBody>
          <CardFooter className="pt-0">
            <div className=" flex flex-row justify-between">
              <Button className=" bg-yellow-800" onClick={handleOpen}>
                Cancel
              </Button>
              <Button className=" bg-green-600" onClick={Submit}>
                Update
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
export default ViewEmployeePaymentDetails