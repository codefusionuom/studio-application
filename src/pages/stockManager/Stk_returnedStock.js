import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Card, Input, CardBody, Typography } from "@material-tailwind/react";
import AddReturnStockForm from "./Stk_forms/AddReturnStockForm";
import Modal from "./Stk_components/Modal";
import axios from "axios";
import DeleteRecordButton from "../../components/buttons/DeleteRecordButton";
import EditRecordButton from "../../components/buttons/EditRecordButton";
import { Pagination } from "../../components/pagination/pagination";
import SmallCard from "../../components/cards/card";

function ReturnedStock() {
  const [isFormVisible, setFormVisible] = useState(false);

  const closeForm = () => {
    setFormVisible(false);
  };

  const [returnedStock, setReturnedStock] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [stkItems, setStkItems] = useState([]);
  const [mode, setMode] = useState(false);
  const [formData, setFormData] = useState({
    itemId: "",
    price: "",
    quantity: "",
    date: "",
    description: "",
  });
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchReturnedStocks();
    fetchItems();
  },[currentPage]);

  const fetchReturnedStocks = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:5000/stockManager/returnStockItem?page=${currentPage}&limit=4`;
      if (searchQuery) {
        url += `&searchQuery=${searchQuery}`;
      }
      const response = await axios.get(url);
      const { success, message, returnItems, totalPages } = response.data;

      if (success) {
        setReturnedStock(returnItems);
        setTotalPages(totalPages);
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


  const addReturnedStockToList = (newReturnedStock) => {
    if (returnedStock.length === 4) {
      setCurrentPage(currentPage + 1);
    }
    setReturnedStock([ newReturnedStock,...returnedStock,]);
  };

  const handleDelete = async (id) => {
    setMode(true);
    console.log(" deleted", id);

    try {
      await axios.delete(
        `http://localhost:5000/stockManager/returnStockItem/${id}`
      );
      setReturnedStock(returnedStock.filter((item) => item.id !== id));
      console.log("Successfully deleted item");
      alert("Successfully deleted stock item");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      // fetch the stock item data to be edited
      const response = await axios.get(
        `http://localhost:5000/stockManager/returnStockItem/${id}`
      );
      const { success, message, returnItems } = response.data;
     
      if (success) {
        setMode(true);
        handleOpen();
        setFormData(returnItems)
       console.log(returnItems)
        // Handle the edit functionality using the fetched stock item data
        console.log("Editing return stock item:", returnItems);
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
    returnItemSearch();
  }, [searchQuery]);

  const returnItemSearch = async () => {
    if (!searchQuery) {
      setCurrentPage(1); // Reset to first page when performing a new search
    fetchReturnedStocks();
      return;
    }
    try {
      const { data } = await axios.get(
        `http://localhost:5000/stockManager/returnStockItem/?itemName=${searchQuery}`
      );
      const { success, returnItems } = data;
      if (success) {
        setReturnedStock(returnedStock);
      } else {
        setError("No stock items found");
      }
    } catch (error) {
      console.log("Error searching for stock items:", error);
      setError("Failed to search stock items");
    }
  };
  const getItemName = (itemId) => {
    const item = stkItems.find((cat) => cat.id === itemId);
    return item ? item.itemName : "Unknown";
  };

  const handleOpenAdd = () => {
    setMode(false);
    handleOpen();
    setFormVisible(true);
    setFormData({
      itemId: "",
      price: "",
      quantity: "",
      date: "",
      description: "",
    });
  };

  const handleOpen = () => {
    setOpen((cur) => !cur);
  };

  

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-10">
        <div>
          {isFormVisible && (
            <Modal onClose={closeForm}>
              <AddReturnStockForm onClose={closeForm} />
            </Modal>
          )}
        </div>
        <AddReturnStockForm 
                    onClose={closeForm}
                    mode={mode}
                    formData={formData}
                    setFormData={setFormData}
                    handleClose={handleClose}
                    open={open}
                    handleOpen={handleOpen}
                    addReturnedStockToList={addReturnedStockToList} />

       
      </div>
      <SmallCard
        className="cursor-pointer"
        title={"  Add Return Stock Item"}
        onClick={handleOpenAdd}
        variant="gradient"
      />


      <CardBody className="flex flex-col gap-1 bg-white rounded-md">
      <div className="flex flex-row gap-1 justify-between">
        <Typography variant="h4" color="blue-gray">
          Returned Stock List
        </Typography>
        <Card className="w-400 rounded">
          <div className="flex p-4 gap-6 items-center">

            <Input
              size="lg"
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" onClick={returnItemSearch}/>}
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
                        Item Name
                      </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Price
                      </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Quantity
                      </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Date
                      </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Reason
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
                  {returnedStock.map((item) => (
                    <tr key={item.id} className="even:bg-blue-gray-50/50">
                      <td className="p-4">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {getItemName(item.itemId)}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {item.price}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {item.quantity}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {item.date ? new Date(item.date).toLocaleDateString() : "N/A"}
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

export default ReturnedStock;
