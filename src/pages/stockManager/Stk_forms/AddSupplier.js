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
import SmallCard from "../../../components/cards/card";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddSupplier({ title, addSupplierToList,open,handleOpen,handleClose,setFormData,formData,mode  }) {
  const [errors, setErrors] = useState({});
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  //validating form
  const validateForm = () => {
    let isValid = true;
    let newErrors = {};



    if (!formData.supplierName.trim()) {
      newErrors.supplierName = "Supplier Name is required";
      isValid = false;
    }


    if (!formData.contactNo.trim()) {
      newErrors.contactNo = "Contact number is required";
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
      if(mode){
        //edit
        console.log("Edit mode")
        try {
          await axios.put(
            `http://localhost:5000/stockManager/supplier/${formData.id}`,
            formData
          );
          addSupplierToList(formData);
          handleClose();
          setFormData({
            supplierName: "",
            contactNo: "",
            email: "",
            address: "",
          });
          setErrors({});
          toast.success("Supplier Edited successfully", {
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
          console.log("Error editing supplier", error);
          handleClose();
          toast.error("Supplier edit unsuccessful", {
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
      }else{
        //add
        console.log("Add mode")
        try {
          await axios.post(
            "http://localhost:5000/stockManager/supplier",
            formData
          );
          addSupplierToList(formData);
          handleClose();
          setFormData({
            supplierName: "",
            contactNo: "",
            email: "",
            address: "",
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

    }
  };

  const handleClear = () => {
    setFormData({
      
      supplierName: "",
      contactNo: "",
      email: "",
      address: "",
    });
    setErrors({});
  };

  return (
    <>


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
                    {errors.supplierName}
                  </Typography>
                )}
              </div>
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
                         </div> 

            <div className=" flex flex-row justify-evenly">

              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Email:
                </Typography>

                <Input
                  label="Email"
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
            <div className=" flex flex-row justify-around gap-4">
            <Button className="bg-btn-warning w-full" onClick={handleClear}>
                Clear
              </Button>
              <Button className=" bg-btn-success w-full" onClick={handleSubmit}>
              {mode ? "Edit" : "Create"}
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
export default AddSupplier;
