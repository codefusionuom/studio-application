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

import SmallCard from "../../../components/cards/card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddStockItemForm({ title, id }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    itemId: "",
    itemName: "",
    category: "",
    cost: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState([]);

  const handleOpen = () => {
    setOpen((cur) => !cur);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    if (e && e.target && e.target.name) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: "" });
    } else {
      console.error(
        "Event or event target is missing or does not have a name attribute."
      );
    }
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

    if (!formData.itemName.trim()) {
      newErrors.itemName = "Item Name is required";
      isValid = false;
    }

    if (!formData.cost.trim()) {
      newErrors.cost = "Cost is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await axios.post(
          "http://localhost:5000/stockManager/stockItem",
          formData
        );
        addStockItemToList(formData);
        handleClose();
        setFormData({
          itemId: "",
          itemName: "",
          category: "",
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
  };

  const handleClear = () => {
    setFormData({
      itemId: "",
      itemName: "",
      category: "",
      cost: "",
      ription: "",
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
                  <Typography className="text-red-500 text-sm">
                    {errors.itemId}
                  </Typography>
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
                  <Typography className="text-red-500 text-sm">
                    {errors.itemName}
                  </Typography>
                )}
              </div>
            </div>

            <div className="flex flex-row justify-evenly ">
              <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Category:
                </Typography>
                <Select
                  size="lg"
                  onChange={(value) =>
                    handleChange({ target: { name: "category", value } })
                  }
                  value={formData.category}
                  className="z-10"
                >
                  {categories.map((category) => (
                    <Option
                      key={category.categoryId}
                      value={category.categoryName}
                    >
                      {category.categoryName}
                    </Option>
                  ))}
                </Select>

                {errors.category && (
                  <Typography className="text-red-500 text-sm">
                    {errors.category}
                  </Typography>
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
            <div className="flex flex-row justify-between">
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

export default AddStockItemForm;
