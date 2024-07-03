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
  Textarea,
} from "@material-tailwind/react";

import SmallCard from "../../../components/cards/card";


function AddCategoryForm({ title,addCategoryToList }) {
  const [isFormVisible, setFormVisible] = useState(false);

  const closeForm = () => {
    setFormVisible(false);
  };
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
  
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

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


    if (!formData.categoryName.trim()) {
      newErrors.categoryName = "Category Name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
 

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await axios.post(
          "http://localhost:5000/stockManager/category",
          formData
        );
        handleClose();
        setFormData({
          categoryName: "",
          description: "",
        });
        setErrors({});
  window.location.replace("/stockManager/stockItem");

      } catch (error) {
        console.error("Error creating category:", error);
        setErrorMessage("Failed to create category");
        alert("Failed to create category");
      }
    }
    };

  const handleClear = () => {
    setFormData({
        categoryName: "",
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
              Add New Category
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter Category details Here
            </Typography>

            <div className="flex flex-row ">
              
              <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Category Name:
                </Typography>
                <Input
                  label="Category Name"
                  size="lg"
                  name="categoryName"
                  value={formData.categoryName}
                  onChange={handleChange}
                  placeholder=""
                  error={errors.categoryName}
                />
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
            <div className="flex flex-row justify-between gap-4">
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
   </>
  );
}

export default AddCategoryForm;