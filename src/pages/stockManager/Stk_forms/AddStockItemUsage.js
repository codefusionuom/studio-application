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

function AddStockItemUsage({
  title,
  addStockItemUsageToList,
  open,
  handleOpen,
  handleClose,
  setFormData,
  formData = {
    employeeId: "",
    itemId: "",
    quantity: "",
    returnQuantity: "",
    description: "",
  }, // Default values
  mode,
}) {
  const [size, setSize] = useState(null);
  const [errors, setErrors] = useState({});
  const [stkItems, setStkItems] = useState([]);
  const [employees, setEmployees] = useState([]);

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
            `http://localhost:5000/stockManager/stockItemUsage/${formData.id}`,
            formData
          );
          addStockItemUsageToList(formData);
        } else {
          // Add
         
          await axios.post(
            "http://localhost:5000/stockManager/stockItemUsage",
            formData
          );
          addStockItemUsageToList(formData);
        }
        handleClose();
        // Clear the form data and errors
        setFormData({
          itemId: "",
          employeeId: "",
          quantity: "",
          returnQuantity: "",
          description: "",
        });
        setErrors({});
  
        toast.success(" items created successfully", {
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
        // window.location.replace("/stockManager/returnedStock");
      } catch (error) {
        console.error("Error creating  items:", error.response); // Log the response for more details
  
        toast.error(" item creation unsuccessful", {
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
      }));
    }
  };

  useEffect(() => {
    // Fetch stock items from API
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/stockManager/stockItem"
        );
        const { success, message, stockItems } = response.data;

        if (success) {
          setStkItems(stockItems); // Update the items state with fetched data
        } else {
          console.error("Failed to fetch stock Items:", message);
        }
      } catch (error) {
        console.error("Error fetching stock Items:", error);
      }
    };

    // Fetch employees from API
    // const fetchEmployees = async () => {
    //   try {
    //     const response = await axios.get(
    //       "http://localhost:5000/employeeManager/employees"
    //     );
    //     const { success, message, employees } = response.data;

    //     if (success) {
    //       setEmployees(employees); // Update the employees state with fetched data
    //     } else {
    //       console.error("Failed to fetch employees:", message);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching employees:", error);
    //   }
    // };

    fetchItems();
    // fetchEmployees();
  }, []);

  const handleItemChange = (value) => {
    const selectedItem = stkItems.find((item) => item.itemName === value);
    if (selectedItem) {
      setFormData({ ...formData, itemId: selectedItem.id });
      setErrors({ ...errors, itemId: "" });
    }
  };

  const handleEmployeeChange = (value) => {
    const selectedEmployee = employees.find(
      (employee) => employee.empName === value
    );
    if (selectedEmployee) {
      setFormData({ ...formData, employeeId: selectedEmployee.id });
      setErrors({ ...errors, employeeId: "" });
    }
  };



  const handleClear = () => {
    setFormData({
      employeeId: "",
      itemId: "",
      quantity: "",
      returnQuantity: "",
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
        <DialogHeader>Borrow Item</DialogHeader>
        <DialogBody>
          <Card color="transparent" shadow={false}>
            <form className="p-2 w-full">
              <div className="flex flex-row gap-5 items-end mb-5 justify-around">
                {/* <div className="flex flex-col gap-2 w-1/4 ">
                  <Typography className="mb-2" variant="h6">
                    Employee Name:
                  </Typography>
                  <Select
                    label="Employee Name"
                    size="lg"
                    onChange={(value) => handleEmployeeChange(value)}
                    value={
                      employees.find(
                        (employee) => employee.id === formData.employeeId
                      )?.empName || ""
                    }
                    className="z-10"
                  >
                    {employees.map((employee) => (
                      <Option
                        key={employee.id} // Assign a unique key based on employee.id
                        value={employee.empName}
                      >
                        {employee.empName}
                      </Option>
                    ))}
                  </Select>

                  {errors.empName && (
                    <Typography className="text-red-500 text-sm">
                      {errors.empName}
                    </Typography>
                  )}
                </div> */}

                <div className="flex flex-col gap-2 w-1/4">
                  <Typography className="mb-2" variant="h6">
                    Item:
                  </Typography>
                  <Select
                    label="Item"
                    size="lg"
                    onChange={(value) => handleItemChange(value)}
                    value={
                      stkItems.find((item) => item.id === formData.itemId)
                        ?.itemName || ""
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
                <div className="flex flex-col gap-2 w-1/4">
                  <Typography>Return Quantity:</Typography>
                  <Input
                    label="Return Quantity"
                    size="lg"
                    name="returnQuantity"
                    value={formData.returnQuantity}
                    onChange={handleChange}
                    error={!!errors.returnQuantity}
                  />
                </div>
              </div>
            </form>
          </Card>

          <div className="flex flex-col gap-5 items-end mt-5 justify-around">
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

export default AddStockItemUsage;
