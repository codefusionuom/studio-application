import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  Card,
  Typography,
  Input,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddReturnStockForm({
  title,
  addReturnedStockToList,
  open,
  handleOpen,
  handleClose,
  setFormData,
  formData = { itemId: "", price: "", quantity: "", date: "", description: "" }, // Default values
  mode,
}) {
  const [size, setSize] = useState(null);
  const [errors, setErrors] = useState({});
  const [stkItems, setStkItems] = useState([]);

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    // if (!formData.quantity.trim()) {
    //   newErrors.quantity = "Quantity is required";
    //   isValid = false;
    // }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      console.log("Form submitted");

      try {
        if (mode) {
          // Edit
          await axios.put(
            `http://localhost:5000/stockManager/returnStockItem/${formData.id}`,
            formData
          );
          addReturnedStockToList(formData);
        } else {
          // Add
          await axios.post(
            "http://localhost:5000/stockManager/returnStockItem",
            formData
          );
          addReturnedStockToList(formData);
        }
        handleClose();
        // Clear the form data and errors
        setFormData({
          itemId: "",
          price: "",
          quantity: "",
          date: "",
          description: "",
        });
        setErrors({});

        toast.success("Stock items created successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        handleOpen();
        window.location.replace("/stockManager/returnedStock");
      } catch (error) {
        console.error("Error creating stock items:", error);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });

    // Find the selected item from stkItems array
    const selectedItem = stkItems.find((item) => item.itemName === value);

    // If the selected item is found, update the itemId and price in formData
    if (selectedItem) {
      setFormData((prevData) => ({
        ...prevData,
        itemId: selectedItem.itemId,
        price: selectedItem.cost,
      }));
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        let currentPage = 1;
        let fetchedItems = [];
  
        // Loop until all pages are fetched
        while (true) {
          const response = await axios.get(
            `http://localhost:5000/stockManager/stockItem?page=${currentPage}`
          );
  
          const { success, message, stockItems, totalPages } = response.data;
  
          if (success) {
            fetchedItems = [...fetchedItems, ...stockItems];
            if (currentPage >= totalPages) {
              break; // Exit loop if all pages have been fetched
            } else {
              currentPage++;
            }
          } else {
            console.error("Failed to fetch stock items:", message);
            break; // Exit loop on failure
          }
        }
  
        setStkItems(fetchedItems); // Update state with all fetched items
      } catch (error) {
        console.error("Error fetching stock items:", error);
      }
    };
  
    fetchItems();
  }, []);
  

  const handleItemChange = (value) => {
    const selectedItem = stkItems.find((item) => item.itemName === value);
    if (selectedItem) {
      setFormData({ ...formData, itemId: selectedItem.id, price: selectedItem.cost });
      setErrors({ ...errors, itemId: "" });
    }
  };

  const calculateSubtotal = () => {
    const { price, quantity } = formData;
    const subtotal = price * quantity;
    return (
      "Rs. " +
      subtotal.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };

  const handleClear = () => {
    setFormData({
      itemId: "",
      price: "",
      quantity: "",
      date: "",
      description: "",
    });
    setErrors({});
  };

  return (
    <div>
      <Dialog
        open={open}
        size={size || "md"}
        handler={handleOpen}
        className="bg-white shadow-none w-1/4"
      >
        <DialogHeader>Add New Damage Note</DialogHeader>
        <DialogBody>
          <Card color="transparent" shadow={false}>
            <form className="p-2 w-full">
              <div className="flex flex-row gap-5 items-end mb-5 justify-around">
                <div className="flex flex-col gap-2 w-1/4 ">
                  <Typography>Date:</Typography>
                  <Input
                    label="Date"
                    size="lg"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    error={!!errors.date}
                  />
                </div>
                <div className="flex flex-col gap-2 w-1/4">
                  <Typography className="mb-2" variant="h6">
                    Item:
                  </Typography>
                  <Select
                    label="Item"
                    size="lg"
                    onChange={(value) => handleItemChange(value)}
                    value={
                      stkItems.find((item) => item.id === formData.itemId)?.itemName || ""
                    }
                    className="z-10"
                  >
                    {stkItems.map((item) => (
                      <Option
                        key={item.id} // Assign a unique key based on item.itemId
                        value={item.itemName}
                      >
                        {item.itemName}
                      </Option>
                    ))}
                  </Select>

                  {errors.itemName && (
                    <Typography className="text-red-500 text-sm">
                      {errors.itemName}
                    </Typography>
                  )}
                </div>
              </div>

              <div className="flex flex-row gap-5 items-end justify-around">
                <div className="flex flex-col gap-2 w-1/4">
                  <Typography>Price:</Typography>
                  <Input
                    label="Price"
                    size="lg"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    error={!!errors.price}
                    disabled
                  />
                </div>
                <div className="flex flex-col gap-2 w-1/4">
                  <Typography>Quantity:</Typography>
                  <Input
                    label="Quantity"
                    size="lg"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="Quantity"
                    error={!!errors.quantity}
                  />
                </div>
              </div>
            </form>
          </Card>

          <div className="flex flex-col gap-5 items-end mt-5 justify-around">
            <div className=" justify-center mt-5 w-full">
              <Typography variant="h6">Subtotal: {calculateSubtotal()}</Typography>
            </div>
            <div className="h-full min-h-[100px] w-full">
              <Typography>Description:</Typography>
              <textarea
                className="peer mt-2 h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter the reason"
              ></textarea>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <div className="flex flex-row justify-between gap-4">
            <Button className="bg-btn-warning w-full" onClick={handleClear}>
              Clear
            </Button>
            <Button className=" bg-btn-success w-full" onClick={handleSubmit}>
              {mode ? "Edit" : "Create"}
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
      <ToastContainer />
    </div>
  );
}

export default AddReturnStockForm;
