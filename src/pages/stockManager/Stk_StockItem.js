import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { MagnifyingGlassIcon,  } from "@heroicons/react/24/outline";
import { Card, CardHeader, Input, Typography, Button, CardBody, Chip, CardFooter, Tabs, TabsHeader, Tab, Avatar, IconButton, Tooltip, Select, Option,Table } from "@material-tailwind/react";
import { stkItemList,stkItemTHead } from './Stk_components/data';
import Modal from './Stk_components/Modal';
import AddStockItemForm from './Stk_forms/AddStockItem';
import StockItemList from './Stk_Tables/StockitemList';

function StockItem() {
    const [isFormVisible, setFormVisible] = useState(false);

    const openForm = () => {
      setFormVisible(true);

    };
  
    const closeForm = () => {
      setFormVisible(false);
    };

    const [open, setOpen] = useState(false);
  const [stockItems, setStockItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 // const handleOpen = () => setOpen((cur) => !cur);

  const fetchStockItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/stockManager/stockItem");
      const { success, message, stockItems } = response.data;
      if (success) {
        setStockItems(stockItems);
      } else {
        setError(message);
      }
    } catch (error) {
      setError("Failed to fetch stock items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockItems();
  }, []);

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/stockManager/stockItem/${itemId}`);
      setStockItems(stockItems.filter((item) => item.itemId !== itemId));
      console.log("Successfully deleted stock item");
      alert("Successfully deleted stock item");
    } catch (error) {
      console.error("Error deleting stock item:", error);
    }
  };

  const handleEdit = async (itemId) => {
    try {
      //  fetch the stock item data to be edited
      const response = await axios.get(`http://localhost:5000/stockManager/stockItem/${itemId}`);
      const { success, message, item } = response.data;
      if (success) {
        // Handle the edit functionality using the fetched stock item data
        console.log("Editing stock item:", item);
      } else {
        console.error("Failed to fetch stock item details:", message);
      }
    } catch (error) {
      console.error("Error editing stock item:", error);
    }
  };

  const handleStockItemCreated = (newStockItem) => {
    // Add the newly created stock item to the list
    setStockItems([...stockItems, newStockItem]);
  };

  

    return (
        <div className='flex flex-col gap-10'>
            <div className='flex gap-10'>
            <div>
            
            {isFormVisible && (
              <Modal onClose={closeForm}>
                <AddStockItemForm onClose={closeForm} />
              </Modal>
             
            )}
          </div>
          <AddStockItemForm title={' Create Stock Item'} onClose={closeForm} />
                
                <Card className='w-full rounded'>
                    <div className=" flex p-4 gap-6 items-center">
                        <Select size="lg" label="Select By: GRN Id" className="z-10">
                            <Option>GRN Id</Option>
                            <Option>Date</Option>
                            <Option>Supplier Name</Option>
                            <Option>Item Id</Option>
                            <Option>Item Name</Option>
                        </Select>

                        <Input size="lg"
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        />
                    </div>
                </Card>
            </div>
            <div>
            <CardBody className="flex flex-col gap-4 bg-white rounded-md">
            <Typography variant="h4" color="blue-gray">
              Stock Item List
            </Typography>

            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <div className="overflow-auto">
                <table className="w-full text-left table-auto min-w-max">
                  <thead>
                    <tr>
                      <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Item ID</th>
                      <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Item Name</th>
                      <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Category Id</th>
                      <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Real Cost</th>
                      <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Cost</th>
                      <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Quantity</th>
                      <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Description</th>
                      <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Delete</th>
                      <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stockItems.map((item) => (
                      <tr key={item.itemId}>
                        <td className="p-4">{item.itemId}</td>
                        <td className="p-4">{item.itemName}</td>
                        <td className="p-4">{item.categoryId}</td>
                        <td className="p-4">{item.realCost}</td>
                        <td className="p-4">{item.cost}</td>
                        <td className="p-4">{item.quantity}</td>
                        <td className="p-4">{item.description}</td>
                        <td className="p-4">
                          <Button color="red" onClick={() => handleDelete(item.itemId)}>
                            Delete
                          </Button>
                        </td>
                        <td>
                          <Button color="blue" onClick={() => handleEdit(item.itemId)}>
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardBody>
            {/* <Table title="Stock Item" headerList={stkItemTHead} rowList={stkItemList}/> */}
            
        </div>
        </div>
    )
}

export default StockItem
