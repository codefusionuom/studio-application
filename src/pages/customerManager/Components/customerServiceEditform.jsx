import {
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
  Button,
  ListItem,
  List,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../config/axios.config";
import DropdownTreeSelect from "react-dropdown-tree-select";
import { initialCustomerService } from "../initialValues/customerService";
import CustomerServiceFormSelect from "./customerServiceFormSelect";

function CustomerServiceEditform({
  handleOpen,
  services,
  selectedService,
  setRefreash,
}) {
  const [customerService, setCustomerService] = useState(
    selectedService || initialCustomerService
  );
  const [inputfield, setInputfield] = useState();
  const [inputfieldList, setInputfieldList] = useState([]);
  const [selectfieldList, setSelectfieldList] = useState([]);
  const [selectfield, setSelectfield] = useState();
  const [newselectfields, setNewSelectfields] = useState([]);
  const [selectoption, setSelectoption] = useState();
  const [selectoptionName, setSelectoptionName] = useState();
  const [error, setError] = useState();
  const [service, setService] = useState(null);
  const {
    id,
    serviceName,
    description,
    inputFields,
    selectFields,
    price,
    parentService,
  } = customerService;


  const onChangeTree = (currentNode, selectedNodes) => {
    console.log("onChange::", currentNode, selectedNodes);
    setService(currentNode);
  };

  const handleServiceEdit= async () =>{
    if(!serviceName){
      setError("Service error required")
      return
    }

    try {
      // console.log("try",status);

        console.log(customerService,"in edit");
        const { data } = await axiosInstance.put(
          `/customerManager/service/service/${id}`,
          {   serviceName,price:parseFloat(price),
            description, parentService: service?.value }
        );
        console.log(data);
        setRefreash((cur) => !cur);
        // handleOpen();

    } catch (error) {
      console.log(error);
    }
  }
  const handleInputEdit = async () => {
    try {
      // console.log("try",status);

        console.log(inputfieldList,"in edit");
        const { data } = await axiosInstance.put(
          `/customerManager/service/input/${id}`,
          {  inputfieldList }
        );
        console.log(data);
        setRefreash((cur) => !cur);
        // handleOpen();

    } catch (error) {
      console.log(error);
    }
  }

  const handleSelectEdit = async () => {
    try {
      // console.log("try",status);

        console.log(newselectfields,"in edit");
        const { data } = await axiosInstance.put(
          `/customerManager/service/select/${id}`,
          {  newselectfields }
        );
        console.log(data);
        setRefreash((cur) => !cur);
        // handleOpen();

    } catch (error) {
      console.log(error);
    }
  }




  const fetchCustomerServices = async () => {
    try {
      // console.log("try",status);
      const { data } = await axiosInstance.get(
        `/customerManager/service/${selectedService.value}`
      );
      console.log(data);
      const {
        id,
        serviceName,
        description,
        serviceInputFields,
        price,
        parentService,
      } = data;

      const inputFields = serviceInputFields
  .filter(field => field.type === 'input')
  .map(field => field.fieldName);

  setService((services
    .filter(s => s.value === parentService))[0])

  const selectFields = serviceInputFields
  .filter(field => field.type === 'select')
  .map(field => ({
    fieldName: field.fieldName,
    fieldId:field.id,
    options: field.serviceInputFieldValues.map(value => ({
      name: value.fieldValueName,
      price: value.price,
     
    }))
  }));

      setCustomerService({
        id,
        serviceName,
        description,
        inputFields,
        selectFields,
        price,
        parentService,
      });
    } catch (error) {
      console.log(error);
    }
  };


  //input field
  const addInputField = () => {
    if (inputfield === "") return;
    setInputfieldList((prevList) => [...prevList, inputfield]);
    setInputfield("");
  };

  const removeInputField = (item) => {
    setInputfieldList(
      inputfieldList.filter(
        (input) => input !== item
      )
    );
  };

  const addSelectField = () => {
    if (selectfield === "") return;
    const newField = { [selectfield]: [] };
    console.log(newField);
    setNewSelectfields([newField,...newselectfields],
    );
    setSelectfield("");
  };

  const removeSelectField = (itemToRemove) => {
    setNewSelectfields(newselectfields.filter(
        (item) => !Object.keys(item).includes(itemToRemove)
      ));
  };

  const addSelectOptionField = (item) => {
    // if (selectoption === "") return;
    // setSelectoption({
    //   ...selectoption,
    //   ["name"]: selectoptionName,
    // });
    console.log(item,selectoption);
    const updatedSelectFields = newselectfields.map((field) => {
      if (field.hasOwnProperty(item)) {
        // If the field already exists, update its options array
        return { [item]: [...field[item], {name:selectoptionName}] };
      }
      return field;
    });
    setNewSelectfields(updatedSelectFields);
    setSelectoption("");
    setSelectoptionName("")
  };

  const removeSelectOption = (itemToRemove, selectoptionToRemove) => {
    //console.log("Updated select fields:", updatedSelectFields);
    //console.log("Updated select fields:", updatedSelectFields);
    let newoptions = [];
    const options = newselectfields.map((field) => {
      console.log(field, "fields", Object.keys(field), Object.entries(field));
      if (Object.keys(field).includes(selectoptionToRemove)) {
        console.log(Object.entries(field)[0][1], "options");
        newoptions = Object.entries(field)[0][1].filter(
          (value) => value !== itemToRemove
        );
      }
    });
    console.log(newoptions);
    let updatedSelectFields = newselectfields.map((field) => {
      if (Object.keys(field).includes(selectoptionToRemove)) {
        return { [selectoptionToRemove]: newoptions };
      }
      return field;
    });

    setNewSelectfields(updatedSelectFields);

    console.log(selectedService, "thi is the selected service");
    // const newField = { [selectoptionToRemove]:newoptions };
    // setCustomerService({
    //     ...customerService,
    //     selectFields: [newField, ...customerService.selectFields],
    //   });
  };

  console.log(selectFields);
  useEffect(() => {
    console.log(selectedService, "thi is the selected service");
      fetchCustomerServices();
    
  }, []);

  return (
    <div>
      <Card className="mx-auto h-[50rem] w-full overflow-scroll p-8">
        <div>
          <div className="bg-bg p-4 my-4  flex justify-between rounded">
            <Typography className="font-Lato text-4xl font-normal font-500">
              Service Information
            </Typography>

          </div>
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-4">
              <Typography className="-mb-2" variant="h6">
                Service Name
              </Typography>
              <Input
                label="Service Name"
                id="serviceName"
                type="text"
                name="serviceName"
                value={serviceName}
                onChange={(e) =>
                  setCustomerService({
                    ...customerService,
                    serviceName: e.target.value,
                  })
                }
                size="lg"
              />
            </div>
            <div className="flex flex-col gap-4">
              <Typography className="-mb-2" variant="h6">
                Description
              </Typography>
              <Input
                label="Description"
                id="description"
                type="text"
                name="description"
                value={description}
                onChange={(e) =>
                  setCustomerService({
                    ...customerService,
                    description: e.target.value,
                  })
                }
                size="lg"
              />
            </div>
            <div className="flex flex-col gap-4">
              <Typography className="-mb-2" variant="h6">
                Parent Category : {service?.label}
              </Typography>
              <div className="flex gap-4 items-center">
                {service && (
                  <div className="flex gap-4 bg-primary rounded px-2 text-white">
                    <div className="text-xl">{service.label}</div>
                    <div
                      className="text-lg font-thin flex items-center"
                      // onClick={() => setService()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                )}
                <div className="">
                  <DropdownTreeSelect
                    data={services}
                    mode="radioSelect"
                    onChange={onChangeTree}
                    // onAction={onAction}
                    // onNodeToggle={onNodeToggle}
                    value={["searchme"]}
                    className="mdl-demo"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Typography className="-mb-2" variant="h6">
                Price
              </Typography>
              <Input
                label="Price"
                id="lastname"
                type="number"
                name="price"
                value={price}
                onChange={(e) =>
                  setCustomerService({
                    ...customerService,
                    price: e.target.value,
                  })
                }
                size="lg"
              />
            </div>
            </div>
            <div className="text-red-500 flex justify-center">{error ? error : ""}</div>
            <div className="flex justify-end px-20 py-10">
              <Button className="bg-btn-info" onClick={handleServiceEdit}>Edit</Button>
            </div>
        </div>
        <div>
          <div className="bg-bg p-4 my-4  flex justify-between rounded">
            <Typography className="font-Lato text-4xl font-normal font-500">
              Input Fields
            </Typography>
          </div>
          <div>
          <List>
                  {inputFields &&
                    inputFields.map((item, i) => {
                      return (
                        <ListItem
                          key={i}
                          className="flex justify-between bg-blue-gray-100"
                        >
                        
                          <div>{item}</div>
                          
                        </ListItem>
                      );
                    })}
                </List>
          </div>
          <div>
          <div className="flex gap-4">
                <Input
                  value={inputfield}
                  onChange={(e) => setInputfield(e.target.value)}
                  label="Input Fields"
                  id="Input Fields"
                  type="text"
                  size="lg"
                />
                <Button onClick={addInputField}>Add</Button>
              </div>
          </div>
          <div>
          <List>
                  {inputfieldList &&
                    inputfieldList.map((item, i) => {
                      return (
                        <ListItem
                          key={i}
                          className="flex justify-between bg-blue-gray-100"
                        >
                         
                          <div>{item}</div>
                          <div onClick={() => removeInputField(item)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                              />
                            </svg>
                          </div>
                        </ListItem>
                      );
                    })}
                </List>

          </div>
          <div className="flex justify-end px-20 py-10">
              <Button className="bg-btn-info" onClick={handleInputEdit}>Edit</Button>
            </div>
        </div>
        <div>
          <div className="bg-bg p-4 my-4  flex justify-between rounded">
            <Typography className="font-Lato text-4xl font-normal font-500">
              Select  Fields
            </Typography>
          </div>
          <div>
            
          <List>
                  {selectFields &&
                    selectFields.map((item, i) => {
                      return (
                        <CustomerServiceFormSelect item={item} i={i}/>
                      );
                    })}
                </List>
          </div>
          <div>
          <div className="flex flex-col gap-4">
              <Typography className="-mb-2" variant="h6">
                Select Fields
              </Typography>
              <div className="flex gap-4">
                <Input
                  value={selectfield}
                  onChange={(e) => setSelectfield(e.target.value)}
                  label="Select Fields"
                  id="selectfield"
                  type="text"
                  size="lg"
                />
                <Button onClick={addSelectField}>Add</Button>
              </div>
              <div className="h-60 overflow-scroll">
                <List>
                  {newselectfields &&
                    newselectfields.map((field, i) => {
                      return (
                        <ListItem className="flex flex-col bg-blue-gray-100 gap-4 ">
                          <div key={i} className="flex justify-between  w-full">
                            {Object.entries(field).map(([item, value]) => (
                              <div className="w-full flex flex-col  gap-4">
                                <div
                                  key={item}
                                  className="flex justify-between"
                                >
                                  <div>{item}</div>
                                  <div onClick={() => removeSelectField(item)}>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor"
                                      class="w-6 h-6"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6 18 18 6M6 6l12 12"
                                      />
                                    </svg>
                                  </div>
                                </div>
                                <div className="flex justify-center items-center  gap-4 w-full">
                                  <Input
                                    value={selectoptionName}
                                    // onChange={(e) =>
                                    //   setSelectoption(e.target.value)
                                    // }
                                    onChange={(e) => {
                                      setSelectoptionName( e.target.value);
                                    }}
                                    label="Select Optins"
                                    id="selectoption"
                                    type="text"
                                    size="lg"
                                  />
                                  {/* <Input
                                    // value={selectoption}
                                    // onChange={(e) =>
                                    //   setSelectoption(e.target.value)
                                    // }
                                    onChange={(e) => {
                                      setSelectoption({
                                        ...selectoption,
                                        ["value"]: e.target.value,
                                      });
                                    }}
                                    label="Select Optins"
                                    id="selectoption"
                                    type="text"
                                    size="lg"
                                  /> */}
                                  <Button
                                    onClick={() => addSelectOptionField(item)}
                                  >
                                    Add
                                  </Button>
                                </div>
                                <List>
                                  {value.map((option, itemIndex) => (
                                    <ListItem
                                      key={itemIndex}
                                      className="flex w-full justify-between bg-blue-gray-300"
                                    >
                                      <div className="flex justify-around w-full">
                                        <div>{option.name} </div>{" "}
                                        <div>{option.value} </div>{" "}
                                      </div>
                                      <div
                                        onClick={() =>
                                          removeSelectOption(option, item)
                                        }
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke-width="1.5"
                                          stroke="currentColor"
                                          class="w-6 h-6"
                                        >
                                          <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M6 18 18 6M6 6l12 12"
                                          />
                                        </svg>
                                      </div>
                                    </ListItem>
                                  ))}
                                </List>
                              </div>
                            ))}
                          </div>
                        </ListItem>
                      );
                    })}
                </List>
              </div>
            </div>
          </div>
          <div className="flex justify-end px-20 py-10">
              <Button className="bg-btn-info" onClick={handleSelectEdit}>Edit</Button>
            </div>
        </div>
      </Card>
    </div>
  );
}

export default CustomerServiceEditform;
