import {
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
  Button,
  Select,
  Option,
  PopoverHandler,
  Popover,
  PopoverContent,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { DayPicker } from "react-day-picker";

function Eventform({ initialvalues, mode, handleOpen, setCustomer }) {
  const [serviceType, setServiceType] = useState("");
  const [date, setDate] = useState();

  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema: Yup.object({
      firstname: Yup.string(),
      lastname: Yup.string(),
      email: Yup.string().email("Invalid email address"),
      mobilePhone: Yup.string(),
      address: Yup.string(),
      emailOrMobile: Yup.string().test({
        name: "emailOrMobile",
        message: "Either email or mobile phone is required",
        test: function (value) {
          return this.parent.email || this.parent.mobilePhone;
        },
      }),
    }),
    onSubmit: async (values) => {
      console.log("hello");
      const { firstname, lastname, email, mobilePhone, address } = values;
      console.log(values);
      try {
        if (mode) {
          console.log(initialvalues.id, "initial value");
          const { data } = await axios.put(
            `/customerManager/customer/${initialvalues.id}`,
            {
              firstname,
              lastname,
              email,
              mobilePhone,
              address,
            }
          );
          setCustomer(data[1][0]);
          console.log(data[1][0]);
          handleOpen();
          if (data) {
            // toast.success('success', {
            //     position: "top-center",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light",
            // });
          }
        } else {
          const { data } = await axios.post("/customerManager/customer", {
            firstname,
            lastname,
            email,
            mobilePhone,
            address,
          });
          console.log(data);
          handleOpen();
          if (data) {
            // toast.success('success', {
            //     position: "top-center",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light",
            // });
          }
        }
      } catch (error) {
        console.log(error);
        // toast.error(error.response.data.message || error.message, {
        //     position: "top-center",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        // });
      }
    },
  });
  return (
    <div>
      <Card className="mx-auto w-full ">
        <CardBody className="flex flex-col gap-4 ">
          <Typography
            variant="h2"
            className="flex justify-center"
            color="blue-gray"
          >
            Edit Event
          </Typography>
          <div className="grid grid-cols-2 gap-10 mt-8">
            <div className="flex flex-col gap-4">
              <Typography className="-mb-2" variant="h6">
                Service Type
              </Typography>
              {/* <Input label="First Name"
                    id="firstname"
                    type="text"
                    {...formik.getFieldProps('firstname')}
                    size="lg" /> */}

              <Select
                label="Select Version"
                className="relative h-11 w-full min-w-[200px]"
                // onChange={(e) => {
                //   console.log("Entire event object:", e.target.value);
                //   if (e && e.target && e.target.value) {
                //     setServiceType(e.target.value);
                //   } else {
                //     console.log("No valid event or value");
                //   }
                // }}
                onChange={(value) => {
                  setServiceType(value);
                  console.log("changed Value:", value);
                  console.log("Service type: ", serviceType);
                }}
                // selected={(element) => {
                //   if (element) {
                //     setServiceType(element.props.value);
                //     const selectedValue = element.props.value;
                //     console.log("Selected Value:", selectedValue);
                //     console.log("Service type : ", serviceType);
                //     //  console.log("date: " , date);
                //     return element.props.name;
                //   }
                // }}
                value={serviceType}
              >
                <Option value="one Day Services">One Day Services</Option>
                <Option value="wedding Photography">Wedding Photography</Option>
                {/* Add other options as needed */}
              </Select>
            </div>
            <div className="flex flex-col gap-4">
              <Typography className="-mb-2" variant="h6">
                Last Name
              </Typography>
              <Popover placement="top">
                <PopoverHandler>
                  <Input
                    className=" "
                    label="Select a Date"
                    onChange={
                      (e) =>
                        // value={date ? format(date, "PPP") : ""}
                        // value={date ? 'ffff': '' }

                        setDate(date)
                      // console.log(date);
                    }
                    value={
                      date
                        ? `${date.getDate()}/${
                            date.getMonth() + 1
                          }/${date.getFullYear()}`
                        : ""
                    }
                  />
                </PopoverHandler>
                <PopoverContent>
                  <DayPicker
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    showOutsideDays
                    className="border-0"
                    classNames={{
                      caption:
                        "flex justify-center py-2 mb-4 relative items-center",
                      caption_label: "text-sm font-medium text-gray-900",
                      nav: "flex items-center",
                      nav_button:
                        "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                      nav_button_previous: "absolute left-1.5",
                      nav_button_next: "absolute right-1.5",
                      table: "w-full border-collapse",
                      head_row: "flex font-medium text-gray-900",
                      head_cell: "m-0.5 w-9 font-normal text-sm",
                      row: "flex w-full mt-2",
                      cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                      day: "h-9 w-9 p-0 font-normal",
                      day_range_end: "day-range-end",
                      day_selected:
                        "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                      day_today: "rounded-md bg-gray-200 text-gray-900",
                      day_outside:
                        "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                      day_disabled: "text-gray-500 opacity-50",
                      day_hidden: "invisible",
                    }}
                    components={{
                      IconLeft: ({ ...props }) => (
                        <ChevronLeftIcon
                          {...props}
                          className="h-4 w-4 stroke-2"
                        />
                      ),
                      IconRight: ({ ...props }) => (
                        <ChevronRightIcon
                          {...props}
                          className="h-4 w-4 stroke-2"
                        />
                      ),
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col gap-4">
              <Typography className="-mb-2" variant="h6">
                Email
              </Typography>
              {formik.errors.email ? (
                <div className=" text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
              <Input
                label="Email"
                id="email"
                type="text"
                {...formik.getFieldProps("email")}
                size="lg"
              />
            </div>
            <div className="flex flex-col gap-4">
              <Typography className="-mb-2 " variant="h6">
                Mobile Phone
              </Typography>
              <Input
                label="mobilePhone"
                id="mobilePhone"
                type="text"
                {...formik.getFieldProps("mobilePhone")}
                size="lg"
              />
            </div>
            <div className="flex flex-col gap-4">
              <Typography className="-mb-2" variant="h6">
                Address
              </Typography>
              <Input
                label="Address"
                id="address"
                type="text"
                {...formik.getFieldProps("address")}
                size="lg"
              />
            </div>
          </div>

          {formik.errors.emailOrMobile ? (
            <div className=" text-red-500 text-sm">
              {formik.errors.emailOrMobile}
            </div>
          ) : null}
        </CardBody>
        <CardFooter className="pt-0">
          <div className="flex gap-10">
            <Button
              variant="gradient"
              color="amber"
              onClick={formik.resetForm}
              fullWidth
            >
              Clear
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={formik.handleSubmit}
              fullWidth
            >
              {mode ? "Edit" : "Create"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Eventform;
