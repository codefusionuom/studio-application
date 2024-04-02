import React, {useState, useEffect} from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import SmallCard from "../../../components/cards/card";
import DashCard from "../dashButtonCard";
import { PencilIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

 
function UpdateEmployee({idx}) {


    // const empId=idx


    // const {id} = useParams()
    const [empName,setEmpName] = useState()
    const [empId=idx,setEmpId] = useState()
    const [id=idx,setid] = useState()
    const [empAdd,setEmpAdd] = useState()
    const [empType,setEmpType] = useState()
    const [empSalary,setEmpSalary] = useState()
    const [empDepartment,setEmpDepartment] = useState()
    const [empNumber,setEmpNumber] = useState()
    const navigate = useNavigate()

    


    useEffect(()=>{
      axios.get('http://localhost:5000/employeeManager/getEmployeeByid/'+id)
      .then(result => {console.log(result)
          setEmpName(result.data.empName)
          setEmpAdd(result.data.empAdd)
          setEmpDepartment(result.data.empDepartment)
          setEmpType(result.data.empType)
          setEmpNumber(result.data.empNumber)
          setEmpSalary(result.data.empSalary)
      })
      .catch(err => console.log(err))
  },[])



    const Update = (e) => {
    e.preventDefault()
    axios.put("http://localhost:5000/employeeManager/updateEmployee/"+id, {empAdd,empDepartment,empName,empNumber,empSalary,empType})
    .then(result => {
        console.log(result)
        window.location.reload()
        // navigate('/')
    })
    .catch(err => console.log(err))
    }


    const handleDelete = (e) => {
      axios.delete('http://localhost:5000/employeeManager/deleteEmployee/'+id)
      .then(res => {console.log(res)
          window.location.reload()
        })
      .catch(err => console.log(err))

    }




    
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur); 
 
  return (
    <>
      {/* <SmallCard className=" w-full cursor-pointer" title={title} onClick={handleOpen} /> */}



      {/* <DashCard className="cursor-pointer" title2={"Register Employee"} title3={"Add Personal Here"} onClick={handleOpen}/> */}

      {/* <PencilIcon className="h-4 w-4" onClick={handleOpen}/> */}

      <IconButton variant="text" onClick={handleOpen}>
            <PencilIcon className="h-4 w-4" />
       </IconButton>






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
            {/* <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter  Stock item details Here
            </Typography> */}

            
            <div className=" flex flex-row justify-between ">
              

              <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Employee ID :
                </Typography>
                <Input label="" size="lg" value={empId} />
              </div>
              <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Employee Name :
                </Typography>
                <Input label="" size="lg" value={empName} onChange={(e) => setEmpName(e.target.value)}/>
              </div>
              

            </div>


            <div className=" flex flex-row justify-between ">
            <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                Address :
                </Typography>

                <Input label="" size="lg" value={empAdd} onChange={(e) => setEmpAdd(e.target.value)}/>
              </div>
            
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Type:
                </Typography>

                <Input label="  " size="lg" value={empType} onChange={(e) => setEmpType(e.target.value)}/>
              </div>
             


             
            </div>

            <div className=" flex flex-row justify-between ">
            
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Basic Salary:
                </Typography>

                <Input label="" size="lg" value={empSalary} onChange={(e) => setEmpSalary(e.target.value)}/>
              </div>
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Add Deoartment :
                </Typography>

                <Input label=" " size="lg"  value={empDepartment} onChange={(e) => setEmpDepartment(e.target.value)}/>
              </div>


             
            </div>

            <div className=" flex flex-row justify-between ">
            
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Contact number :
                </Typography>

                <Input label="" size="lg"  value={empNumber} onChange={(e) => setEmpNumber(e.target.value)}/>
              </div>
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                </Typography>

              </div>


             
            </div>


            {/* <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div> */}
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