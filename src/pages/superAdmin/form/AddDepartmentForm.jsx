import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import Card2 from "../../../components/cards/Card2";
import axiosInstance from "../../../config/axios.config";
import { ToastError, ToastSuccess } from "../../customerManager/ToastAlert";

function AddDepartmentForm({ title ,handleAddOpen,setOpenAdd}) {
 
  const [employeeList, setEmployeeList] = useState();
  const [formErrors, setFormError] = useState({});
  const [search, setSearch] = React.useState("");
  const [formData, setFormData] = useState({
    departmentName: "",
    departmentHeadId: "",
    departmentHeadName: "",
    description: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    let error = validate(formData);
    setFormError(error);
    console.log(validate(formData).iserror, "is error");
    if (!error.iserror) {
      axios
        .post("http://localhost:5000/superAdmin/department", formData)
        .then((res) => {
          console.log(res);
          ToastSuccess("successfully created depatment")
          setOpenAdd(false)
        })
        .catch((err) => {
          console.log(err);
          ToastError(err|| "error on created depatment")
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

  const handleClear = () => {
    console.log("handling clear");
    setFormData({
      departmentName: "",
      departmentHead: "",
      description: "",
    });
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

  return (
    <>
      

      {/* <Dialog
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none w-fit "
      > */}
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
                        className={employeeList.length === 1 ? "bg-blue-50" : ""}
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
                  // value={description}
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
              <Button className=" bg-yellow-800" onClick={handleClear}>
                Clear
              </Button>

              <Button className=" bg-green-600" onClick={handleSubmit}>
                Create
              </Button>
            </div>
          </CardFooter>
        </Card>
      {/* </Dialog> */}
    </>
  );
}
export default AddDepartmentForm;
