import React, { useState } from "react";
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
import SmallCard from "../../../components/cards/card";
 
const Test = (props) => {

  const [formData, setFormData] = useState({
    supplierId: props.supplierId || "",
    supplierName: props.supplierName || "",
    itemId: props.itemId || "",
    contactNo: props.contactNo || "",
    email: props.email || "",
    address: props.address || "",
  });
  const [errors,setErrors] = useState({});
  const [successMessage,setSuccessMessage] = useState("");
  const [errorMessage,setErrorMessage] =useState("");


  const handleChange = (e) => {
    e.stopPropagation(); // Stop event propagation
  
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  

  const validateForm =() => {
    let isValid =true;
    let newErrors = {};

    if(!formData.supplierId.trim()){
      newErrors.supplierId = 'Item ID is required';
      isValid = false;
    }else{
      const supplierIdPattern = /^S-\d{4}$/;
      if(!supplierIdPattern.test(formData.supplierId)){
        newErrors.supplierId = "Supplier ID should be in format S-0001";
        isValid = false;
      } 
    }

    if (!formData.supplierName.trim()){
      newErrors.supplierName = "Supplier Name is required";
      isValid = false
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
      const contactNoPattern = /^\d{3}-\d{3} \d{4}$/;
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
  }

  const handleSubmit = async () =>{
    if(validateForm()){
      try{
        const data = formData.supplierId;
        await axios.put(`http://localhost:5000/stockManager/supplier/${data}`,formData);
        setSuccessMessage ("Supplier created successfully");
       
        setFormData({
          supplierId:"",
          supplierName:"",
          itemId:"",
          contactNo:"",
          status:""
        })
        setErrors({});
        }catch(error){
          console.log("Error creating supplier",error);
          setErrorMessage("Failed to create Supplier")
        }
    }

  }
  
  const handleClear = () => {
    setFormData({
      supplierId:"",
      supplierName:"",
      itemId:"",
      contactNo:"",
      status:""
    });
    setErrors({});
  }



  return (
    <div>
      <Card className="mx-auto w-full ">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
            Edit Supplier
          </Typography>
          <Typography
            className="mb-3 font-normal"
            variant="paragraph"
            color="gray"
          >
            Update supplier details here
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
              {errors.itemId && (
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
            <Button className=" bg-yellow-800" onClick={handleClear}>
              Clear
            </Button>
            <Button className=" bg-green-600" onClick={handleSubmit}>
              Update
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Test;
