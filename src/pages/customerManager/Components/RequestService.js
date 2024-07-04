import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import DropdownTreeSelect from "react-dropdown-tree-select";
import axiosInstance from "../../../config/axios.config";
import { ToastError, ToastSuccess } from "../ToastAlert";

function RequestService({
  setCustomerRequest,
  customerRequest,
  Services,
  customer,
}) {
  const [open, setOpen] = useState(1);
  const [date, setDate] = useState(0);
  const [services, setServices] = useState({});
  const [selectedServices, setSelectedServices] = useState();
  const [added, setAdded] = useState(0);
  const [offerType, setOfferType] = useState(true);
  const [serviceInputFields, setServiceInputFields] = useState([]);
  const [form, setForm] = useState({});
  const [error,setError]=useState()

  const onChangeTree = (currentNode, selectedNodes) => {
    fetchCustomerServices(currentNode);
  };
  const today = new Date();

  const handleRemove = () => {
    setAdded(-1);
  };
  
  const handleRequestService = async () => {
    if(!customer?.customerId ){
      setError("registered customer required")
      return
    }
    if(!selectedServices?.id ){
      setError(" customer service required")
      return
    }
    if(!form.amount ){
      setError("expected amount required")
      return
    }

    // console.log(selectedServices, "selctedservice");
    const output = {
      serviceArray: Object.keys(form)
        .filter((key) => !isNaN(key))
        .map((key) => ({ [key]: form[key] })),
      amount: parseFloat(form.amount),
      note: form.note,
      offers: parseFloat(form.offers),
      payment: form.amount
        ? form.offers
          ? offerType
            ? parseFloat(form.amount) - parseFloat(form.offers)
            : parseFloat(form.amount) -
              (parseFloat(form.offers) * parseFloat(form.amount)) / 100
          : form.amount
        : form.payment,
      serviceDate: date,
      serviceId: selectedServices.id,
      customerId: customer.customerId,
      status: "pending",
    };
    console.log(output);

    try {
      const { data } = await axiosInstance.post(
        "/customerManager/eventRequestService",
        { ...output }
      );
      console.log(data);

      if (data) {
        ToastSuccess("successfully created");
        setError("")
        setAdded(1);
      }
    } catch (error) {
      ToastError(error);
    }
    // console.log("output", form, output);

    // setCustomerRequest((prevState) => ({
    //   ...prevState,
    //   services: [...prevState.services, output],
    // }));

   
  };

  const fetchServiceCategories = async () => {
    try {
      const { data } = await axiosInstance.get(`/customerManager/service`);
      console.log(data);
      setServices(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCustomerServices = async (currentNode) => {
    try {
      // console.log("try",status);
      const { data } = await axiosInstance.get(
        `/customerManager/service/${currentNode.value}`
      );
      console.log(data);
      setSelectedServices(data);
      setServiceInputFields(data.serviceInputFields);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchServiceCategories();
  }, []);

  return (
    <Accordion
      open={open}
      icon={<ChevronDownIcon />}
      className={` ${added === -1 ? "hidden" : ""}`}
    >
      <AccordionHeader >
        <div
          className={`flex justify-between items-center  ${
            added === 1 ? "bg-green-50" : "bg-bg"
          } p-4 font-Lato text-2xl w-full font-normal font-500 rounded`}
        >
          <div>{selectedServices?.serviceName? selectedServices?.serviceName
:"Event"} Information</div>
          <div className="flex gap-10 items-center justify-center">
            <DropdownTreeSelect
              data={services}
              mode="radioSelect"
              onChange={onChangeTree}
              // onAction={onAction}
              // onNodeToggle={onNodeToggle}
              className="mdl-demo"
            />
            {open ? (
              <ChevronUpIcon
                className="text-black w-8 h-8"
                onClick={() => setOpen((prev) => !prev)}
              />
            ) : (
              <ChevronDownIcon
                className="text-black w-8 h-8"
                onClick={() => setOpen((prev) => !prev)}
              />
            )}
          </div>
        </div>
      </AccordionHeader>
      <AccordionBody className={`${
            added === 1 ? "bg-green-50" : ""
          }`}>
        <div
          className={`grid grid-cols-2 gap-4 w-full `}
        >
          {serviceInputFields &&
            serviceInputFields.map((serviceinput) => {
              return (
                <div className="flex flex-col gap-4 w-full">
                  {serviceinput.type == "input" ? (
                    <>
                      <Typography className="-mb-2" variant="h6">
                        {serviceinput.fieldName}
                      </Typography>
                      <Input
                        label={serviceinput.fieldName}
                        onChange={(e) => {
                          setForm({
                            ...form,
                            [serviceinput.id]: e.target.value,
                          });
                        }}
                        // onChange={(e) =>
                        //   setForm((prevForm) => ({
                        //     ...prevForm,
                        //     serviceValues: [
                        //       ...prevForm.serviceValues,
                        //       {[serviceinput.id]: e.target.value}
                        //     ],
                        //   }))
                        // }
                        type="text"
                        size="lg"
                      />
                    </>
                  ) : (
                    <>
                      <Typography className="-mb-2" variant="h6">
                        {serviceinput.fieldName}
                      </Typography>
                      <Select
                        // defaultValue={"select" + serviceinput}
                        // label={serviceinput.fieldName}
                        value={serviceinput.id}
                        className="w-full "
                        onChange={(value) => {
                          console.log(value, "select value");
                          setForm({
                            ...form,
                            [serviceinput.id]: value,
                          });
                        }}
                      >
                        {serviceinput.serviceInputFieldValues.map((option) => (
                          <Option
                            className="w-full"
                            key={option.fieldValueName}
                            value={option.fieldValueName}
                            // onChange={(value) => {
                            //   setForm({
                            //     ...form,
                            //     [serviceinput.id]: value,
                            //   });
                            // }}
                          >
                            <div className="flex justify-between w-full">
                              <div>{option.fieldValueName}</div>
                              {/* <div>{" "+ " - "+" "}</div> */}
                              {/* <div>{option.price && option.price}</div> */}
                            </div>
                          </Option>
                        ))}
                      </Select>
                    </>
                  )}
                </div>
              );
            })}
        </div>
        <div className="mt-4 grid gap-4  grid-cols-2">
          <div className="flex flex-col gap-4 w-full">
            <Typography className="-mb-2" variant="h6">
              Service Date
            </Typography>

            <DayPicker
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={{ before: today }} 
              showOutsideDays
              className="border-0 flex justify-start "
              classNames={{
                caption: "flex justify-center py-2 mb-4 relative items-center",
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
                  <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                ),
                IconRight: ({ ...props }) => (
                  <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                ),
              }}
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <div>
              <Typography className="" variant="h6">
                Note
              </Typography>
              <Textarea
                label="note"
                // value={requestedCustomer.note}
                onChange={(e) => {
                  setForm({ ...form, ["note"]: e.target.value });
                }}
                id="note"
                type="text"
                size="lg"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex">
                <Typography className="text-lg text-cl-2">Amount</Typography>{" "}
                {!form.amount ? (
                  <Typography className="text-sm text-btn-danger">
                    * required
                  </Typography>
                ) : (
                  ""
                )}
              </div>
              <Input
                id="amount"
                type="number"
                name="amount"
                value={form.amount}
                onChange={(e) => {
                  setForm({ ...form, ["amount"]:parseFloat( e.target.value) });
                }}
                label="LKR"
                className=""
              />
            </div>
            <div className="w-32  outline-none mt-6">
              <Select
                value={offerType}
                onChange={(value) => setOfferType(value)}
                className=" outline-none border-none"
                label="Discount Type"
              >
                <Option value={false}>Precentage %</Option>
                <Option selected value={true}>
                  Price $
                </Option>
              </Select>
            </div>
            <Input
              id="offers"
              type="number"
              name="offers"
              value={form.offers}
              onChange={(e) => {
                setForm({ ...form, ["offers"]: e.target.value });
              }}
              label={offerType == true ? "LKR" : "%"}
              className=""
            />
            <div>
              <Typography className="text-lg text-cl-2">Payment</Typography>

              <Input
                id="payment"
                type="number"
                name="payment"
                value={
                  form.amount
                    ? form.offers
                      ? offerType
                        ? parseFloat(form.amount) - parseFloat(form.offers)
                        : parseFloat(form.amount) -
                          (parseFloat(form.offers) * parseFloat(form.amount)) /
                            100
                      : form.amount
                    : form.payment
                }
                onChange={(e) => {
                  setForm({ ...form, ["payment"]: e.target.value });
                }}
                label="LKR"
                className=""
              />
            </div>
          </div>
        </div>
        {error ?
          <div className="flex my-4 justify-center text-red-500">
{error}
          </div>:""
        }
        {added == 1 ? (
          ""
        ) : (
          <div className="flex justify-between mt-4 px-20">
            <Button className="bg-btn-warning text-lg" onClick={handleRemove}>
              Remove
            </Button>
            <Button
              onClick={handleRequestService}
              className="bg-btn-success text-lg"
            >
              Add
            </Button>
          </div>
        )}
      </AccordionBody>
    </Accordion>
  );
}

export default RequestService;
