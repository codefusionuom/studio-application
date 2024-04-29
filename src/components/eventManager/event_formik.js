import React, { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import {
  Card,
  Input,
  Typography,
  Button,
  Dialog,
} from "@material-tailwind/react";
import Datepicker from "../../components/datePicker/Datepicker";
import { Pagination } from "../../components/pagination/pagination";
import SmallCard from "../../components/cards/card";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../config/axios.config";
import * as Yup from "yup";
import Customerform from "./Components/customerform";

const initialState = {};

function Customers() {
  const [open, setOpen] = useState(false);
  
  const [event, setEvent] = useState({
    serviceType: "",
    date: "",
    status: "",
  });
  const [numberofresults, setNumberofresults] = useState(0);
  const [customers, setCustomers] = useState();
//   const [search, setSearch] = useState("");
  const [active, setActive] = useState(1);
  const [mode, setMode] = useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

// add handler
  const handleAdd = () => {
    console.log(event, "add");
    setEvent()
    setMode(false);
    setOpen(true);
   
  };
  //edit handler
  const handleEdit = () => {
    // console.log(customer, "edit");
    setMode(true);
    setOpen(true);
  
  };

//   const handleSearch = async () => {
//     if (!search) {
//       console.log("date query");
//       return;
//     }
//     try {
//       console.log("try customer");
//       const { data } = await axiosInstance.get(
//         `/customerManager/customer/?search=${search}`
//       );
//       console.log(data);
//       setCustomer(data);
//       setMode(false);
//     } catch (error) {
//       console.log(error);
//     }
//   };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-10">
        <SmallCard
          className=" w-full"
          title="Create Customer "
          onClick={handleAdd}
        />
        <Card className="w-full rounded flex justify-center px-4">
          <div className="flex flex-col items-center justify-between gap-4   md:flex-row ">
            <Typography className="text-2xl">Edit Event</Typography>
            
          </div>
        </Card>
      </div>
      <div>
        <Card className=" w-full border-2 rounded p-4">
          {event?.id ? (
            <div className="grid grid-cols-1 gap-20 gap-y-5 p-6">
              <div className="grid grid-cols-3  items-center">
                <div className="capitalize text-black text-600 text-lg">
                  Fullname
                </div>
                <div className="text-lowercase col-span-2  bg-blue-gray-100 rounded-md px-6 p-4">
                  {/* {event.firstname + " " + event.lastname} */}
                  {event.serviceType}
                </div>
              </div>
              <div className="grid grid-cols-3   items-center">
                <div className="capitalize  text-black text-600 text-lg">
                  Email
                </div>
                <div className="text-lowercase col-span-2  lex-1 bg-blue-gray-100 rounded-md px-6 p-4">
                  {event.serviceType}
                </div>
              </div>
              <div className="grid grid-cols-3   items-center">
                <div className="capitalize text-black text-600 text-lg">
                  Mobile Phone
                </div>
                <div className="text-lowercase col-span-2  bg-blue-gray-100 rounded-md px-6 p-4">
                  {event.serviceType}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-5 items-center">
                <div className="capitalize  text-black text-600 text-lg">
                  Address
                </div>
                <div className="text-lowercase col-span-2  bg-blue-gray-100 rounded-md px-6 p-4">
                  {event.status}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 items-center">
                <div className="capitalize text-black text-600 text-lg">
                  Status
                </div>
                <div>
                  {event.status > 0 ? (
                    <div className="p-2 bg-blue-800 rounded  text-white">
                      Active | {event.status}
                    </div>
                  ) : (
                    <div className="p-2 bg-gray-800 text-white rounded">
                      Inactive
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-5 items-center">
                <div>
                  <div
                    className="font-normal bg-blue-800 rounded p-2 px-6 text-white"
                    onClick={()=>{handleEdit()}}
                  >
                    Edit
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Typography
                as="div"
                variant="paragraph"
                className="mb-2 h-2 w-full rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>
              <Typography
                as="div"
                variant="paragraph"
                className="mb-2 h-2 w-full rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>
              <Typography
                as="div"
                variant="paragraph"
                className="mb-2 h-2 w-full rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>
              <div className="flex justify-center">Customer not found</div>
              <Typography
                as="div"
                variant="paragraph"
                className="mb-2 h-2 w-full rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>
              <Typography
                as="div"
                variant="paragraph"
                className="mb-2 h-2 w-full rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>
              <Typography
                as="div"
                variant="paragraph"
                className="mb-2 h-2 w-full rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>
            </div>
          )}
        </Card>
        <Dialog
          size="xxl"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none"
        >
          <Customerform
            handleOpen={handleOpen}
            initialvalues={event}
            setCustomer={setEvent}
            mode={mode}
          />
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
      </div>
    </div>
  );
}

export default Customers;