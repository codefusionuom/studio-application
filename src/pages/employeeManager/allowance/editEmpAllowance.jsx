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
import axiosInstance from "../../../config/axios.config";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ToastError, ToastSuccess } from "../../customerManager/ToastAlert";



function EditEmpAllowance({idx, setRefresh, setOpen}) {

  const [empName, setEmpName] = useState()
  const [empId, setEmpId] = useState(idx)
  const [empAdd, setEmpAdd] = useState()
  const [empType, setEmpType] = useState()
  const [empSalary, setEmpSalary] = useState()
  const [empDepartment, setEmpDepartment] = useState()
  const [empNumber, setEmpNumber] = useState()
  const navigate = useNavigate()
  const [errorAdd, setErrorAdd] = useState()
  // const [errorId, setErrorId] = useState()
  const [errorName, setErrorName] = useState()
  const [allowanceDeductionName, setAllowanceDeductionName] = useState()
  const [allowanceorDeduction,setAllowanceorDeduction] = useState("Select Allowance/Deduction")
  const [allowances, setAllowance] = useState([])
  const [users, setUser] = useState([])
  const [amount, setAmount] = useState()
  const [id, setId] = useState()
  const [search, setSearch] = useState()
  const [active, setActive] = useState()
  const [ToastError, setToastError] = useState()
  const [type, setType] = useState("Type")
  const [resultVisible, setResultVisible] = useState(false)
  const [searchvalue, setSearchValue] = useState()
  const [errorAllowance, setErrorAllowance] = useState()
  const [recId, setRecId] = useState()


  useEffect(() => {
    axios.get(`http://localhost:5000/employeeManager/getEmpAllowanceByid/?id=${empId}`)
      .then(result => {
        console.log(result)
        setEmpName(result.data.employee.empName)
        setAllowanceorDeduction(result.data.paymentAllowanceDeduction.allowanceDeduction)
        setType(result.data.paymentAllowanceDeduction.allowanceDeduction)
        setAllowanceDeductionName(result.data.paymentAllowanceDeduction.allowanceDeductionName)
        setId(result.data.allowanceid)
        setAmount(result.data.Amount)
        setRecId(result.data.id)
      })
      .catch(err => {console.log(err);ToastError(err.message)})
      console.log("helllllo");
  }, [])


  //Get Allowance use effect
  useEffect(() => {
    if (type !== "") {
    handleType();
    console.log(type);
    console.log("search when type change");
    }
}, [type]);

// useEffect(() => {
//   if (search !== "") {
//   handleSearch();
//   console.log(search);
//   console.log("search when name change");
//   }
// }, [search]);



  const handleType = async () => {
    // console.log("searching begin");
    try {
    const { data } = await axiosInstance.get(`/employeeManager/getAllowanceByType/?type=${type}`)
    if (!data) {
        ToastError("no " + {type} + "s exist")
    }
    console.log(data);
    setAllowance(data);
    // setResults(data.count)
    } catch (error) {
    console.log(error);
    ToastError(error.message)
    }
};



  // Search Employee
//   const handleSearch = async () => {
//     setResultVisible(true)
//     console.log("searching begin");
//     try {
    // const { data } = await axiosInstance.get(`/employeeManager/getEmployeeSearch/?empName=${search}`)
//     if (!data) {
//         ToastError("no employee exist")
//     }
//     console.log(data);
//     setUser(data);
//     // setResults(data.count)
//     } catch (error) {
//     console.log(error);
//     ToastError(error)
//     }
// };


  const Submit = (e) => {
    e.preventDefault()

    if (!id) {
      setErrorAllowance(true);
      alert("Please fill in" + {type} + "name");
      return;
    }
    setErrorAllowance(false);
    if (!empName) {
      setErrorName(true);
      alert("Please employee name");
      return;
    }
    setErrorAllowance(false);

    axios.put(`http://localhost:5000/employeeManager/updateEmpAllowance/?empId=${empId}&id=${id}&amount=${amount}`)
      .then(result => {
        console.log(result)
        // window.location.reload()
        ToastSuccess("Updated successfully")
        setRefresh((prev)=>!prev)
        setOpen((prev)=>!prev)
      })
      .catch(err => {console.log(err);ToastError(err.message)})
  }



  const Delete = (e) => {
    e.preventDefault()

    

    axios.delete(`http://localhost:5000/employeeManager/deleteEmpAllowance/?id=${id}`)
      .then(result => {
        console.log(result)
        // window.location.reload()
        ToastSuccess("Updated successfully")
        setRefresh((prev)=>!prev)
        setOpen((prev)=>!prev)
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
                Add Allowance/Deduction 
              </Typography>
              <div className=" flex flex-row justify-between ">
                <div className="flex flex-col justify-between">
                  <Typography className="mb-2" variant="h6">
                   Select Employee
                  </Typography>
                      <Input
                        error={errorName ? "true" : null}
                        disabled
                        value={empName}
                      />
                </div>
                <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                   Select Type
                  </Typography>
                  <Select label="Select Type" value={allowanceorDeduction}  onChange={(e) => { setType(e) }} >
                    <Option value="Allowance">Allowance</Option>
                    <Option value="Deduction">Deduction</Option>
                  </Select>
                </div>
              </div>
              <div className=" flex flex-row justify-between ">
                <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                   Select Allowance/Deduction
                  </Typography>
                  <Select label={allowanceDeductionName} value={allowanceDeductionName} onChange={item => { setId(item) }} error={errorAllowance ? "true" : null} >
                        {allowances.map((allowance) => {
                            return (
                                     <Option key={allowance.id} value={allowance.id}>{allowance.allowanceDeductionName}</Option>
                                 );
                            },
                        )}
                    </Select>
                  
                </div>
                <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                    Enter Amount
                  </Typography>
                  <Input value={amount} size="lg" onChange={(e) => setAmount(e.target.value)} error={errorAdd ? "true" : null} />
                </div>
              </div>
            </form>
          </CardBody>
          <CardFooter className="pt-0">
            <div className=" flex flex-row justify-between">
              <Button className=" bg-red-800" onClick={Delete}>
                Delete
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
export default EditEmpAllowance