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
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddStockItemForm({ title, addStockItemToList, open, handleOpen, handleClose, setFormData, formData, mode }) {
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    if (e && e.target && e.target.name) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: "" });
    } else {
      console.error("Event or event target is missing or does not have a name attribute.");
    }
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!formData.itemName.trim()) {
      newErrors.itemName = "Item Name is required";
      isValid = false;
    }

    if (!String(formData.cost).trim()) {
      newErrors.cost = "Cost is required";
      isValid = false;
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      if (mode) {
        // edit
        try {
          await axios.put(
            `http://localhost:5000/stockManager/stockItem/${formData.id}`,
            formData
          );
          addStockItemToList(formData);
          handleClose();
          setFormData({
            itemName: "",
            categoryId: "",
            cost: "",
            description: "",
          });
          setErrors({});
          toast.success("Stock item edited successfully", {
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
          console.error("Error editing Stock item:", error);
          handleClose();
          toast.error("Stock item edit unsuccessful", {
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
      } else {
        // add
        try {
          await axios.post(
            "http://localhost:5000/stockManager/stockItem",
            formData
          );
          addStockItemToList(formData);
          handleClose();
          setFormData({
            itemName: "",
            categoryId: "",
            cost: "",
            description: "",
          });
          setErrors({});
          toast.success("Stock item created successfully", {
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
          console.error("Error creating Stock item:", error);
          handleClose();
          toast.error("Stock item creation unsuccessful", {
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
      itemName: "",
      categoryId: "",
      cost: "",
      description: "",
    });
    setErrors({});
  };

  useEffect(() => {
    // Fetch category data
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/stockManager/categoryList"
        );
        const { success, message, categories } = response.data;
        console.log("Fetched categories:", response.data.categories);
        if (success) {
          setCategories(categories); // Update the categories state with fetched data
        } else {
          console.error("Failed to fetch categories:", message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (value) => {
    const selectedCategory = categories.find(
      (category) => category.categoryName === value
    );
    if (selectedCategory) {
      setFormData({ ...formData, categoryId: selectedCategory.id });
      setErrors({ ...errors, categoryId: "" });
    }
  };
  

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none w-fit"
      >
        <Card className="mx-auto w-full">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              {mode ? "Edit Stock Item" : "Add New Stock Item"}
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
                  <Typography className="text-red-500 text-sm">
                    {errors.itemName}
                  </Typography>
                )}
              </div>

              <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Category:
                </Typography>
                <Select
  label="Category"
  size="lg"
  onChange={(value) => handleCategoryChange(value)}
  value={
    categories.find(
      (category) => category.id === formData.categoryId
    )?.categoryName || ""
  }
  className="z-10"
>
  {categories.map((category) => (
    <Option
      key={category.id}
      value={category.categoryName}
    >
      {category.categoryName}
    </Option>
  ))}
</Select>

                {errors.categoryId && (
                  <Typography className="text-red-500 text-sm">
                    {errors.categoryId}
                  </Typography>
                )}
              </div>

              <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Cost:
                </Typography>
                <Input
                  label="Cost"
                  size="xl"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                  placeholder="100,000.00"
                  error={errors.cost}
                />
                {errors.cost && (
                  <Typography className="text-red-500 text-sm">
                    {errors.cost}
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
            <div className="flex flex-row justify-between gap-4">
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

export default AddStockItemForm;
