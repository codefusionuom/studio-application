import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import axios from "axios";
import EditButton from "../../../components/cards/buttons/EditButton";
import axiosInstance from "../../../config/axios.config";

function AddAdminEdit(props) {
  const { passId } = props; 
  const [data, setData] = useState({
    employeeId: "",
    employeeName: "",
    privileges: [],
    telephone: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);
const [formErrors, setFormError] = useState({});
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .get("superAdmin/admin/" + passId)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEditClick = () => {
    setOpenEdit(!openEdit);
  };

  function handleSubmit(event) {
    event.preventDefault();
    let error = validate(data);
    setFormError(error);
    console.log(validate(data).iserror, "is error");
    if (!error.iserror) {
      axios
        .put("superAdmin/admin/" + passId, data)
        .then((res) => {
          alert("data update successfully");
          window.location.replace("/superAdmin/admin");
        })
        .catch((err) => console.log(err));
    }
  }

  const validate = (values) => {
    const errors = {};
    errors.iserror = false;
    console.log(values);
    if (!values.employeeId) {
      errors.employeeId = "employeeId is required!";
      errors.iserror = true;
    } else if (!/^e-\d{3}$/.test(values.employeeId)) {
      errors.employeeId =
        "Employee ID should start with 'e-' followed by exactly three digits.";
      errors.iserror = true;
    }
    if (!values.employeeName) {
      errors.employeeName = "employee Name is required!";
      errors.iserror = true;
    }
    if (!values.privileges[0]) {
      errors.privileges = "privileges is required!";
      errors.iserror = true;
    }
    if (!values.telephone) {
      errors.telephone = "telephone is required!";
      errors.iserror = true;
    } else if (!/^\d{10}$/.test(values.telephone)) {
      errors.telephone = "Telephone should be a 10-digit number.";
      errors.iserror = true;
    }
    if (!values.address) {
      errors.address = "address is required!";
      errors.iserror = true;
    }

    return errors;
  };

  const err = "text-red-500 w-60";
  return (
    <>
      <EditButton onClick={handleEditClick} />

      <Dialog
        open={openEdit}
        handler={handleEditClick}
        className="bg-transparent shadow-none w-fit "
      >
        <Card className="mx-auto w-full ">
          <CardBody className="flex flex-col gap-4 pb-20">
            <Typography variant="h4" color="blue-gray" className="text-center">
              Edit Admin Account
            </Typography>

            <div className=" flex flex-row justify-between pt-20">
              <div className="flex flex-col justify-between pl-20">
                <Typography className="mb-2" variant="h6">
                  Employee ID :
                </Typography>
                <Input
                  label="employee id"
                  size="lg"
                  value={data.employeeId}
                  onChange={(e) =>
                    setData({ ...data, employeeId: e.target.value })
                  }
                />
                <p className={err}>{formErrors.employeeId}</p>
              </div>

              <div className="flex flex-col justify-between pr-20">
                <Typography className="mb-2" variant="h6">
                  Employee Name :
                </Typography>
                <Input
                  label="employee name"
                  size="lg"
                  value={data.employeeName}
                  onChange={(e) =>
                    setData({ ...data, employeeName: e.target.value })
                  }
                />
                <p className={err}>{formErrors.employeeName}</p>
              </div>
            </div>

            <div className=" flex flex-row justify-between">
              <div className=" flex flex-col pl-20">
                <Typography className="mb-2" variant="h6">
                  Privilage :
                </Typography>

                <div className="flex flex-col space-y-2">
                  <Checkbox
                    label="Employee Manager"
                    name="privileges"
                    value="employee_manager"
                    checked={data.privileges.includes("employee_manager")}
                    onChange={(e) =>
                      setData({ ...data, privileges: e.target.value })
                    }
                  />
                  <Checkbox
                    label="Customer Manager"
                    name="privileges"
                    value="customer_manager"
                    checked={data.privileges.includes("customer_manager")}
                    onChange={(e) =>
                      setData({ ...data, privileges: e.target.value })
                    }
                  />
                  <Checkbox
                    label="Event Manager"
                    name="privileges"
                    value="event_manager"
                    checked={data.privileges.includes("event_manager")}
                    onChange={(e) =>
                      setData({ ...data, privileges: e.target.value })
                    }
                  />
                  <Checkbox
                    label="Stock Manager"
                    name="privileges"
                    value="stock_manager"
                    checked={data.privileges.includes("stock_manager")}
                    onChange={(e) =>
                      setData({ ...data, privileges: e.target.value })
                    }
                  />
                  <p className={err}>{formErrors.privileges}</p>
                </div>
              </div>

              <div className=" flex flex-col justify-between pr-20">
                <Typography className="mb-2" variant="h6">
                  Telephone :
                </Typography>

                <Input
                  label="phone number"
                  size="lg"
                  value={data.telephone}
                  onChange={(e) =>
                    setData({ ...data, telephone: e.target.value })
                  }
                />
                <p className={err}>{formErrors.telephone}</p>

                <Typography className="mb-2" variant="h6">
                  Address :
                </Typography>

                <Input
                  label="address"
                  size="lg"
                  value={data.address}
                  onChange={(e) =>
                    setData({ ...data, address: e.target.value })
                  }
                />
                <p className={err}>{formErrors.address}</p>
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <div className="flex flex-row justify-around">
              <Button className=" bg-yellow-800" onClick={handleEditClick}>
                Cancel
              </Button>
              <Button
                className=" bg-green-600"
                type="submit"
                onClick={handleSubmit}
              >
                Update
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
export default AddAdminEdit;
