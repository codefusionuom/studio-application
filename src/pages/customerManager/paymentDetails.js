import { Card, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/axios.config";
import BackButton from "../../components/buttons/BackButton";


function PaymentDetails() {
  const { id } = useParams();
  const [payment, setPayment] = useState({ amount: "" });

  useEffect(() => {
    const fetchPayment = async () => {
      const { data } = await axiosInstance.get(
        `/customerManager/payment/${id}`
      );
      setPayment(data);
      console.log(id, data);
    };
    fetchPayment();
  }, []);

  return (
    <div className="flex flex-col gap-10">

      <Card className="p-4 overflow-hidden">
       <BackButton />
        <div className="bg-bg mt-12 p-4 flex justify-between rounded">
          <Typography className="font-Lato text-4xl font-normal font-500">
            Customer Information
          </Typography>
        </div>
        <div className="my-4  grid grid-cols-2 gap-10">
          <Input
            type="name"
            label="Full name"
            value={payment?.customerName}
            className="pr-20 bg-white text-black font-bold"
            containerProps={{
              className: "min-w-0",
            }}
            disabled
          />
          <Input
            type="name"
            label="Customer Name"
            value={payment?.customerMobilePhone}
            className="pr-20"
            containerProps={{
              className: "min-w-0",
            }}
            disabled
          />
        </div>
        <div className="bg-bg p-4 mt-20 flex justify-between rounded">
          <Typography className="font-Lato text-4xl font-normal font-500">
            Event Information
          </Typography>
        </div>
        <div className="my-4  grid grid-cols-2 gap-10">
        <div className=" p-4 gap-4 ">
            <Typography className=" text-md  font-semibold ">
              Service Name :
            </Typography>
            <Input
            type="name"
            label="Payment"
            value={payment?.event?.service?.serviceName}
            className="pr-20 bg-white text-black font-bold"
            containerProps={{
              className: "min-w-0",
            }}
            disabled
          />
          </div>
          <div className=" p-4 gap-4 ">
            <Typography className=" text-md  font-semibold ">
              Amout :
            </Typography>
            <Input
            type="name"
            label="Full name"
            value={payment?.event?.amount}
            className="pr-20 bg-white text-black font-bold"
            containerProps={{
              className: "min-w-0",
            }}
            disabled
          />
          </div>
          <div className=" p-4 gap-4 ">
            <Typography className=" text-md  font-semibold ">
              Offers :
            </Typography>
            <Input
            type="name"
            label="Offers"
            value={payment?.event?.offers ? payment?.event?.offers : "0.00"}
            className="pr-20 bg-white text-black font-bold"
            containerProps={{
              className: "min-w-0",
            }}
            disabled
          />
          </div>
          <div className=" p-4 gap-4 ">
            <Typography className=" text-md  font-semibold ">
              Payment :
            </Typography>
            <Input
            type="name"
            label="Payment"
            value={payment?.event?.payment}
            className="pr-20 bg-white text-black font-bold"
            containerProps={{
              className: "min-w-0",
            }}
            disabled
          />
          </div>
          <div className=" p-4 gap-4 ">
            <Typography className=" text-md  font-semibold ">
              Description :
            </Typography>
            <Input
            type="name"
            label="Payment"
            value={payment?.event?.description}
            className="pr-20 bg-white text-black font-bold"
            containerProps={{
              className: "min-w-0",
            }}
            disabled
          />
          </div>
          <div className=" p-4 gap-4 ">
            <Typography className=" text-md  font-semibold ">
              Status :
            </Typography>
            <Input
            type="name"
            label="Payment"
            value={payment?.event?.status}
            className="pr-20 bg-white text-black font-bold"
            containerProps={{
              className: "min-w-0",
            }}
            disabled
          />
          </div>
        </div>
        <div className="bg-bg p-4 mt-20 flex justify-between rounded">
          <Typography className="font-Lato text-4xl font-normal font-500">
            Payment Information
          </Typography>
        </div>
        <div className="my-4  grid grid-cols-2 gap-10">
          
          <div className=" p-4 gap-4 ">
            <Typography className=" text-md  font-semibold ">
              Amout :
            </Typography>
            <Input
            type="name"
            label="Full name"
            value={payment?.amount}
            className="pr-20 bg-white text-black font-bold"
            containerProps={{
              className: "min-w-0",
            }}
            disabled
          />
          </div>
          <div className=" p-4 gap-4 ">
            <Typography className=" text-md  font-semibold ">
              Offers :
            </Typography>
            <Input
            type="name"
            label="Offers"
            value={payment?.offers ? payment?.offers : "0.00"}
            className="pr-20 bg-white text-black font-bold"
            containerProps={{
              className: "min-w-0",
            }}
            disabled
          />
          </div>
          <div className=" p-4 gap-4 ">
            <Typography className=" text-md  font-semibold ">
              Payment :
            </Typography>
            <Input
            type="name"
            label="Payment"
            value={payment?.payment}
            className="pr-20 bg-white text-black font-bold"
            containerProps={{
              className: "min-w-0",
            }}
            disabled
          />
          </div>
          <div className=" p-4 gap-4 ">
            <Typography className=" text-md  font-semibold ">
              Description :
            </Typography>
            <Input
            type="name"
            label="Payment"
            value={payment?.description}
            className="pr-20 bg-white text-black font-bold"
            containerProps={{
              className: "min-w-0",
            }}
            disabled
          />
          </div>
          <div className=" p-4 gap-4 ">
            <Typography className=" text-md  font-semibold ">
              Date :
            </Typography>
            <Input
            type="name"
            label="Payment"
            value={new Date(payment?.createdAt).getFullYear() +
                "-" +
                (new Date(payment?.createdAt).getMonth() + 1) +
                "-" +
                new Date(payment?.createdAt).getDate()}
            className="pr-20 bg-white text-black font-bold"
            containerProps={{
              className: "min-w-0",
            }}
            disabled
          />
          </div>
          <div className=" p-4 gap-2 ">
            <Typography className=" text-md  font-semibold ">
              Time :
            </Typography>
            <Input
            type="name"
            label="Payment"
            value={new Date(payment?.createdAt).getHours() +
                ":" +
                new Date(payment?.createdAt).getMinutes()}
            className="pr-20 bg-white text-black font-bold"
            containerProps={{
              className: "min-w-0",
            }}
            disabled
          />
          </div>
        </div>
      </Card>
      
     
    </div>
  );
}

export default PaymentDetails;
