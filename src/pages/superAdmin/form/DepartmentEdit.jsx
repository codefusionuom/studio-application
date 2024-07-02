import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Tooltip,
  IconButton,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import EditButton from "../../../components/cards/buttons/EditButton";
import axiosInstance from "../../../config/axios.config";
import { ToastError, ToastSuccess } from "../../customerManager/ToastAlert";

function AddDepartmentForm({id,handleOpen,setOpen,open}) {

  //const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [employeeList, setEmployeeList] = useState();
  const [search, setSearch] = useState( "");
  const [formErrors, setFormError] = useState({});
  const [formData, setFormData] = useState({
    departmentName: "",
    departmentHeadId:"",
    departmentHeadName: "",
    description: "",
  });
const {departmentName,
  departmentHeadId,
  departmentHeadName,
  description}=formData


  function handleSubmit(event) {
    event.preventDefault();
    let error = validate(formData);
    setFormError(error);
    console.log(validate(formData).iserror, "is error");
    if (!error.iserror) {
      axiosInstance
        .put("/superAdmin/department/" + id, formData)
        .then((res) => {
          // alert("data added successfully");
          ToastSuccess("successfully created depatment")
          setOpen(false)
          // window.location.replace("/superAdmin/Department");
        })
        .catch((err) => {
          console.log(err);
          ToastError(err|| "error on edit depatment")
          console.log("data enter error");
        });
    }
  }

  const validate = (values) => {
    const errors = {};
    errors.iserror = false;
    console.log(values);
   
    if (!values.departmentName) {
      errors.departmentName = "department Name is required!";
      errors.iserror = true;
    }


    return errors;
  };

  // const handleOpen = () => setOpen(!open);

  const err = "text-red-500 w-60";

  const handleSearch = async () => {
    console.log("searching begin");
    try {
      const { data } = await axiosInstance.get(
        `/employeeManager/getEmployeesandSearch/?empName=${search}`
      );
      if (!data) {
        // ToastError("no employee exist")
      }
      console.log(data.rows);
      setEmployeeList(data.rows);
      // setResults(data.count)
    } catch (error) {
      console.log(error);
      // ToastError(error)
    }
  };

  useEffect(() => {
    handleSearch();
  }, [search]);

  useEffect(() => { 
    setIsLoading(true); // Set loading state to true initially
    axios
      .get("http://localhost:5000/superAdmin/departmentId/" + id)
      .then((res) => {
        console.log(res.data);
        setFormData(res.data);
        setSearch(res.data.departmentHeadName)
        setIsLoading(false); // Set loading state to false after fetching data
      });
  }, []);

  return (
    <>
     

      
        <Card className="mx-auto w-full ">
        <CardBody className="flex flex-col gap-4 pb-20">
            <Typography variant="h4" color="blue-gray" className="text-center">
              Create Department
            </Typography>
            <div className=" grid grid-cols-2 pt-20">
              <div className="flex flex-col justify-between pr-20">
                <Typography className="mb-2" variant="h6">
                  Department Name :
                </Typography>
                <Input
                  label="department name"
                  size="lg"
                  placeholder="photogrphy"
                  value={departmentName}
                  onChange={(e) =>
                    setFormData({ ...formData, departmentName: e.target.value })
                  }
                />
                <p className={err}>{formErrors.departmentName}</p>
              </div>
              <div className=" flex flex-col relative justify-between pr-20">
                <Typography className="mb-2" variant="h6">
                  Department Head :
                </Typography>
                <Input
                  label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pr-20"
                  containerProps={{
                    className: "min-w-0",
                  }}
                />
                <Card className="p-2 rounded-md absolute top-20 w-full max-h-36 overflow-scroll">
                  {employeeList &&
                    employeeList.map((employee) => {
                      return (
                        <div
                          className=""
                          onClick={() => {
                            setSearch(employee.empName);
                            setFormData({ ...formData, departmentHeadId: employee.id, departmentHeadName: employee.empName})
                          }}
                        >
                          <div className="text-">{employee.empName}</div>
                        </div>
                      );
                    })}
                </Card>

                <p className={err}>{formErrors.departmentHead}</p>
              </div>
              <div className="flex flex-col justify-between pr-20">
                <Typography className="mb-2" variant="h6">
                  Description:
                </Typography>
                <Textarea
                  label="Description about payment  "
                  className="h-[150px] "
                  id="description"
                  type="text"
                  name="description"
                   value={description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  maxlength="100"
                />
              </div>
              
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <div className=" flex flex-row justify-around">
              <Button className=" bg-yellow-800" onClick={handleOpen}>
                cancel
              </Button>

              <Button className=" bg-green-600" onClick={handleSubmit}>
                Update
              </Button>
            </div>
          </CardFooter>
        </Card>
  
    </>
  );
}
export default AddDepartmentForm;
