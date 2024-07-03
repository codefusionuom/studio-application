import React, { useEffect, useState } from "react";
import axios from "axios";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  Input,
  Typography,
  CardBody,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import AddGrnForm from "./Stk_forms/AddGrnForm";
import DeleteRecordButton from "../../components/buttons/DeleteRecordButton";
import ViewRecordButton from "../../components/buttons/ViewRecordButton";
import { Pagination } from "../../components/pagination/pagination";

function GrnStock() {
  const [isFormVisible, setFormVisible] = useState(false);
  const [grn, setGrn] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [suppliers, setSuppliers] = useState([]);
  const [supplierId, setSupplierId] = useState(""); // Track selected supplier for search
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");

  useEffect(() => {
    fetchGrn();
  }, [currentPage, searchQuery, supplierId, paymentStatusFilter]); // Include paymentStatusFilter in dependencies

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchGrn = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:5000/stockManager/grn?page=${currentPage}&limit=4`;
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }
      if (paymentStatusFilter) {
        url += `&paymentStatus=${encodeURIComponent(paymentStatusFilter)}`;
      }
      const response = await axios.get(url);
      const { success, message, grnList, totalPages } = response.data;
      if (success) {
        setGrn(grnList);
        setTotalPages(totalPages);
      } else {
        setError(message);
      }
    } catch (error) {
      setError("Failed to fetch GRN");
    } finally {
      setLoading(false);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/stockManager/supplierList"
      );
      const { success, message, suppliers } = response.data;

      if (success) {
        setSuppliers(suppliers);
      } else {
        console.error("Failed to fetch suppliers:", message);
      }
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const getSupplierName = (supplierId) => {
    const supplier = suppliers.find((sup) => sup.id === supplierId);
    return supplier ? supplier.supplierName : "Unknown Supplier";
  };

  const addGrnToList = (newGrn) => {
    if (grn.length === 4) {
      setCurrentPage(currentPage + 1);
    }
    setGrn([newGrn, ...grn]);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/stockManager/grn/${id}`);
      setGrn(grn.filter((grn) => grn.id !== id));
      console.log("Successfully deleted GRN");
      alert("Successfully deleted GRN");
    } catch (error) {
      console.log("Error deleting GRN:", error);
    }
  };

  const handleView = async (id) => {
    try {
      console.log("View button clicked for ID:", id);
      const response = await axios.get(
        `http://localhost:5000/stockManager/grn/${id}`
      );
      const { success, message, grn } = response.data;
      console.log(response.data);
      if (success) {
        setSelectedRecord(grn);
        setDialogOpen(true);
        console.log("Dialog state set to open.");
      } else {
        console.log("Failed to fetch stock item details:", message);
      }
    } catch (error) {
      console.log("Error fetching GRN details:", error);
    }
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedRecord(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSupplierChange = (e) => {
    setSupplierId(e.target.value);
    setSearchQuery(""); // Clear search query when changing supplier
    setCurrentPage(1); // Reset currentPage when changing supplier
  };

  const handlePaymentStatusFilterChange = (e) => {
    setPaymentStatusFilter(e.target.value);
    setCurrentPage(1); // Reset currentPage when changing payment status filter
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-10">
        <AddGrnForm
          title={"New GRN"}
          addGrnToList={addGrnToList}
          onClose={() => setFormVisible(false)}
        />
      </div>
      <CardBody className="flex flex-col gap-4 bg-white rounded-md">
        <div className="flex flex-row gap-5 justify-between">
          <Typography variant="h4" color="blue-gray">
            GRN List
          </Typography>
          <Card className="w-400 rounded">
            <div className="flex p-4 gap-6 items-center">
              {/* <Input
                size="lg"
                label="Search by supplier Name"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery}
                onChange={handleSearchChange}
              /> */}
              <select
                value={paymentStatusFilter}
                onChange={handlePaymentStatusFilterChange}
                className="border rounded p-2"
              >
                <option value="">All Payments</option>
                {grn.map((paymentStatus) => (
                  <option key={paymentStatus.id} value={paymentStatus.paymentStatus}>
                    {paymentStatus.paymentStatus}
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
                        Date
                      </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Supplier Name
                      </p>
                    </th>

                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Description
                      </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Subtotal(Rs.)
                      </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Payment Status
                      </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Delete
                      </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        View
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {grn
                    .filter((item) =>
                      supplierId ? item.supplierId === supplierId : true
                    )
                    .filter((item) =>
                      paymentStatusFilter ? item.paymentStatus === paymentStatusFilter : true
                    )
                    .map((item) => (
                      <tr key={item.id} className="even:bg-blue-gray-50/50">
                        <td className="p-4">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {new Date(item.date).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="p-4">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {getSupplierName(item.supplierId)}
                          </p>
                        </td>

                        <td className="p-4">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {item.description}
                          </p>
                        </td>
                        <td className="p-4">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            Rs.{item.subtotal}
                          </p>
                        </td>
                        <td className="p-4">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {item.paymentStatus}
                          </p>
                        </td>
                        <td>
                          <DeleteRecordButton
                            onClick={() => handleDelete(item.id)}
                          />
                        </td>
                        <td>
                          <ViewRecordButton
                            onClick={() => handleView(item.id)}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <Pagination
                active={currentPage}
                setActive={setCurrentPage}
                total={totalPages}
              />
            </Card>
          </div>
        )}
      </CardBody>
      <Dialog open={isDialogOpen} handler={closeDialog} className="w-full max-w-md">
        <DialogHeader className=" bg-blue-gray-300 text-black">GRN Details</DialogHeader>
        <DialogBody className="p-4">
          {selectedRecord && (
            <div className=" flex flex-row justify-around">
              <div>
                <div className="ml-2">
                  <Typography className="mb-2" variant="h6">
                    Date: {new Date(selectedRecord.date).toLocaleDateString()}
                  </Typography>
                </div>
                <div className="ml-2">
                  <Typography className="mb-2" variant="h6">
                    Supplier Name: {getSupplierName(selectedRecord.supplierId)}
                  </Typography>
                </div>

                <div className="ml-2">
                  <Typography className="mb-2" variant="h6">
                    Description: {selectedRecord.description}
                  </Typography>
                </div>
              </div>
              <div>
                <div className="ml-2">
                  <Typography className="mb-2" variant="h6">
                    Items:
                  </Typography>
                  {selectedRecord.grnItems.map((item, index) => (
                    <Typography key={index} className="mb-2" variant="body1">
                      {item.stockItem.itemName}: {item.quantity}
                    </Typography>
                  ))}
                </div>
                <div className="ml-2">
                  <Typography className="mb-2" variant="h6">
                    Discount: {selectedRecord.discount}%
                  </Typography>
                </div>
                <div className="ml-2">
                  <Typography className="mb-2" variant="h6">
                    Subtotal: Rs. {selectedRecord.subtotal}
                  </Typography>
                </div>
                <div className="ml-2">
                  <Typography className="mb-2" variant="h6">
                    Payment Status: {selectedRecord.paymentStatus}
                  </Typography>
                </div>
              </div>
            </div>
          )}
        </DialogBody>

        <DialogFooter className="flex justify-end p-4 bg-gray-100 border-t border-gray-200">
          <Button color="red" onClick={closeDialog}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default GrnStock;
