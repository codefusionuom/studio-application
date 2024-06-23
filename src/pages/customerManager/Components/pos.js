import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../config/axios.config";
import "react-toastify/dist/ReactToastify.css";
import { ToastError, ToastSuccess } from "../ToastAlert";

function Payment({ event, initalvalues, search }) {
  const [eventDetails, setEventDetails] = useState(event);
  const [offerType,setOfferType]=useState(true) // ture=price, false=precentage
  const {
    customerName,
    serviceType,
    description,
    amount,
    offers,
    payment,
    status,
    type,
    eventDate
  } = eventDetails;
  console.log("render payment", event);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const mobileRegex = /^(?:\+94|0)([1-9][0-9]{8})$/;
    if(!mobileRegex.test(search)){
      ToastError("enter valid mobile number")
      return
    }
    if(!amount){
      ToastError('Enter Amount of Payemnt')
        return
      }
    try {
      const parsedPaymentDetails = {
        ...eventDetails,
        customerMobilePhone: search,
        offers: parseFloat(eventDetails.offers),
        payment: offers ?  (offerType ? parseFloat(eventDetails.amount)-parseFloat(eventDetails.offers) : parseFloat(eventDetails.amount)-(parseFloat(eventDetails.offers)*parseFloat(eventDetails.amount)/100)):parseFloat(eventDetails.amount),
        amount: parseFloat(eventDetails.amount),
      };
      // const {
      //   payment,
      //   } = eventDetails;


    



    // if(amount ? (  offers ? (offerType ? parseFloat(eventDetails.amount)-parseFloat(eventDetails.offers) : parseFloat(eventDetails.amount)-(parseFloat(eventDetails.offers)*parseFloat(eventDetails.amount)/100)) :parseFloat(eventDetails.amount) ) : parseFloat(eventDetails.payment) < 0){
    //   toast.error('Enter correct Offer', {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    //   return
    // }
    

      const { data } = await axiosInstance.post(
        "/customerManager/payment",
        parsedPaymentDetails
      );
      console.log(data);
      if (data) {
        ToastSuccess("success")
      }
    } catch (error) {
      console.log(error);
      ToastError(error.message)
    }
  };

  useEffect(() => {
    setEventDetails(event);
  }, [event]);

  return (
    <div className="flex flex-col gap-8">
      {" "}
      <div className="text-xl ">Payment</div>
      <div className="flex bg-cl-4 justify-between p-10 rounded">
        <div className=" w-[310px] flex flex-col gap-6">
          <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4"><Typography className="text-lg text-cl-2">
              Event
            </Typography></div>
            <Input
              id="serviceType"
              type="text"
              name="serviceType"
              value={   eventDate !=  "" ?  ( serviceType + 
                " - " + (new Date(eventDate).getFullYear()) +
                "-" + (new Date(eventDate).getMonth() + 1) +
                "-" +(new Date(eventDate).getDate())) : "Event"}
              // onChange={handleChange}
              label="Event"
              className=" "
              disabled
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4"><Typography className="text-lg text-cl-2">
              Customer Name
            </Typography> {!customerName ? <Typography className="text-sm text-btn-danger">
            * required
            </Typography>:""}</div>
            
            <Input
              id="customerName"
              type="text"
              name="customerName"
              value={customerName}
              onChange={handleChange}
              label="Name"
              className=" "
              disabled
            />
          </div>
          <div className="flex flex-col gap-2">
            <Typography className="text-lg text-cl-2">Type</Typography>
            
            <select
              className="border-2 border-gray-300 p-2 rounded-lg text-gray-700"
              id="type"
              name="type"
              value={type}
              onChange={handleChange}
              defaultValue="offline"
            >
              <option
                className="text-black bg-bg p-2 rounded-md border-2 "
                value="offline"
                
              >
                Offline
              </option>
              <option
                className="text-black bg-bg p-2 rounded-md "
                value="online"
              >
                Online
              </option>
              
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <Typography className="text-lg text-cl-2">Description</Typography>
            <Textarea
              label="Description about payment  "
              className="h-[150px] "
              id="description"
              type="text"
              name="description"
              value={description}
              onChange={handleChange}
              maxlength="100"
            />
          </div>
          <div>
            <Button
              className="bg-btn-warning text-lg"
              onClick={() => {
                setEventDetails(initalvalues);
              }}
            >
              Clear
            </Button>
          </div>
        </div>
        <div className=" w-[310px] flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Typography className="text-lg text-cl-2">Status</Typography>
            <select
              className="border-2 border-gray-300 p-2 rounded-lg text-gray-700"
              id="status"
              name="status"
              value={status}
              onChange={handleChange}
            >
              <option
                className="text-black bg-bg p-2 rounded-md border-2 "
                value="full"
                selected
              >
                Full Payment
              </option>
              <option
                className="text-black bg-bg p-2 rounded-md border-2 "
                value="half"
              >
                Half Payment
              </option>
              <option
                className="text-black bg-bg p-2 rounded-md border-2 "
                value="advance"
              >
                Advance
              </option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4"><Typography className="text-lg text-cl-2">
              Amount
            </Typography> {!amount ? <Typography className="text-sm text-btn-danger">
            * required
            </Typography>:""}</div>
            <div className=" text-red-500 text-sm"></div>
            <Input
              id="amount"
              type="number"
              name="amount"
              value={amount}
              onChange={handleChange}
              label="LKR"
              className=""
            />
          </div>
          <div className="flex flex-col gap-2">
          <div className="w-32  outline-none mt-6">
              <Select value={offerType} onChange={(value) => setOfferType(value)} className=" outline-none border-none" label="Discount Type" >
                <Option  value={false}>Precentage %</Option>
                <Option selected value={true}>Price $</Option>
                
              </Select>
              </div>
            <Input
              id="offers"
              type="number"
              name="offers"
              value={offers}
              onChange={handleChange}
              label="LKR"
              className=""
            />
          </div>
          <div className="flex flex-col gap-2">
            <Typography className="text-lg text-cl-2">Payment</Typography>
            <div className=" text-red-500 text-sm"></div>

            <Input
              id="payment"
              type="number"
              name="payment"
              value={amount ? (  offers ? (offerType ? parseFloat(eventDetails.amount)-parseFloat(eventDetails.offers) : parseFloat(eventDetails.amount)-(parseFloat(eventDetails.offers)*parseFloat(eventDetails.amount)/100)) :amount ) :payment}
              onChange={handleChange}
              label="LKR"
              className=""
            />
          </div>
          <div>
            <Button className="bg-btn-success text-lg mt-2 px-8" onClick={handleSubmit}>
              Bill
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
