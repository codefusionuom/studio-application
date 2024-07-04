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
import SelectOption from "@material-tailwind/react/components/Select/SelectOption";
import axiosInstance from "../../../config/axios.config";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Textarea } from "@material-tailwind/react";




function CreateAdvance() {

  const [empName, setEmpName] = useState()
  const [users, setUser] = useState([])
  const [empId, setEmpId] = useState()
  const [empAdd, setEmpAdd] = useState()
  const [empType, setEmpType] = useState()
  const [empSalary, setEmpSalary] = useState()
  const [empDepartment, setEmpDepartment] = useState()
  const [empNumber, setEmpNumber] = useState()
  const navigate = useNavigate()
  const [errorAdd, setErrorAdd] = useState()
  const [errorDepartment, setErrorDepartment] = useState()
  // const [errorId, setErrorId] = useState()
  const [errorAmount, setErrorAmount] = useState()
  const [errorName, setErrorName] = useState()
  const [advanceAmount, setAdvanceAmount] = useState()
  const [errorType, setErrorType] = useState()
  const [allowanceorDeduction,setAllowanceorDeduction] = useState("Select Allowance/Deduction")
  const [search, setSearch] = useState("")
  const [resultVisible, setResultVisible] = useState()
  const [ToastError, setToastError] = useState()
  const [searchvalue, setSearchValue] = useState()
  const [description,setDescription] = useState()
  

//   useEffect(()=>{
//     axios.get('http://localhost:5000/employeeManager/getEmployees')
//     .then(result => setUser(result.data.rows))
//     .catch(err => console.log(err))
//     console.log(users)
// },[])


  useEffect(() => {
    if (search !== "") {
    handleSearch();
    console.log(search);
    console.log("search when name change");
    }
  }, [search]);

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

    if (!empId) {
      setErrorName(true);
      alert("Please Select Employee");
      return;
    }
    setErrorName(false);
    if (!advanceAmount) {
        setErrorAmount(true);
        alert("Please fill amount");
        return;
      }
    setErrorName(false);
    if (isNaN(advanceAmount)) {
        setErrorAmount(true);
        alert("Allowance must be numeric");
        return;
     }

    axios.post("http://localhost:5000/employeeManager/createAdvance", { empId, advanceAmount, description })
      .then(result => {
        console.log(result)
        window.location.reload()
      })
      .catch(err => console.log(err))
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      
        <Card className="mx-auto w-full ">
          <CardBody className="flex flex-col gap-4">
            <form onSubmit={Submit}>
              <Typography variant="h4" color="blue-gray">
                Create Advance
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
                </div>
              </div>
              <div className=" flex flex-row justify-between ">
                <div className=" flex flex-col justify-between">
                  <Typography className="mb-2" variant="h6">
                    Advance Amount:
                  </Typography>
                  <Input label="Advance Amount" size="lg" onChange={(e) => setAdvanceAmount(e.target.value)} error={errorAdd ? "true" : null} />
                </div>
                <div className=" flex flex-col justify-between">
                  <div className="w-96">
                  <Textarea label="Description" onChange={(e) => setDescription(e.target.value)}/>
                </div>
                </div>
              </div>
            </form>
          </CardBody>
          <CardFooter className="pt-0">
            <div className=" flex flex-row justify-between">
              <Button className=" bg-yellow-800" onClick={handleOpen}>
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
export default CreateAdvance