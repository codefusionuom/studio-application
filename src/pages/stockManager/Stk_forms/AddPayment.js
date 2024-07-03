import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";
import SmallCard from "../../../components/cards/card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddPaymentForm({ title, addPaymentToList }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    supplierName: "",
    itemName: "",
    date: "",
    telephone: "",
    quantity: "",
    price: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");


  const handleOpen = () => {
    setOpen((cur) => !cur);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if(!formData.supplierName.trim()){
      newErrors.supplierName = "Supplier Name is required";
      isValid = false;
    }
    if(!formData.itemName.trim()){
      newErrors.itemName = "Item Name is required"
    }

    
    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
      isValid = false;
    }
       
    if (!formData.date.trim()) {
      newErrors.date = "Date is required";
      isValid = false;
    }
       
    if (!formData.quantity.trim()) {
      newErrors.quantity = "Quantity is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }


  const handleSubmit = async () => {
    if(validateForm()){ 
    try {
      await axios.post("http://localhost:5000/stockManager/payment", formData);
      setSuccessMessage("Payment created successfully");
      handleClose();
      addPaymentToList(formData);
      setFormData({
        supplierName: "",
        itemName: "",
        date: "",
        telephone: "",
        quantity: "",
        price: "",
        description: "",
      });
      setErrors({});
      toast.success("Payment created successfully", {
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
      console.log("Error creating payment", error);
      handleClose();
      toast.error("Payment creation unsuccessful", {
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
      supplierName: "",
      itemName: "",
      date: "",
      telephone: "",
      quantity: "",
      price: "",
      description: "",
    });
    setErrors({});
  };

  return (
    <>
      <SmallCard
        className=" cursor-pointer"
        title={title}
        onClick={handleOpen}
      />

      <Dialog
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none w-fit"
      >
        <Card className="mx-auto w-full ">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              New Payment
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter Payment Details Here
            </Typography>

            <div className=" flex flex-row justify-evenly ">
              <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Supplier Name:
                </Typography>
                <Input
                  label="Supplier Name"
                  size="lg"
                  name="supplierName"
                  value={formData.supplierName}
                  onChange={handleChange}
                  placeholder="Supplier Name"
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
                  Stock Item:
                </Typography>

                <Input
                  label="Item Name"
                  size="lg"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  placeholder="Item Name"
                  error={errors.itemName}
                />
                {errors.itemName && (
                  <Typography className="text-red-500 text-sm">
                    {errors.itemName}
                  </Typography>
                )}
              </div>

              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Date:
                </Typography>

                <Input
                  label="Date"
                  size="lg"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  error={errors.date}
                />
                {errors.date && (
                  <Typography className="text-red-500 text-sm">
                    {errors.date}
                  </Typography>
                )}
              </div>
            </div>

            <div className=" flex flex-row  justify-evenly ">
              <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Telephone:
                </Typography>
                <Input
                  label="Telephone"
                  size="lg"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  placeholder=""
                  error={errors.telephone}
                />
              </div>

              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Quantity:
                </Typography>

                <Input
                  label="Quantity"
                  size="lg"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Quantity"
                  error={errors.quantity}
                />
                {errors.quantity && (
                  <Typography className="text-red-500 text-sm">
                    {errors.quantity}
                  </Typography>
                )}
              </div>
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Price:
                </Typography>

                <Input
                  label="Price"
                  size="lg"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  error={errors.price}
                />
                {errors.quantity && (
                  <Typography className="text-red-500 text-sm">
                    {errors.quantity}
                  </Typography>
                )}
              </div>
            </div>
            <div className="flex flex-row justify-evenly">
              <div className="flex flex-col w-full">
                <Typography className="mb-2" variant="h6">
                  Description:
                </Typography>
                <Textarea
                  label="Enter Description here"
                  size="lg"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <div className=" flex flex-row justify-between gap-4">
              <Button className="bg-btn-warning w-full" onClick={handleClear}>
                Clear
              </Button>
              <Button className=" bg-btn-success w-full" onClick={handleSubmit}>
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
export default AddPaymentForm;
