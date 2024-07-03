import Modal from "./Stk_components/Modal";
import AddStockItemUsage from "./Stk_forms/AddStockItemUsage.js";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Card, Input, CardBody, Typography } from "@material-tailwind/react";
import DeleteRecordButton from "../../components/buttons/DeleteRecordButton";
import EditRecordButton from "../../components/buttons/EditRecordButton";
import { Pagination } from "../../components/pagination/pagination";
import SmallCard from "../../components/cards/card";

function DashboardSmgr() {
  const [isFormVisible, setFormVisible] = useState(false);

  const closeForm = () => {
    setFormVisible(false);
  };

  const [stockItemUsage, setStockItemUsage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [stkItems, setStkItems] = useState([]);
  const [mode, setMode] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: "",
    itemId: "",
    quantity: "",
    returnQuantity:"",
    description: "",
  });
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [employees,setEmployees]= useState([]);  
  const [refresh, setRefresh] = useState(false);


  const triggerRefresh = () => {
    setRefresh((prev) => !prev); // Toggle the refresh state
  };


  useEffect(() => {
    fetchStockItemUsage();
  },[currentPage,searchQuery,refresh]);

  useEffect(() => {
    
    fetchItems();
    fetchEmployees();
  },[currentPage]);

const fetchStockItemUsage = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/stockManager/stockItemUsage?page=${currentPage}&limit=4`
      );

      const { success, message, stockItemUsage, totalPages } = response.data;
      console.log(response.data);
      if (success) {
        setStockItemUsage(stockItemUsage);
        setTotalPages(totalPages);
        if (stockItemUsage.length === 0) {
          setError("No stock items found");
        } else {
          setError(null);
        }
      } else {
        setError(message);
      }
    } catch (error) {
      setError("Failed to fetch return stock items");
    } finally {
      setLoading(false);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/stockManager/stockItem"
      );
      const { success, message, stockItems } = response.data;

      if (success) {
        setStkItems(stockItems); // Update the items state with fetched data
      } else {
        console.error("Failed to fetch stock Items:", message);
      }
    } catch (error) {
      console.error("Error fetching stock Items:", error);
    }
  };


  const addStockItemUsageToList = (newStockItemUsage) => {
    if (stockItemUsage.length === 4) {
      setCurrentPage(currentPage + 1);
    }
    setStockItemUsage([ newStockItemUsage,...stockItemUsage,]);
    triggerRefresh();
    setOpen(false);
  };

  const handleDelete = async (id) => {
    setMode(true);
    console.log(" deleted", id);

    try {
      await axios.delete(
        `http://localhost:5000/stockManager/stockItemUsage/${id}`
      );
      setStockItemUsage(stockItemUsage.filter((item) => item.id !== id));
      console.log("Successfully deleted item");
      alert("Successfully deleted stock item");
      triggerRefresh();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      // fetch the stock item data to be edited
      const response = await axios.get(
        `http://localhost:5000/stockManager/stockItemUsage/${id}`
      );
      const { success, message, stockItemUsage } = response.data;
     
      if (success) {
        setMode(true);
        handleOpen();
        setFormData(stockItemUsage)
        triggerRefresh(); 
       console.log(stockItemUsage)
        // Handle the edit functionality using the fetched stock item data
        console.log("Editing return stock item:", stockItemUsage);
      } else {
        console.error("Failed to fetch return Stock Item details:", message);
      }
    } catch (error) {
      console.error("Error editing return Stock item:", error);
    }
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  useEffect(() => {
    handleItemSearch();
  }, [searchQuery]);
  
  const handleItemSearch = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/stockManager/stockItemUsageSearch/?itemName=${searchQuery}`);

      if (data.success) {
        setStockItemUsage(data.StockItemUsage );
        console.log(data.StockItemUsage)
      } else {
        setError("No  items found");
      }
    } catch (error) {
      setError("Failed to search  items");
    }
  };
  
  const getItemName = (itemId) => {
    const item = stkItems.find((cat) => cat.id === itemId);
    return item ? item.itemName : "Unknown";
  };
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/employeeManager/getEmployeeSearch"
      );
      const { success, message, employees } = response.data;
      

       // Log the response to check the structure
      setEmployees(response.data);
      console.log(response.data)
      
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const getEmployeeName = (employeeId) => {
    const employee = employees.find((emp) => emp.id === employeeId);
    return employee ? employee.empName : "Unknown";
  };


  const handleOpenAdd = () => {
    setMode(false);
    handleOpen();
    setFormVisible(true);
    setFormData({
      employeeId: "",
      itemId: "",
      quantity: "",
      returnQuantity:"",
      description: "",
    });
  };

  const handleOpen = () => {
    setOpen((cur) => !cur);
  };


  

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-10">

        <AddStockItemUsage 
                    onClose={closeForm}
                    mode={mode}
                    formData={formData}
                    setFormData={setFormData}
                    handleClose={handleClose}
                    open={open}
                    handleOpen={handleOpen}
                    addStockItemUsageToList={addStockItemUsageToList} />

       
      </div>
      <SmallCard
        className="cursor-pointer"
        title={" Borrow Item"}
        onClick={handleOpenAdd}
        variant="gradient"
      />


      <CardBody className="flex flex-col gap-1 bg-white rounded-md">
      <div className="flex flex-row gap-1 justify-between">
        <Typography variant="h4" color="blue-gray">
          Stock Item Usage
        </Typography>
        <Card className="w-400 rounded">
          <div className="flex p-4 gap-6 items-center">

            <Input
              size="lg"
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </Card>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="overflow-auto mt-5">
            <Card className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white 
            shadow-md bg-clip-border rounded-xl mt-10">
              <table className="w-full text-left table-auto min-w-max">
                <thead>
                  <tr>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Employee Name
                      </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Item Name
                      </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Quantity
                      </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                      Return Quantity
                      </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                       Description
                      </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Delete
                      </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Edit
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stockItemUsage.map((item) => (
                    <tr key={item.id} className="even:bg-blue-gray-50/50">

                      <td className="p-4">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {getEmployeeName(item.employeeId)}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {getItemName(item.stockItemId)}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {item.quantity}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {item.returnQuantity}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {item.description}
                        </p>
                      </td>
                      <td>
                        <DeleteRecordButton onClick={() => handleDelete(item.id)} />
                      </td>
                      <td>
                        <EditRecordButton onClick={() => handleEdit(item.id)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
            <Pagination
                active={currentPage}
                setActive={setCurrentPage}
                total={totalPages}
              />
          </div>
        )}
      </CardBody>
    </div>
  );
}

export default DashboardSmgr;

