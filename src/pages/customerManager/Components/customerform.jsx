import {
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
  Button,
} from "@material-tailwind/react";
import React, {  useEffect, useState } from "react";
import axiosInstance from "../../../config/axios.config";
import { ToastError, ToastSuccess } from "../ToastAlert";

function Customerform({
  initialvalues,
  mode,
  handleOpen,
  setCustomer,
  setSearch,
  setCustomers,
  componentType,
  setCustomerInformation,
  customerRequest
}) {
  // console.log(initialvalues);
  const [customerForm, setCustomerForm] = useState(initialvalues );
  const [error, setError] = useState( {});
  const {firstname,lastname,email,mobilePhone,address}=customerForm

  const handleDelete = async (id) => {
    console.log(id, "delete");
    try {
      console.log(initialvalues.id, "initial value");
      const { data } = await axiosInstance.delete(
        `/customerManager/customer/${id}`
      );
      console.log(data);
      handleOpen();
      if (data == 1) {
        ToastSuccess("successfully deleted");
        console.log(data);
      if(componentType) { setCustomers((customer) => {
          handleOpen()
          return customer.filter((c) => c.id != id);
        });
      }
      }
    } catch (error) {
      console.log(error);
      
      ToastError(error.response.data.message || error.message);
      handleOpen()
    }
    finally{
      if(componentType) {console.log("jkjhk"); handleOpen();}
    }
  };

  const handleAddEdit=async()=>{
   
    const mobileRegex = /^(?:\+94|0)([1-9][0-9]{8})$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     console.log(mobilePhone,email,address);
      if(!mobileRegex.test(mobilePhone)){
        setError({mobilePhone:"enter valid mobile number"})
        // ToastError("enter valid mobile number")
        // handleOpen()
        return
      } 
      if(firstname == ""){
        //ToastError("enter valid name")
        setError({firstName:"enter valid Name"})
        // handleOpen()
        return
      }
      // if (email && !emailRegex.test(email)) {
      //   ToastError("enter valid email")
      //   handleOpen()
      //   return
      // }
     if(email != ""){
      if( !emailRegex.test(email)){
        setError({email:"enter valid Email"})
      // handleOpen()
      return
      } 
     }
      
  
    try {
      if (mode) {
        console.log(initialvalues.id, "initial value");
        const { data } = await axiosInstance.put(
          `/customerManager/customer/${initialvalues.id}`,
          {
            firstname,
            lastname,
            email,
            mobilePhone,
            address,
          }
        );
    
        setError({})
        if (data) {
          if(componentType) handleOpen()
          ToastSuccess("successfully updated");
          console.log(data);
          if(componentType){
          setSearch(data[1][0].mobilePhone);
          setCustomer(data[1][0]);console.log(data[1][0])
        }
        else{
          setSearch(data[1][0].mobilePhone);
        }
        
        setCustomerInformation && setCustomerInformation({customerId:data[1][0].id,mobilePhone:data[1][0].mobilePhone,firstname:data[1][0].firstname,lastname:data[1][0].lastname})
      
        }
      } else {
        const { data } = await axiosInstance.post(
          "/customerManager/customer",
          {
            firstname,
            lastname,
            email,
            mobilePhone,
            address,
          }
        );
        console.log(data);
        setError({})
        if (data) {
          ToastSuccess("successfully created");
          if(componentType)setSearch(data.mobilePhone);
          setCustomerInformation && setCustomerInformation({customerId:data.id,mobilePhone:data.mobilePhone,firstname:data.firstname,lastname:data.lastname})
      
          if(componentType)  handleOpen()
        }
      }
    } catch (error) {
      console.log(error);
      setError({})
      ToastError(error.response.data.message || error.message);
       if(componentType) handleOpen()
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


useEffect(()=>{setCustomerForm(initialvalues)},[initialvalues])



  return (
    <div>
      <Card className="mx-auto w-full ">
        <CardBody className="flex flex-col gap-4 ">
          <Typography
            variant="h4"
            className="flex justify-center"
            color="blue-gray"
          >
            {componentType ? (mode ? "Edit Customer" : "Create Customer"): ""}
          </Typography>
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-4">
              <Typography className="-mb-2" variant="h6">
                First Name
              </Typography>
              <Input
                label="First Name"
                id="firstname"
                type="text"
                name="firstname"
                value={firstname}
                onChange={handleChange}
                size="lg"
              />
              {error.firstName && <div className="text-red-500">{error.firstName}</div>}
            </div>
            <div className="flex flex-col gap-4">
              <Typography className="-mb-2" variant="h6">
                Last Name
              </Typography>
              <Input
                label="Last Name"
                id="lastname"
                type="text"
                name="lastname"
                value={lastname}
                onChange={handleChange}
                size="lg"
              />
            </div>

            <div className="flex flex-col gap-4">
              <Typography className="-mb-2" variant="h6">
                Email
              </Typography>
              
              <Input
                label="Email"
                id="email"
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
                size="lg"
              />
              {error.email && <div className="text-red-500">{error.email}</div>}
            </div>
            <div className="flex flex-col gap-4">
              <Typography className="-mb-2 " variant="h6">
                Mobile Phone
              </Typography>
              <Input
                label="mobilePhone"
                id="mobilePhone"
                type=""
                name="mobilePhone"
                value={mobilePhone}
                onChange={handleChange}
                size="lg"
              />
             {error.mobilePhone && <div className="text-red-500">{error.mobilePhone}</div>}
            </div>

            <div className="flex flex-col gap-4">
              <Typography className="-mb-2" variant="h6">
                Address
              </Typography>
              <Input
                label="Address"
                id="address"
                type="text"
                name="address"
                value={address}
                onChange={handleChange}
                size="lg"
              />
            </div>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <div className="flex gap-10">
            {mode ? (
              <Button
                className="bg-btn-danger text-white"
                onClick={() => handleDelete(initialvalues.id)}
                fullWidth
              >
                Delete
              </Button>
            ) : (
              <Button
                className="bg-btn-warning text-white"
                // onClick={setCustomerForm("")}
                fullWidth
              >
                Clear
              </Button>
            )}
            <Button
              onClick={handleAddEdit}
              fullWidth
              className="bg-btn-success"
            >
              {mode ? "Edit" : "Create"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Customerform;
