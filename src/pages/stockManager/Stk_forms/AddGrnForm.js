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
  Select,
  Option,
  CardFooter,
  Textarea,
} from "@material-tailwind/react";
import SmallCard from "../../../components/cards/card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteRecordButton from "../../../components/buttons/DeleteRecordButton";
import EditRecordButton from "../../../components/buttons/EditRecordButton";

function AddGrnForm({ title }) {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState(null);
  const [formData, setFormData] = useState({
    itemId: "", // Changed itemName to itemId
    price: "",
    supplierId: "",
    quantity: "",
    discount: "",
    subtotal: "",
    date: "",
    description: "",
    paymentStatus: "",
  });

  const [errors, setErrors] = useState({});

  const [items, setItems] = useState([]);
  const [stkItems, setStkItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const handleOpen = (value) => setSize(value);

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!formData.date.trim()) {
      newErrors.date = "date is required";
      isValid = false;
    }
    if (!formData.quantity.trim()) {
      newErrors.quantity = "Quantity is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const selectedItem = stkItems.find((item) => item.id === formData.itemId);
      const newItem = {
        itemId: formData.itemId,
        itemName: selectedItem ? selectedItem.itemName : "",
        price: formData.price,
        quantity: formData.quantity,
      };

      // Add the new item to the items state
      const updatedItems = [...items, newItem];
      setItems(updatedItems);

      const updatedSubtotal = calculateSubtotal(updatedItems);
      setFormData({
        ...formData,
        itemId: "",
        price: "",
        quantity: "",
        discount: "",
        subtotal: updatedSubtotal,
      });
      setErrors({});

      // Show success toast
      toast.success("Stock item added successfully", {
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
  };

  const handleSubmit2 = async () => {
    if(validateForm()){
    console.log("Form submitted");

    // Prepare the data to be sent
    const dataToSend = {
      items,
      description: formData.description,
      date: formData.date,
      supplierId: formData.supplierId, // Send supplierId to backend
      subtotal: formData.subtotal,
      discount: formData.discount,
      paymentStatus: formData.paymentStatus,
    };

    try {
      console.log(dataToSend);
      await axios.post("http://localhost:5000/stockManager/grn", dataToSend);

      console.log(dataToSend);
      // Clear the form data and errors
      setFormData({
        itemId: "",
        itemName: "",
        price: "",
        supplierId: "", // Clear supplierId after submission
        supplierName: "",
        quantity: "",
        discount: "",
        subtotal: "",
        date: "",
        description: "",
        paymentStatus: "",
      });
      setErrors({});
      setItems([]); // Clear the items array

      toast.success("GRN created successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handleOpen(null);
    } catch (error) {
      console.error("Error creating grn:", error);

      toast.error("grn creation unsuccessful", {
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
  };
}

  const handleChange = (e) => {
    if (!e || !e.target) {
      console.error("Event or event target is undefined");
      return;
    }

    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    if (name === "supplierName") {
      const selectedSupplier = suppliers.find(
        (supplier) => supplier.supplierName === value
      );
      if (selectedSupplier) {
        setFormData((prevData) => ({
          ...prevData,
          supplierId: selectedSupplier.id,
          address: selectedSupplier.address,
          contactNo: selectedSupplier.contactNo,
          email: selectedSupplier.email,
        }));
      }
    } else if (name === "itemName") {
      const selectedItem = stkItems.find((item) => item.itemName === value);
      if (selectedItem) {
        setFormData((prevData) => ({
          ...prevData,
          itemId: selectedItem.itemId, // Store itemId
          price: selectedItem.price,
        }));
      }
    }
  };

  const handleClear = () => {
    setFormData({
      itemName: "",
      price: "",
      supplierName: "",
      quantity: "",
      discount: "",
      subtotal: "",
      date: "",
      description: "",
      paymentStatus: "",
    });
    setErrors({});
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

  useEffect(() => {
    // Fetch items from API or define them statically
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/stockManager/supplierList"
        );
        const { success, message, suppliers } = response.data;

        if (success) {
          setSuppliers(suppliers); // Update the items state with fetched data
        } else {
          console.error("Failed to fetch stock Items:", message);
        }
      } catch (error) {
        console.error("Error fetching stock Items:", error);
      }
    };

    fetchSupplier();
  }, []);

  const handleChangeDiscount = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, discount: value });

    let updatedSubtotal = 0;
    if (value.trim() === "") {
      updatedSubtotal = calculateSubtotal(items); // Calculate subtotal without discount
    } else {
      const discountValue = parseFloat(value);
      updatedSubtotal = calculateSubtotal(items, discountValue); // Calculate subtotal with discount
    }

    setFormData((prevData) => ({
      ...prevData,
      subtotal: updatedSubtotal,
    }));
  };

  const calculateSubtotal = (updatedItems, discount = 0) => {
    let subtotal = 0;
    updatedItems.forEach((item) => {
      let total = item.quantity * item.price;
      if (discount > 0) {
        subtotal += total - total * (discount / 100);
      } else {
        subtotal += total;
      }
    });
    return subtotal.toFixed(2);
  };

  const handleDelete = (index) => {
    // Filter out the item at the specified index
    const updatedItems = items.filter((_, itemIndex) => itemIndex !== index);
    setItems(updatedItems);

    const updatedSubtotal = calculateSubtotal(updatedItems);
    setFormData((prevData) => ({
      ...prevData,
      subtotal: updatedSubtotal,
    }));

    console.log("Successfully deleted stock item from frontend");
    alert("Successfully deleted stock item ");
  };

  const handleSelectChangeId = (value) => {
    console.log(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      itemId: value,
    }));
  };

  return (
    <div>
      <SmallCard
        className="cursor-pointer"
        title={title}
        onClick={() => handleOpen("xl")}
        variant="gradient"
      />

      <Dialog open={size === "xl"} size={size || "xl"} handler={handleOpen}>
        <DialogHeader>New Grn</DialogHeader>
        <DialogBody>
          <Card color="transparent" shadow={false}>
            <form className="p-2 w-full">
              <div className=" flex flex-row justify-between">
                <div className=" flex flex-row justify-between">
                  <div>
                    <Typography className="mb-2" variant="h6">
                      Supplier Name:
                    </Typography>
                    <Select
                      label="Supplier"
                      size="lg"
                      onChange={(value) =>
                        handleChange({
                          target: { name: "supplierName", value },
                        })
                      }
                      value={formData.supplierName}
                      className="z-10"
                    >
                      {suppliers.map((supplier) => (
                        <Option key={supplier.id} value={supplier.supplierName}>
                          {supplier.supplierName}
                        </Option>
                      ))}
                    </Select>

                    {errors.supplierName && (
                      <Typography className="text-red-500 text-sm">
                        {errors.supplierName}
                      </Typography>
                    )}
                  </div>

                  <div className=" flex flex-col">
                    <div className=" ml-2 ">
                      <Typography className="mb-2 " variant="h6">
                        Supplier Name: {formData.supplierName}
                      </Typography>
                    </div>
                    <div className=" ml-2">
                      <Typography className="mb-2" variant="h6">
                        Address: {formData.address}
                      </Typography>
                    </div>
                    <div className=" ml-2">
                      <Typography className="mb-2" variant="h6">
                        Contact No: {formData.contactNo}
                      </Typography>
                    </div>
                    <div className=" ml-2">
                      <Typography className="mb-2" variant="h6">
                        Email: {formData.email}
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-1/4">
                  <Typography className="mb-2" variant="h6">
                    Date:
                  </Typography>
                  <Input
                    label="Date"
                    size="lg"
                    name="date"
                    value={formData.date}
                    type="date"
                    onChange={handleChange}
                    error={!!errors.date}
                  />
                </div>
              </div>

              <div className="flex flex-row gap-5 items-end mt-5">
                <div className="flex flex-col gap-2 w-1/4">
                  <Typography className="mb-2" variant="h6">
                    Item:
                  </Typography>
                  <Select
                    name="itemName"
                    size="lg"
                    value={formData.itemId}
                    onChange={(value) => handleSelectChangeId(value)}
                  >
                    {stkItems.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.itemName}
                      </Option>
                    ))}
                  </Select>
                  {errors.itemId && ( // Display error message if itemId field has an error
                    <Typography className="text-red-500 text-sm">
                      {errors.itemId}
                    </Typography>
                  )}
                </div>
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
                  {errors.quantity && ( // Display error message if quantity field has an error
                    <Typography className="text-red-500 text-sm">
                      {errors.quantity}
                    </Typography>
                  )}
                </div>

                <div className="flex justify-end w-full">
                  <Button className="bg-btn-success" onClick={handleSubmit}>
                    <Typography className="font-bold">Add Item</Typography>
                  </Button>
                </div>
              </div>
            </form>
          </Card>

          <Card className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md bg-clip-border rounded-xl mt-10">
            <table className="w-full text-left table-auto min-w-max">
              <thead>
                <tr>
                  <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Item Name
                    </p>
                  </th>
                  <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Price
                    </p>
                  </th>
                  <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Quantity
                    </p>
                  </th>
                  <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Total Cost
                    </p>
                  </th>
                  <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Delete
                    </p>
                  </th>
                  {/* <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                    <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Edit
                    </p>
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {item.itemName} {/* Display itemName here */}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {item.price}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {item.quantity}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {item.quantity * item.price}
                      </p>
                    </td>
                    <td>
                      <DeleteRecordButton onClick={() => handleDelete(index)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <div className="flex flex-row justify-around gap-8 mt-5">
            <div className="h-full min-h-[100px] w-full">
              <Typography>Description:</Typography>
              <Textarea
                className="peer mt-2 h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter Description"
              ></Textarea>
            </div>
            <div className="flex flex-col gap-2 w-1/4">
              <Typography>Discount %:</Typography>
              <Input
                type="number"
                label="Discount"
                color="lightBlue"
                placeholder="Discount (%)"
                name="discount"
                value={formData.discount}
                onChange={handleChangeDiscount}
              />
            </div>
            <div className="mt-5 w-full">
              <Typography variant="h6">
                Subtotal:Rs. {formData.subtotal}
              </Typography>
            </div>
            <Select
              label="Payment Status"
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  paymentStatus: value,
                })
              }
              required
            >
              <Option value="No Payment">No Payment</Option>
              <Option value="Half Payment">Half Payment</Option>
              <Option value="Full Payment">Full Payment</Option>
            </Select>
          </div>
        </DialogBody>

        <CardFooter className="pt-0">
          <div className="flex flex-row justify-between gap-4">
            <Button className="bg-btn-warning w-1/4" onClick={handleClear}>
              Clear
            </Button>
            <Button className=" bg-btn-success w-1/4" onClick={handleSubmit2}>
              Create
            </Button>
          </div>
        </CardFooter>
      </Dialog>

      <ToastContainer />
    </div>
  );
}

export default AddGrnForm;
