import React, { useState } from "react";
import axios from 'axios';
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

function AddStockItemForm({ title }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    itemId: "",
    itemName: "",
    categoryId: "",
    cost: "",
    realCost: "",
    minQty: "",
    quantity: "",
    status: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpen = () => {
    setOpen((cur) => !cur);
  }

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!formData.itemId.trim()) {
      newErrors.itemId = "Item ID is required";
      isValid = false;
    } else {
      const itemIdPattern = /^I-\d{4}$/;
      if (!itemIdPattern.test(formData.itemId)) {
        newErrors.itemId = "Item ID should be in format I-0001";
        isValid = false;
      }
    }

    if (!formData.categoryId.trim()) {
      newErrors.categoryId = "Category ID is required";
      isValid = false;
    } else {
      const categoryIdPattern = /^C-\d{4}$/;
      if (!categoryIdPattern.test(formData.categoryId)) {
        newErrors.categoryId = "Category ID should be in the format C-0001";
        isValid = false;
      }
    }

    if (!formData.itemName.trim()) {
      newErrors.itemName = "Item Name is required";
      isValid = false;
    }

    if (!formData.realCost.trim()) {
      newErrors.realCost = "Real cost is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await axios.post("http://localhost:5000/stockManager/stockItem", formData);
        setSuccessMessage("Stock item created successfully");
        handleClose();
        setFormData({
          itemId: "",
          itemName: "",
          categoryId: "",
          cost: "",
          realCost: "",
          minQty: "",
          quantity: "",
          status: "",
          description: "",
        });
        setErrors({});
      } catch (error) {
        console.error("Error creating Stock item:", error);
        setErrorMessage("Failed to create Stock item");
      }
    }
  };
  
  const handleClear = () => {
    setFormData({
      itemId: "",
      itemName: "",
      categoryId: "",
      cost: "",
      realCost: "",
      minQty: "",
      quantity: "",
      status: "",
      description: "",
    });
    setErrors({});
  };

  return (
    <>
      <SmallCard
        className="cursor-pointer"
        title={title}
        onClick={handleOpen}
      />

      <Dialog
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none w-fit"
      >
        <Card className="mx-auto w-full">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Add New Stock Item
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter Stock item details Here
            </Typography>

            <div className="flex flex-row justify-evenly">
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
                {errors.itemId && (
                  <Typography className="text-red-500 text-sm">{errors.itemId}</Typography>
                )}
              </div>
              <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Item Name:
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
                  <Typography className="text-red-500 text-sm">{errors.itemName}</Typography>
                )}
              </div>
              <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Category ID:
                </Typography>
                <Input
                  label="Category ID"
                  size="lg"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  placeholder="C-0001"
                  error={errors.categoryId}
                />
                {errors.categoryId && (
                  <Typography className="text-red-500 text-sm">{errors.categoryId}</Typography>
                )}
              </div>
            </div>

            <div className="flex flex-row justify-evenly">
              <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Real Cost:
                </Typography>
                <Input
                  label="Real Cost"
                  size="lg"
                  name="realCost"
                  value={formData.realCost}
                  onChange={handleChange}
                  placeholder="100,000.00"
                  error={errors.realCost}
                />
                {errors.realCost && (
                  <Typography className="text-red-500 text-sm">{errors.realCost}</Typography>
                )}
              </div>
              <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Cost:
                </Typography>
                <Input
                  label="Cost"
                  size="lg"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                  placeholder="100,000.00"
                  error={errors.cost}
                />
                {errors.realCost && (
                  <Typography className="text-red-500 text-sm">{errors.realCost}</Typography>
                )}
              </div>
              <div className="flex flex-col justify-between">
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
                  <Typography className="text-red-500 text-sm">{errors.quantity}</Typography>
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
            <div className="flex flex-row justify-between">
              <Button className="bg-yellow-800" onClick={handleClear}>
                Clear
              </Button>
              <Button className="bg-green-600" onClick={handleSubmit}>
                Create
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}

export default AddStockItemForm;
