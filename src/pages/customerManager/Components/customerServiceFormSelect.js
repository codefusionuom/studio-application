import { Button, Input, List, ListItem } from "@material-tailwind/react";
import React, { useState } from "react";
import axiosInstance from "../../../config/axios.config";

function CustomerServiceFormSelect({ item, i ,setRefreash}) {
  const [selectoption, setSelectoption] = useState();
  const [selectoptionList, setSelectoptionList] = useState([]);

  const addOptionField = () => {
    if (selectoption === "") return;
    setSelectoptionList((prevList) => [...prevList, selectoption]);
    setSelectoption("");
  };


  const handleSelectOptionEdit = async () => {
    try {
        console.log(selectoptionList,"in edit",item);
        const { data } = await axiosInstance.put(
          `/customerManager/service/option/${item.fieldId}`,
           {selectoptionList }
        );
        console.log(data);
        setRefreash((cur) => !cur);

    } catch (error) {
      console.log(error);
    }
  }

  const removeOptionField = (item) => {
    setSelectoptionList(selectoptionList.filter((input) => input !== item));
  };


  return (
    <ListItem key={i} className="flex-col items-start  bg-blue-gray-50">
      <div className="w-full flex items-center justify-around ">
        <div className="font-semibold text-lg">{item.fieldName}</div>
        <div className="flex">
          <Input
            value={selectoption}
            onChange={(e) => setSelectoption(e.target.value)}
            label="Select Optins"
            id="selectoption"
            type="text"
            size="lg"
          />
          <Button
            onClick={() => {
              addOptionField();
            }}
          >
            Add
          </Button>
        </div>
      </div>
      <div className="w-full grid grid-cols-2">
        <div>
          <List>
            {item?.options &&
              item?.options.map((option, i) => {
                return (
                  <ListItem
                    key={i}
                    className="flex h-12 justify-between bg-blue-gray-300"
                  >
                    <div>{option.name}</div>

                    {/* <div>{option.price}</div> */}
                  </ListItem>
                );
              })}
          </List>
        </div>
        
        <div>
          <List>
            {selectoptionList &&
              selectoptionList.map((option, i) => {
                return (
                  <ListItem
                    key={i}
                    className="flex h-12 justify-between bg-blue-gray-100"
                  >
                    <div>{option}</div>
                    <div onClick={() => removeOptionField(option)}>
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
                    {/* <div>{option.price}</div> */}
                  </ListItem>
                );
              })}
          </List>

        </div>
        
      </div>
      <div className="flex w-full justify-end  py-10">
              <Button className="bg-btn-info" onClick={handleSelectOptionEdit}>Edit</Button>
        </div>
    </ListItem>
  );
}

export default CustomerServiceFormSelect;
