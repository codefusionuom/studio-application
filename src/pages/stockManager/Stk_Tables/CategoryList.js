import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  Card,
  CardBody,
  Typography,
  Input,
} from "@material-tailwind/react";
import Card3 from "../../../components/cards/Card3";
import DeleteRecordButton from "../../../components/buttons/DeleteRecordButton";
import EditRecordButton from "../../../components/buttons/EditRecordButton";
import { Pagination } from "../../../components/pagination/pagination";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function CategoryList({ title }) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpen = () => setOpen((cur) => !cur);

  useEffect(() => {
    if (!searchQuery) {
      fetchCategories();
    } else {
      categorySearch();
    }
  }, [currentPage, searchQuery]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/stockManager/categoryList?page=${currentPage}&limit=5`
      );
      const { success, message, categories, total_pages } = response.data;
      if (success) {
        setCategories(categories); 
        setTotalPages(total_pages); // Update to match the API response key for total pages
      } else {
        setError(message);
      }
    } catch (error) {
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/stockManager/category/${id}`);
      setCategories(categories.filter((category) => category.id !== id));
      console.log("Successfully deleted category");
      alert("Successfully deleted category");
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      // Implement your logic to fetch the category data to be edited
      const response = await axios.get(
        `http://localhost:5000/stockManager/category/${id}`
      );
      const { success, message, category } = response.data;
      if (success) {
        // Handle the edit functionality using the fetched category data
        console.log("Editing category:", category);
      } else {
        console.error("Failed to fetch category details:", message);
      }
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const categorySearch = async () => {
    setLoading(true);
    try {
      console.log("Search query", searchQuery);
      const response = await axios.get(
        `http://localhost:5000/stockManager/categorySearch/?search=${searchQuery}`
      );
      console.log("Searching frontend", response);
      const { success, Categories } = response.data;
      console.log(Categories)
      if (success) {
        setCategories(Categories); 
      } else {
        setCategories([]); // Set to empty array if no categories found
        setError("No categories found");
      }
    } catch (error) {
      console.log("Error searching for categories:", error);
      setError("Failed to search categories");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card3
        title="Category List"
        className="cursor-pointer bg-blue-700 text-white text-lg w-fix"
        onClick={handleOpen}
      >
        {title}
      </Card3>

      <Dialog
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none w-full h-full flex items-center justify-center"
      >
        <Card className="mx-auto w-fix max-h-[70vh] h-[70vh] max-w-[150vh] w-[150vh] overflow-hidden">
          <CardBody className="flex flex-col gap-4 h-full">
            <div className="flex flex-row justify-between">
              <Typography variant="h4" color="blue-gray">
                Category List
              </Typography>
              <Card className="w-400 rounded">
                <div className="flex p-4 gap-6 items-center">
                  <Input
                    size="lg"
                    label="Search by Category Name"
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
              <div className="overflow-auto flex-grow h-[70vh]">
                <Card className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md bg-clip-border rounded-xl mt-10">
                  <table className="w-full text-left table-auto min-w-max">
                    <thead>
                      <tr>
                        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                          <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Category Name
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
                        {/* <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                          <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                            Edit
                          </p>
                        </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category, index) => (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "bg-blue-gray-50" : "bg-white"}
                        >
                          <td className="p-4">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                              {category.categoryName}
                            </p>
                          </td>
                          <td className="p-4">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                              {category.description}
                            </p>
                          </td>
                          <td className="p-4">
                            <DeleteRecordButton onClick={() => handleDelete(category.id)} />
                          </td>
                          {/* <td className="p-4">
                            <EditRecordButton onClick={() => handleEdit(category.id)} />
                          </td> */}
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
        </Card>
      </Dialog>
    </>
  );
}

export default CategoryList;
