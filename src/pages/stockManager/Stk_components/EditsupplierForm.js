import React, { useState,useEffect } from "react";
import axios from "axios";
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditRecordButton from "../../../components/buttons/EditRecordButton";

function EditSupplier({ title, id }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    supplierId: "",
    supplierName: "",
    itemId: "",
    contactNo: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOpen = () => setOpen((cur) => !cur);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  useEffect(() => {
    fetchSuppliers();
  }, []);
  console.log("Form data" ,formData)

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/stockManager/supplierk/"+id
      );
      
      const { success, message, suppliers } = response.data;
      console.log(response.data);
      setFormData(response.data.supplier)
    //   console.log("Form data" ,formData)
      if (success) {
        setSuppliers(suppliers);
      } else {
        setError(message);
      }
    } catch (error) {
      setError("Failed to fetch suppliers");
    } finally {
      setLoading(false);
    }
  };
  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!formData.supplierId.trim()) {
      newErrors.supplierId = "supplier ID is required";
      isValid = false;
    } else {
      const supplierIdPattern = /^S-\d{4}$/;
      if (!supplierIdPattern.test(formData.supplierId)) {
        newErrors.supplierId = "Supplier ID should be in format S-0001";
        isValid = false;
      }
    }

    if (!formData.supplierName.trim()) {
      newErrors.supplierName = "Supplier Name is required";
      isValid = false;
    }

    if (!formData.itemId.trim()) {
      newErrors.itemId = "Item ID is required";
      isValid = false;
    } else {
      const itemIdPattern = /^I-\d{4}$/;
      if (!itemIdPattern.test(formData.itemId)) {
        newErrors.itemId = "Item ID should be in the format I-0001";
        isValid = false;
      }
    }

    if (!formData.contactNo.trim()) {
      newErrors.contactNo = "Item ID is required";
      isValid = false;
    } else {
      const contactNoPattern = /^0\d{9}$/;
      if (!contactNoPattern.test(formData.contactNo)) {
        newErrors.contactNo = "Contact No should be in the format 077-000 0000";
        isValid = false;
      }
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }


    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await axios.put(
          "http://localhost:5000/stockManager/supplier/"+id,
          formData
        )
       
            alert("data update successfully");
            window.location.replace("/stockManager/supplier/");
       
        handleClose();
        setFormData({
          supplierId: "",
          supplierName: "",
          itemId: "",
          contactNo: "",
          status: "",
        });
        setErrors({});
        toast.success("Supplier created successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      } catch (error) {
        console.log("Error creating supplier", error);
        handleClose();
        toast.error("Supplier creation unsuccessful", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
    }
  };

  const handleClear = () => {
    setFormData({
      supplierId: "",
      supplierName: "",
      itemId: "",
      contactNo: "",
      status: "",
    });
    setErrors({});
  };

  return (
    <>
       <EditRecordButton onClick={handleOpen}/>

      <Dialog
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none w-fit"
      >
        <Card className="mx-auto w-full ">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Add Supplier
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter supplier Details Here
            </Typography>

            <div className=" flex flex-row justify-evenly ">
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Name:
                </Typography>

                <Input
                  label="Name"
                  size="lg"
                  name="supplierName"
                  value={formData.supplierName}
                  onChange={handleChange}
                  placeholder="A.K. Amal Silva"
                  error={errors.supplierName}
                />
                {errors.supplierName && (
                  <Typography className="text-red-500 text-sm">
                    {errors.itemName}
                  </Typography>
                )}
              </div>
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Supplier ID:
                </Typography>

                <Input
                  label="supplier ID"
                  size="lg"
                  name="supplierId"
                  value={formData.supplierId}
                  onChange={handleChange}
                  placeholder="S-0001"
                  error={errors.supplierId}
                />
                {errors.supplierId && (
                  <Typography className="text-red-500 text-sm">
                    {errors.supplierId}
                  </Typography>
                )}
              </div>

              <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Item ID:
                </Typography>

                <Input
                  label="Item ID"
                  size="lg"
                  name="itemId"
                  value={formData.itemId}
                  onChange={handleChange}
                  placeholder="I-0001"
                  error={errors.itemId}
                />
                {errors.itemID && (
                  <Typography className="text-red-500 text-sm">
                    {errors.itemId}
                  </Typography>
                )}
              </div>
            </div>

            <div className=" flex flex-row justify-evenly">
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Address:
                </Typography>

                <Input
                  label="Address"
                  size="lg"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder=""
                  error={errors.address}
                />
              </div>
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Email:
                </Typography>

                <Input
                  label="Address"
                  size="lg"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="abcd@gmail.com"
                  error={errors.email}
                />
              </div>

              <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Telephone:
                </Typography>
                <Input
                  label="Telephone"
                  size="lg"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                  placeholder=""
                  error={errors.contactNo}
                />
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <div className=" flex flex-row justify-between">
            <Button className="bg-btn-warning" onClick={handleClear}>
                Clear
              </Button>
              <Button className=" bg-btn-success" onClick={handleSubmit}>
                Create
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Dialog>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
export default EditSupplier;
