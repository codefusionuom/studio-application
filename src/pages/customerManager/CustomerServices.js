import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axios.config";
import {
  Button,
  Dialog
} from "@material-tailwind/react";
import DropdownTreeSelect from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";
import "./customerService.css";
import CustomerServiceform from "./Components/customerServiceform";
import CustomerServiceEditform from "./Components/customerServiceEditform";


function CustomerServices() {
  const [services, setServices] = useState({});
  const [service, setService] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const [mode, setMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [refresh, setRefreash] = useState(false);

  const handleOpen = () => setOpen((cur) => !cur);
  const handleOpenEdit = () => setOpenEdit((cur) => !cur);

  const handleRefresh = () => {setRefreash((cur) => !cur);setServices({})};

  // add handler
  const handleAdd = () => {
    setMode(false);
    handleOpen()
  };

  //edit handler
  const handleEdit = () => {

   setSelectedService(service)
   handleOpenEdit()
  };


  const fetchCategories = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/customerManager/service`
      );
      console.log(data);
      setServices(data);
    } catch (error) {
      console.log(error);
    }
  };

const handleDelete=async()=>{
  try {
    const data  = await axiosInstance.delete(
      `/customerManager/service/${service.value}`
    );
    console.log(data);
    handleRefresh()
  } catch (error) {
    console.log(error);
  }
}

  useEffect(() => {
    console.log("hello useeffect");
    fetchCategories()
  }, [refresh]);

  const onChangeTree = (currentNode, selectedNodes) => {
    // console.log('onChange::', currentNode, selectedNodes)
    setService(currentNode);
  };


  return (
    <div className="flex my-10 justify-between">
      <div className="flex gap-4 items-center">
        {service && (
          <div className="flex gap-4 bg-primary rounded px-2 text-white">
            <div className="text-xl">{service.label}</div>
            <div className="text-lg font-thin flex items-center" onClick={() => setService()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
            </div>
          </div>
        )}
        <div className="">
          <DropdownTreeSelect
            data={services}
            mode="radioSelect"
            onChange={onChangeTree}
            value={["searchme"]}
            className="mdl-demo"
          />
        </div>
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
        <Button className="bg-btn-danger" onClick={()=>{
          handleDelete()
        }}>DELETE</Button>
      </div>

      <Dialog
        size="xl"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <CustomerServiceform
          handleOpen={handleOpen}
          setRefreash={setRefreash}
          selectedService={selectedService}
          services={services}
          mode={mode}
        />
      </Dialog>
      <Dialog
        size="xl"
        open={openEdit}
        handler={handleOpenEdit}
        className="bg-transparent shadow-none"
      >
        <CustomerServiceEditform
          handleOpen={handleOpenEdit}
          setRefreash={setRefreash}
          selectedService={selectedService}
          services={services}
        />
      </Dialog>
    </div>
  );
}

export default CustomerServices;
