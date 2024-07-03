import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MagnifyingGlassIcon,
  TrashIcon as DeleteIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  Input,
  Typography,
  CardBody,
  Select,
  Option,
} from "@material-tailwind/react";
import AddPaymentForm from "./Stk_forms/AddPayment";
import Modal from "./Stk_components/Modal";

function SMpayment() {
  const [isFormVisible, setFormVisible] = useState(false);
  const [payment, setPayment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const closeForm = () => {
    setFormVisible(false);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
       "http://localhost:5000/stockManager/payment"
      );
      const { success, message, payments } = response.data;
      console.log(response);
      if (success) {
        setPayment(payments || []); // Ensure payment is not undefined
      } else {
        setError(message);
      }
    } catch (error) {
      setError("Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  const addPaymentToList = (newPayment) => {
    setPayment([...payment, newPayment]);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/stockManager/payment/${id}`
      );
      setPayment(payment.filter((p) => p.id !== id));
      console.log("Successfully deleted stock item");
      alert("Successfully deleted stock item");
    } catch (error) {
      console.error("Error deleting stock item:", error);
    }
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtered payments based on search query
  const filteredPayments = payment.filter((p) =>
    p.supplierName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-10">
        <div>
          {isFormVisible && (
            <Modal onClose={closeForm}>
              <AddPaymentForm onClose={closeForm} />
            </Modal>
          )}
        </div>
        <AddPaymentForm title={" Add payment"} onClose={closeForm} addPaymentToList={addPaymentToList} />
      </div>

      <div>
        <CardBody className="flex flex-col gap-4 bg-white rounded-md">
          <div className="flex flex-row gap-5 justify-between">
            <Typography variant="h4" color="blue-gray">
              Payment List
            </Typography>
            <Card className="w-400 rounded">
              <div className="flex p-4 gap-6 items-center">
                <Select size="lg" label="Select By: Item " className="z-10">
                  <Option>Date</Option>
                  <Option>Supplier Name</Option>
                  <Option>Item Id</Option>
                  <Option>Item Name</Option>
                </Select>
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
            <div className="overflow-auto">
              <table className="w-full text-left table-auto min-w-max">
                <thead>
                  <tr>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      Supplier Name
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      Item Name
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      Date
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      Telephone
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      Quantity
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      Price
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      Total Price
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((p) => (
                    <tr key={p.id}>
                      <td className="p-4">{p.supplierName}</td>
                      <td className="p-4">{p.itemName}</td>
                      <td className="p-4">{new Date(p.date).toLocaleDateString()}</td>
                      <td className="p-4">{p.telephone}</td>
                      <td className="p-4">{p.quantity}</td>
                      <td className="p-4">{p.price}</td>
                      <td className="p-4">{p.quantity * p.price}</td>
                      <td className="p-4">{p.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </div>
    </div>
  );
}

export default SMpayment;
