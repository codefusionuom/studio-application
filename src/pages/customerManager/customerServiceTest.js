import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axios.config";
import {
  Button,
  Dialog,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";
import "./customerService.css";
import CustomerServiceform from "./Components/customerServiceform";

const categoriesData = {
  label: "search me",
  value: "searchme",
  children: [
    {
      label: "search me too",
      value: "searchmetoo",
      children: [
        {
          label: "No one can get me",
          value: "anonymous",
        },
      ],
    },
  ],
};

function CustomerServices() {
  const [service, setService] = useState();
  const [extraFeild, setExtraFeild] = useState({ label: "" });
  const [form, setForm] = useState();
  const [categories, setCategories] = useState(categoriesData);
  //const [category, setCategory] = useState(categoriesData);

  const [mode, setMode] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  // add handler
  const handleAdd = () => {
    //console.log(customer, "add");
    // setCustomer(initialvalues)
    setMode(false);
    setOpen(true);
  };
  //edit handler
  const handleEdit = () => {
    // console.log(customer, "edit");
    setMode(true);
    setOpen(true);
  };

  const { label } = extraFeild;
  const handleSearch = async () => {
    try {
      console.log("try customer service");
      const { data } = await axiosInstance.get(
        `/customerManager/customerService/16`
      );

      console.log(data);
      setService(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    console.log(form);
  };

  const handleExtraFeild = () => {
    // setForm({...form,[i]:e.target.value})}
    // setForm({...form,[extraFeild.label]:extraFeild.data})
    setService((prevService) => {
      return {
        ...prevService,
        inputFields: [...prevService.inputFields, extraFeild.label],
      };
    });
    setExtraFeild({ label: "" });
  };

  const clearExtraFeild = () => {
    console.log("clear");
    setExtraFeild({ label: "" });
  };

  const fetchCategories = async () => {
    try {
      // console.log("try",status);
      const { data } = await axiosInstance.get(
        `/customerManager/customerService`
      );
      console.log(data);
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  let category;
  const onChange = (currentNode, selectedNodes) => {
    console.log("onChange::", currentNode, selectedNodes);
    //setCategory(currentNode)
    category = currentNode;
  };
  const onAction = (node, action) => {
    console.log("onAction::", action, node);
  };
  const onNodeToggle = (currentNode) => {
    console.log("onNodeToggle::", currentNode);
  };
  console.log(category);

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <DropdownTreeSelect
            data={categories}
            mode="radioSelect"
            onChange={onChange}
            onAction={onAction}
            onNodeToggle={onNodeToggle}
            className="mdl-demo"
          />
        </div>
        <div className="flex flex-col gap-10">
          <Button
            className="bg-btn-success"
            onClick={() => {
              handleAdd();
            }}
          >
            ADD
          </Button>
          <Button
            className="bg-btn-info"
            onClick={() => {
              handleEdit();
            }}
          >
            EDIT
          </Button>
          <Button className="bg-btn-danger">DELETE</Button>
        </div>
      </div>
      <div
        className="bg-btn-info px-2 py-2 flex justify-center w-60 text-cl-4 text-lg rounded border-2 border-white"
        onClick={handleSearch}
      >
        Customer service
      </div>
      <div className="my-10">{service && service.serviceName}</div>
      <div>
        {service &&
          service.inputFields.map((i) => {
            console.log(i);
            return (
              <div className="flex flex-col gap-6 my-4">
                <Typography className="-mb-2" variant="h6">
                  {i}
                </Typography>
                <Input
                  label={i}
                  name={i}
                  onChange={(e) => {
                    setForm({ ...form, [i]: e.target.value });
                  }}
                />
              </div>
            );
          })}
      </div>
      <div>
        {service &&
          service.selectFields.map((item) => {
            const fieldName = Object.keys(item)[0]; // Get the field name (e.g., 'day' or 'paymentType')
            const options = item[fieldName]; // Get the array of options for the field
            return (
              <div className="flex flex-col gap-6 my-4">
                <Typography className="-mb-2" variant="h6">
                  {fieldName}
                </Typography>
                <Select
                  defaultValue={"select" + fieldName}
                  style={{ width: 200 }}
                  onChange={(value) => setForm({ ...form, [fieldName]: value })}
                >
                  {options.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </div>
            );
          })}
      </div>
      <div>
        <div className="flex flex-col gap-6 my-4">
          <Typography className="-mb-2" variant="h6">
            Label
          </Typography>
          <Input
            label={"Label"}
            name={"Label"}
            value={label}
            onChange={(e) => {
              setExtraFeild({ ...extraFeild, label: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-col gap-6 my-4"></div>
      </div>
      <div
        className="flex justify-center text-2xl bg-blue-gray-600 p-2 rounded w-40 m-6 text-black"
        onClick={handleExtraFeild}
      >
        Add
      </div>
      <div
        className="flex justify-center text-2xl bg-blue-gray-600 p-2 rounded w-40 m-6 text-black"
        onClick={clearExtraFeild}
      >
        Clear
      </div>
      <div
        onClick={handleSubmit}
        className="bg-btn-success rounded p-2 w-40 flex justify-center text-white"
      >
        Submit
      </div>
      {/* <Dialog
          size="xl"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none"
        >
          <CustomerServiceform
            handleOpen={handleOpen}
           // initialvalues={customer}
            categories={categories}
            mode={mode}
          />
        </Dialog> */}
    </div>
  );
}

export default CustomerServices;
