import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  Input,
  Typography,
  Button,
  Dialog,
} from "@material-tailwind/react";
import SmallCard from "../../components/cards/card";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../config/axios.config";
import Customerform from "./Components/customerform";
import {initialvalues} from "./initialValues/customer"
import TableOfCustomers from "./tableContents/TableOfCustomers"
import { ToastError } from "./ToastAlert";

function Customers() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(1);
  const [results, setResults] = useState(0);
  const [mode, setMode] = useState(false);

  const [customerList, setCustomerList] = useState([]); //customerlist
  const [selectedCustomer, setSelectedCustomer] = useState(initialvalues);
  const [search, setSearch] = useState(""); // search customer

 

  const handleOpen = () => setOpen((cur) => !cur);

  // add customer  handler
  const handleAdd = () => {
    console.log(selectedCustomer, "add");
    setSelectedCustomer(initialvalues);
    setMode(false);
    setOpen(true);
  };

  //edit customer handler
  const handleEdit = () => {
    console.log(selectedCustomer, "edit");
    setMode(true);
    setOpen(true);
  };

// search customer
  const handleSearch = async () => {
    console.log("searching begin",search);
    try {
      const { data } = await axiosInstance.get(
        `/customerManager/customer/?mobilePhone=${search}&page=${active}&limit=8`
      );
      if (!data) {
        ToastError("no customer exist")
      }
      console.log(data);
      setCustomerList(data.rows);
      setResults(data.count)
      setMode(false);
    } catch (error) {
      console.log(error);
      ToastError(error)
    }
  };

  useEffect(() => {
    console.log("search when page change");
    handleSearch();
    
  }, [active]);

  useEffect(() => {
    if (search !== "") {
      handleSearch();
      setActive(1)
      console.log("search when number change");
    }
  }, [search]);

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
            <Typography className="text-2xl">Customer</Typography>
            <div className="relative flex w-full max-w-[24rem] ">
              <Input
                type="text"
                label=" Mobile"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pr-20"
                containerProps={{
                  className: "min-w-0",
                }}
              />
              <Button
                size="sm"
                color={search ? "gray" : "blue-gray"}
                disabled={!search}
                className="!absolute right-0 bottom-0 rounded"
                onClick={handleSearch}
              >
                <MagnifyingGlassIcon className="h-6 w-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <TableOfCustomers 
      setActive={setActive}
      active={active}
      results={results}
      customerList={customerList}
      handleEdit={handleEdit}
      setSelectedCustomer={setSelectedCustomer}
      />
      <div>
        {/* below commented one for customer table */}
        <Dialog
          size="lg"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none"
        >
          <Customerform
            handleOpen={handleOpen}
            initialvalues={selectedCustomer}
            setCustomer={setSelectedCustomer}
            mode={mode}
            setSearch={setSearch}
            customers={customerList}
            setCustomers={setCustomerList}
            componentType={1}
          />
        </Dialog>
        
      </div>
    </div>
  );
}

export default Customers;




 {/* <Card className=" w-full border-2 rounded p-4">
          <CardBody className="overflow-scroll px-0 z-10">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customerList &&
                  customerList.map(
                    (
                      {
                        id,
                        firstname,
                        status,
                        email,
                        lastname,
                        mobilePhone,
                        address,
                      },
                      index
                    ) => {
                      const classes = "p-4 ";

                      return (
                        <tr key={id} onClick={() => {}}>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {(firstname ? firstname : "") +
                                    " " +
                                    (lastname ? lastname : "")}
                                </Typography>
                                
                              </div>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {email && email}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {mobilePhone && mobilePhone}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {address}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {status}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                                onClick={() => {
                                  handleEdit();
                                  setSelectedCustomer({
                                    id,
                                    firstname,
                                    status,
                                    email,
                                    lastname,
                                    mobilePhone,
                                    address,
                                  });
                                }}
                              >
                                <EditRecordButton />
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                                onClick={() => {
                                  handleEdit();
                                  setSelectedCustomer({
                                    id,
                                    firstname,
                                    status,
                                    email,
                                    lastname,
                                    mobilePhone,
                                    address,
                                  });
                                }}
                              >
                                <DeleteRecordButton />
                              </Typography>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography>{results} results</Typography>
            <div className="flex gap-2">
              <Pagination active={active} setActive={setActive} />
            </div>
          </CardFooter>
        </Card> */}