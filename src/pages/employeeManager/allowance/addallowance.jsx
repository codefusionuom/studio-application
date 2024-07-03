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


function AddAllowance() {

  const [empName, setEmpName] = useState()
  const [empId, setEmpId] = useState()
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
  const [date, setDate] = useState()




  useEffect(() => {
    // Get the current date
    const TodayDate = new Date();

    // Convert the date to a string
    const currentDateString = TodayDate.toISOString();

    // Set the date string to state
    setDate(currentDateString);
  }, []); // Empty dependency array means this effect runs once on mount


  //Get Allowance use effect
  useEffect(() => {
    if (type !== "") {
    handleType();
    console.log(type);
    console.log("search when type change");
    }
}, [type]);

useEffect(() => {
  if (search !== "") {
  handleSearch();
  console.log(search);
  console.log("search when name change");
  }
}, [search]);



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
    ToastError(error)
    }
};



  // Search Employee
  const handleSearch = async () => {
    setResultVisible(true)
    console.log("searching begin");
    try {
    const { data } = await axiosInstance.get(`/employeeManager/getEmployeeSearch/?empName=${search}`)
    if (!data) {
        ToastError("no employee exist")
    }
    console.log(data);
    setUser(data);
    // setResults(data.count)
    } catch (error) {
    console.log(error);
    ToastError(error)
    }
};

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

    axios.post("http://localhost:5000/employeeManager/createEmpAllowance", { id, empId, amount, date })
      .then(result => {
        console.log(result)
        window.location.reload()
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
                Add Allowance/Deduction 
              </Typography>
              <div className=" flex flex-row justify-between ">
                <div className="flex flex-col justify-between">
                  <Typography className="mb-2" variant="h6">
                   Select Employee
                  </Typography>
                  <div className="relative ">
                    <div className="relative flex w-full max-w-[24rem] ">
                      <Input
                        error={errorName ? "true" : null}
                        label="Enter Name"
                        value={empName}
                        onChange={(e) => {setSearch(e.target.value)}}
                        className="pr-20"
                        containerProps={{
                          className: "min-w-0",
                        }}
                      />
                      <Button
                        size="sm"
                        color={search ? "gray" : "blue-gray"}
                        disabled={!search}
                        className="!absolute right-0 bottom-0 rounded "
                        onClick={handleSearch}
                      >
                        <MagnifyingGlassIcon className="h-6 w-5" />
                      </Button>
                    </div>

                    {resultVisible ? (
                    <div>
        
      
                    {users && users.map((user)=>{
                      return (
                        <Card className="p-2 rounded-md absolute top-10 w-full max-h-36 overflow-scroll z-[999]">
                        <div className="" onClick={()=>{setEmpId(user.id); setEmpName(user.empName); setSearchValue(""); setResultVisible(false)}}>
                          <div className="text-"> 
                          {user.empName}
                          </div>
                        </div>
                        </Card>
                      )
                    })}
                    </div>
                    ) : null}
         
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                   Select Type
                  </Typography>
                  <Select label="Select Type"  onChange={(e) => { setType(e) }} >
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
                  <Select label={'Select ' + type} onChange={item => { setId(item) }} error={errorAllowance ? "true" : null} disabled={type !== "Allowance" && type !== "Deduction" ? "true" : null}>
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
                  <Input label="Enter Amount" size="lg" onChange={(e) => setAmount(e.target.value)} error={errorAdd ? "true" : null} />
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
export default AddAllowance