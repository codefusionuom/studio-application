import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import Card2 from "../../../components/cards/Card2";

function AddDepartmentForm({ title }) {

  const [open, setOpen] = React.useState(false);
  const [formErrors, setFormError] = useState({});
  const [formData, setFormData] = useState({
    departmentId: "",
    departmentName: "",
    departmentHead: "",
    departmentEmp: "",
    departmentItem: "",
    departmentTask: "",
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
          alert("data added successfully");
          window.location.replace("/superAdmin/Department");
        })
        .catch((err) => {
          console.log(err);
          console.log("data enter error");
        });
    }
  }

  const validate = (values) => {
    const errors = {};
    errors.iserror = false;
    console.log(values);
    if (!values.departmentId) {
      errors.departmentId = "department Id is required!";
      errors.iserror = true;
    } else if (!/^d-\d{3}$/.test(values.departmentId)) {
      errors.departmentId =
        "department ID should start with 'd-' followed by exactly three digits.";
      errors.iserror = true;
    }
    if (!values.departmentName) {
      errors.departmentName = "department Name is required!";
      errors.iserror = true;
    }
    if (!values.departmentHead) {
      errors.departmentHead = "department Head is required!";
      errors.iserror = true;
    }

    return errors;
  };

  const handleClear = () => {
    console.log("handling clear");
    setFormData({
      departmentId: "",
      departmentName: "",
      departmentHead: "",
      departmentEmp: "",
      departmentItem: "",
      departmentTask: "",
      description: "",
    });
  };

  const handleOpen = () => setOpen(!open);

  const err = "text-red-500 w-60";

  return (
    <>
      <Card2
        title1="CREATE DEPARTMENT"
        title2={"Structure Teams & Assets"}
        onClick={handleOpen}
      />

      <Dialog
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none w-fit "
      >
        <Card className="mx-auto w-full ">
          <CardBody className="flex flex-col gap-4 pb-20">
            <Typography variant="h4" color="blue-gray" className="text-center">
              Make New Department
            </Typography>

            <div className=" flex flex-row justify-between pt-20">
              <div className="flex flex-col justify-between pl-20">
                <Typography className="mb-2" variant="h6">
                  Departmrnt ID :
                </Typography>
                <Input
                  label="department ID"
                  size="lg"
                  placeholder="d-987"
                  onChange={(e) =>
                    setFormData({ ...formData, departmentId: e.target.value })
                  }
                />
                <p className={err}>{formErrors.departmentId}</p>
              </div>

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
            </div>

            {/* <div className=" flex flex-row justify-between "> */}
            <div className=" flex flex-row justify-between">
              <div className=" flex flex-col pl-20">
                <Typography className="mb-2" variant="h6">
                  Description:
                </Typography>

                <Input
                  label="Description"
                  size="lg"
                  placeholder="Enter description here"
                  type="textarea"
                  className="h-full md:h-60"
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className=" flex flex-col justify-between pr-20">
                <Typography className="mb-2" variant="h6">
                  Department Head :
                </Typography>

                <Input
                  label=" department head"
                  size="lg"
                  placeholder="k.Amal Perera"
                  onChange={(e) =>
                    setFormData({ ...formData, departmentHead: e.target.value })
                  }
                />
                <p className={err}>{formErrors.departmentHead}</p>

                <Typography className="mb-2" variant="h6">
                  Add Employees :
                </Typography>

                <Input
                  label=" employee"
                  size="lg"
                  placeholder="A.D. Silva"
                  onChange={(e) =>
                    setFormData({ ...formData, departmentEmp: e.target.value })
                  }
                />

                <Typography className="mb-2" variant="h6">
                  Add Items :
                </Typography>

                <Input
                  label=" item"
                  size="lg"
                  placeholder="camera"
                  onChange={(e) =>
                    setFormData({ ...formData, departmentItem: e.target.value })
                  }
                />

                <Typography className="mb-2" variant="h6">
                  Add Tasks :
                </Typography>

                <Input
                  label="tasks"
                  size="lg"
                  placeholder="wedding photography"
                  onChange={(e) =>
                    setFormData({ ...formData, departmentTask: e.target.value })
                  }
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
      </Dialog>
    </>
  );
}
export default AddDepartmentForm;
