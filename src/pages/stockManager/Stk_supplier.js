import React, { useEffect, useState } from "react";
import axios from "axios";
import AddSupplier from "./Stk_forms/AddSupplier";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Card, Input, Typography, CardBody } from "@material-tailwind/react";
import DeleteRecordButton from "../../components/buttons/DeleteRecordButton";
import EditRecordButton from "../../components/buttons/EditRecordButton";
import SmallCard from "../../components/cards/card";
import { Pagination } from "../../components/pagination/pagination";

function Suppliers() {
  const [isFormVisible, setFormVisible] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mode, setMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    supplierName: "",
    contactNo: "",
    email: "",
    address: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const closeForm = () => setFormVisible(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const handleOpenAdd = () => {
    setMode(false);
    handleOpen();
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchSuppliers();
  }, [currentPage]);

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/stockManager/supplierList?page=${currentPage}&limit=4`
      );
      const { success, message, suppliers, totalPages } = response.data;
      if (success) {
        setSuppliers(suppliers);
        setTotalPages(totalPages);
      } else {
        setError(message);
      }
    } catch (error) {
      setError("Failed to fetch suppliers");
    } finally {
      setLoading(false);
    }
  };

  const addSupplierToList = (newSupplier) => {
    if (suppliers.length === 4) {
      setCurrentPage(currentPage + 1);
    }
    const existingIndex = suppliers.findIndex(
      (supplier) => supplier.id === newSupplier.id
    );
    if (existingIndex !== -1) {
      const updatedSuppliers = [...suppliers];
      updatedSuppliers[existingIndex] = newSupplier;
      setSuppliers(updatedSuppliers);
    } else {
      setSuppliers([newSupplier, ...suppliers]);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/stockManager/supplier/${id}`);
      setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
      alert("Successfully deleted supplier");
    } catch (error) {
      console.log("Error deleting supplier:", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/stockManager/supplier/${id}`
      );
      const { success, message, supplier } = response.data;
      if (success) {
        setMode(true);
        handleOpen();
        setFormData(supplier);
      } else {
        console.error("Failed to fetch supplier details:", message);
      }
    } catch (error) {
      console.error("Error editing supplier:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    console.log("search when page change");
    supplierSearch();
  }, [searchQuery]);

  const supplierSearch = async () => {
    if (!searchQuery) {
      fetchSuppliers();
      return;
    }
    try {
      const { data } = await axios.get(
        `http://localhost:5000/stockManager/supplierList/?supplierName=${searchQuery}`
      );
      const { success, suppliers } = data;

      if (success) {
        setSuppliers(suppliers);
      } else {
        setError("No suppliers found");
      }
    } catch (error) {
      console.log("Error searching for suppliers:", error);
      setError("Failed to search suppliers");
    }
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.supplierName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-10">
        <AddSupplier
          title={"Add supplier"}
          formData={formData}
          setFormData={setFormData}
          handleClose={handleClose}
          mode={mode}
          open={open}
          handleOpen={handleOpen}
          onClose={closeForm}
          addSupplierToList={addSupplierToList}
        />
      </div>
      <SmallCard
        className="cursor-pointer"
        title={"Add Supplier"}
        onClick={handleOpenAdd}
      />
      <CardBody className="flex flex-col gap-1 bg-white rounded-md">
        <div className="flex flex-row gap-1 justify-between">
          <Typography variant="h4" color="blue-gray">
            Supplier List
          </Typography>
          <Card className="w-400 rounded">
            <div className="flex p-4 gap-6 items-center">
              <Input
                size="lg"
                label="Search by Supplier Name"
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
          <div className="overflow-auto">
            <Card className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md bg-clip-border rounded-xl mt-10">
              <table className="w-full text-left table-auto min-w-max">
                <thead>
                  <tr>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Supplier Name
                      </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Telephone
                      </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Email
                      </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Address
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
                  {filteredSuppliers.map((supplier) => (
                    <tr key={supplier.id} className="even:bg-blue-gray-50/50">
                      <td className="p-4">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {supplier.supplierName}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {supplier.contactNo}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {supplier.email}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {supplier.address}
                        </p>
                      </td>
                      <td>
                        <DeleteRecordButton onClick={() => handleDelete(supplier.id)} />
                      </td>
                      <td>
                        <EditRecordButton onClick={() => handleEdit(supplier.id)} />
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

export default Suppliers;
