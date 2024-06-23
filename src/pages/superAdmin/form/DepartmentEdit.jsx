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
} from "@material-tailwind/react";
import EditButton from "../../../components/cards/buttons/EditButton";

function AddDepartmentForm(props) {
  const { id } = props;
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    setIsLoading(true); // Set loading state to true initially
    axios
      .get("http://localhost:5000/superAdmin/departmentId/" + id)
      .then((res) => {
        setFormData(res.data);
        setIsLoading(false); // Set loading state to false after fetching data
      });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    let error = validate(formData);
    setFormError(error);
    console.log(validate(formData).iserror, "is error");
    if (!error.iserror) {
      axios
        .put("http://localhost:5000/superAdmin/department/" + id, formData)
        .then((res) => {
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

  const handleOpen = () => setOpen(!open);

  const err = "text-red-500 w-60";

  return (
    <>
      <EditButton onClick={handleOpen} />

      <Dialog
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none w-fit "
      >
        <Card className="mx-auto w-full ">
          <CardBody className="flex flex-col gap-4 pb-20">
            <Typography variant="h4" color="blue-gray" className="text-center">
              Update Department
            </Typography>

            <div className=" flex flex-row justify-between pt-20">
              <div className="flex flex-col justify-between pl-20">
                <Typography className="mb-2" variant="h6">
                  Departmrnt ID :
                </Typography>
                <Input
                  label="department ID"
                  size="lg"
                  value={formData.departmentId}
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
                  value={formData.departmentName}
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
                  value={formData.description}
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
                  value={formData.departmentHead}
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
                  value={formData.departmentEmp}
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
                  value={formData.departmentItem}
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
                  value={formData.departmentTask}
                  onChange={(e) =>
                    setFormData({ ...formData, departmentTask: e.target.value })
                  }
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
      </Dialog>
    </>
  );
}
export default AddDepartmentForm;
