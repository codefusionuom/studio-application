import React, { useState } from "react";
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
import Card2 from "../../../components/cards/Card2";
import axios from "axios";

function AddAdminForm({ title }) {
  const [open, setOpen] = React.useState(false);
  const [formErrors, setFormError] = useState({});
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    privileges: [],
    telephone: "",
    address: "",
  });

  const handleOpen = () => setOpen(!open);

  function handleSubmit(event) {
    event.preventDefault();
    let error = validate(formData);
    setFormError(error);
    console.log(validate(formData).iserror, "is error");
    if (!error.iserror) {
      axios
        .post("http://localhost:5000/superAdmin/admin", formData)
        .then((res) => {
          alert("data added successfully");
          window.location.replace("/superAdmin/admin");
        })
        .catch((err) => {
          console.log(err.response.data.message);
          console.log("data enter error");
        });
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

  const handleClear = () => {
    console.log("handling clear");
    setFormData({
      employeeId: "",
      employeeName: "",
      privileges: [],
      telephone: "",
      address: "",
    });
  };

  const err = "text-red-500 w-60";

  return (
    <>
      <Card2
        title1="CREATE ADMIN"
        title2={"Make new admin account"}
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
              Make New Admin Account
            </Typography>

            <div className=" flex flex-row justify-between pt-20">
              <div className="flex flex-col justify-between pl-20 ">
                <Typography className="mb-2" variant="h6">
                  Employee ID :
                </Typography>
                <Input
                  label="employee id"
                  size="lg"
                  placeholder="e-000"
                  onChange={(e) =>
                    setFormData({ ...formData, employeeId: e.target.value })
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
                  placeholder="Nipuna Deshan"
                  onChange={(e) =>
                    setFormData({ ...formData, employeeName: e.target.value })
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
                    checked={formData.privileges.includes("employee_manager")}
                    onChange={(e) =>
                      setFormData({ ...formData, privileges: e.target.value })
                    }
                  />
                  <Checkbox
                    label="Customer Manager"
                    name="privileges"
                    value="customer_manager"
                    checked={formData.privileges.includes("customer_manager")}
                    onChange={(e) =>
                      setFormData({ ...formData, privileges: e.target.value })
                    }
                  />
                  <Checkbox
                    label="Event Manager"
                    name="privileges"
                    value="event_manager"
                    checked={formData.privileges.includes("event_manager")}
                    onChange={(e) =>
                      setFormData({ ...formData, privileges: e.target.value })
                    }
                  />
                  <Checkbox
                    label="Stock Manager"
                    name="privileges"
                    value="stock_manager"
                    checked={formData.privileges.includes("stock_manager")}
                    onChange={(e) =>
                      setFormData({ ...formData, privileges: e.target.value })
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
                  placeholder="0776552898"
                  onChange={(e) =>
                    setFormData({ ...formData, telephone: e.target.value })
                  }
                />
                <p className={err}>{formErrors.telephone}</p>

                <Typography className="mb-2" variant="h6">
                  Address :
                </Typography>

                <Input
                  label="address"
                  size="lg"
                  placeholder="123,Galle Road,Colombo"
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
                <p className={err}>{formErrors.address}</p>
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <div className="flex flex-row justify-around">
              <Button className=" bg-yellow-800" onClick={handleClear}>
                Clear
              </Button>
              <Button
                className=" bg-green-600"
                type="submit"
                onClick={handleSubmit}
              >
                Create
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
export default AddAdminForm;
