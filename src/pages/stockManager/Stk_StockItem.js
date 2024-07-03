import React, { useState, useEffect } from "react";
import axios from "axios";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  Input,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import Modal from "./Stk_components/Modal";
import AddStockItemForm from "./Stk_forms/AddStockItem";
import EditRecordButton from "../../components/buttons/EditRecordButton";
import DeleteRecordButton from "../../components/buttons/DeleteRecordButton";
import AddCategoryForm from "./Stk_forms/AddCategoryForm";
import CategoryList from "./Stk_Tables/CategoryList";
import SmallCard from "../../components/cards/card";
import { Pagination } from "../../components/pagination/pagination";

function StockItem() {
  const [isFormVisible, setFormVisible] = useState(false);
  const [stockItems, setStockItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    itemName: "",
    categoryId: "",
    cost: "",
    description: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(""); // New state for categoryId

  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchStockItems();
    fetchCategories();
  }, [currentPage]);

  const fetchStockItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/stockManager/stockItem?page=${currentPage}&limit=4`
      );
      const { success, message, stockItems, totalPages } = response.data;
      if (success) {
        setStockItems(stockItems);
        setTotalPages(totalPages);
      } else {
        setError(message);
      }
    } catch (error) {
      setError("Failed to fetch stock items");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/stockManager/categoryList");
      const { success, message, categories } = response.data;
      if (success) {
        setCategories(categories);
      } else {
        console.error("Failed to fetch categories:", message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const addStockItemToList = (newStockItem) => {
    if (stockItems.length === 4) {
      setCurrentPage(currentPage + 1);
    }
    const existingIndex = stockItems.findIndex((item) => item.id === newStockItem.id);
    if (existingIndex !== -1) {
      const updatedStockItems = [...stockItems];
      updatedStockItems[existingIndex] = newStockItem;
      setStockItems(updatedStockItems);
    } else {
      setStockItems([newStockItem, ...stockItems]);
    }
  };

  const handleDelete = async (id) => {
    setMode(true);
    try {
      await axios.delete(`http://localhost:5000/stockManager/stockItem/${id}`);
      const updatedStockItems = stockItems.filter((item) => item.id !== id);

      if (updatedStockItems.length < 4 && currentPage < totalPages) {
        const response = await axios.get(
          `http://localhost:5000/stockManager/stockItem?page=${currentPage + 1}&limit=1`
        );
        const { success, stockItems: newStockItems } = response.data;
        if (success && newStockItems.length > 0) {
          updatedStockItems.push(newStockItems[0]);
        }
      }

      setStockItems(updatedStockItems);
      console.log("Successfully deleted stock item");
      alert("Successfully deleted stock item");

      if (updatedStockItems.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error("Error deleting stock item:", error);
      alert("Can't Delete Foreign constraint")
    }
  };

  const handleEdit = async (id) => {
    console.log(id);
    try {
      const response = await axios.get(
        `http://localhost:5000/stockManager/stockItem/${id}`
      );
      const { success, message, stockItem } = response.data;
      if (success) {
        setMode(true);
        handleOpen();
        setFormData(stockItem);
        console.log("Editing stock item:", stockItem);
      } else {
        console.error("Failed to fetch stock item details:", message);
      }
    } catch (error) {
      console.error("Error editing stock item:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
  };

  useEffect(() => {
    stockItemSearch();
  }, [searchQuery, categoryId]);

  const stockItemSearch = async () => {
    if (!searchQuery && !categoryId) {
      fetchStockItems();
      return;
    }

    try {
      const params = {
        search: searchQuery || '',
        categoryId: categoryId || ''
      };

      const { data } = await axios.get('http://localhost:5000/stockManager/stockItem/', { params });
      const { success, stockItems } = data;
      if (success) {
        setStockItems(stockItems);
      } else {
        setError("No stock items found");
      }
    } catch (error) {
      console.log("Error searching for stock items:", error);
      setError("Failed to search stock items");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredStockItems = stockItems.filter((item) =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase())&&
  (categoryId ? item.categoryId === parseInt(categoryId) : true)
  );

  const handleOpenAdd = () => {
    setMode(false);
    handleOpen();
  };

  const handleOpen = () => {
    setOpen((cur) => !cur);
  };

  const closeForm = () => {
    setFormVisible(false);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.categoryName : "Unknown";
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-row gap-5">
        <div>
          {isFormVisible && (
            <Modal onClose={closeForm}>
              <AddCategoryForm onClose={closeForm} />
            </Modal>
          )}
        </div>
        <AddCategoryForm title={"Add New Category"} onClose={closeForm} />

        <div>
          <AddStockItemForm
            title={"Add Stock Item"}
            onClose={closeForm}
            mode={mode}
            formData={formData}
            setFormData={setFormData}
            handleClose={handleClose}
            open={open}
            handleOpen={handleOpen}
            addStockItemToList={addStockItemToList}
          />
        </div>
        <SmallCard
          className="cursor-pointer"
          title={"Add Stock Item"}
          onClick={handleOpenAdd}
        />
        <div className="mb-10">
          {isFormVisible && (
            <Modal onClose={closeForm}>
              <CategoryList onClose={closeForm} />
            </Modal>
          )}
          <CategoryList title={"Category List"} onClose={closeForm} />
        </div>
      </div>

      <div>
        <CardBody className="flex flex-col gap-1 bg-white rounded-md">
          <div className="flex flex-row gap-1 justify-between">
            <Typography variant="h4" color="blue-gray">
              Stock Item List
            </Typography>
            <Card className="w-400 rounded">
              <div className="flex p-4 gap-6 items-center">
                <Input
                  size="lg"
                  label="Search by Item Name"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <select
                  value={categoryId}
                  onChange={handleCategoryChange}
                  className="border rounded p-2"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>
            </Card>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <div className="overflow-auto">
              <Card className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md bg-clip-border rounded-xl mt-10">
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
                          Category
                        </p>
                      </th>
                      <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                          Price
                        </p>
                      </th>
                      <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                          Description
                        </p>
                      </th>
                      <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                          Quantity
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
                    {filteredStockItems.map((item) => (
                      <tr key={item.id} className="even:bg-blue-gray-50/50">
                        <td className="p-4">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {item.itemName}
                          </p>
                        </td>
                        <td className="p-4">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {getCategoryName(item.categoryId)}
                          </p>
                        </td>
                        <td className="p-4">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {item.cost}
                          </p>
                        </td>
                        <td className="p-4">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {item.description}
                          </p>
                        </td>
                        <td className="p-4">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {item.quantity}
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
    </div>
  );
}

export default StockItem;
