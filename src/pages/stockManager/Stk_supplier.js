import React, { useEffect } from 'react'
import { MagnifyingGlassIcon, ChevronUpDownIcon, } from "@heroicons/react/24/outline";
import { Card, CardHeader, Input, Typography, Button, CardBody, Chip, CardFooter, Tabs, TabsHeader, Tab, Avatar, IconButton, Tooltip, Select, Option, } from "@material-tailwind/react";
import { useState } from 'react';
import Modal from './Stk_components/Modal';
import AddSupplier from './Stk_forms/AddSupplier';
import axios from 'axios';

function Suppliers() {
    const [isFormVisible, setFormVisible] = useState(false);

    const openForm = () => {
      setFormVisible(true);

   };
 
    const closeForm = () => {
      setFormVisible(false);
    };

    const [open,setOpen] = useState(false);
    const [suppliers,setSuppliers] = useState([]);
    const [loading,setLoading] =useState(false);
    const [error,setError] = useState(null);


    const fetchSuppliers = async () => {
      setLoading(true);
      try{
        const response = await axios.get("http://localhost:5000/stockManager/supplierList");
        const { success, message, suppliers } = response.data;
        if(success){
          setSuppliers(suppliers);
        }else{
          setError(message);
        }
      } catch(error){
        setError("Failed to fetch suppliers")
      } finally {
        setLoading(false)
      }
    }

    useEffect(() =>{
      fetchSuppliers();
    },[]);

    const handleDelete = async (supplierId) =>{
      try{
        await axios.delete(`http://localhost:5000/stockManager/supplier/${supplierId}`);
        setSuppliers(suppliers.filter((suppliers) => suppliers.supplierId !== supplierId));
        console.log("Successfully deleted supplier")
        alert("Successfully deleted supplier")
      }catch(error){
        console.log("Error deleting supplier:",error)
      }
    }

    const handleEdit = async (supplierId) =>{
      try{
        //  fetch the stock item data to be edited
        const response = await axios.get(`http://localhost:5000/stockManager/supplier/${supplierId}`)
        const { success, message, item } = response.data;

        if(success){
          //fetched stock item data
          console.log("Editing suppliers",suppliers)
        } else {
          console.log("failed to fetch supplier details:",message)
        }

      }catch (error){
        console.log("Error editing supplier:",error);
      }
    }

    const handleSupplierCreated = (newSupplier)=>{
      setSuppliers([...suppliers,newSupplier])
    }

    return (
      <div className="flex flex-col gap-10">
        <div className="flex gap-10">
          <div>
            
            {isFormVisible && (
              <Modal onClose={closeForm}>
                <AddSupplier onClose={closeForm} />
              </Modal>
             
            )}
          </div>
          <AddSupplier title={' Add supplier'} onClose={closeForm} />

          <Card className="w-full rounded">
            <div className=" flex p-4 gap-6 items-center">
              <Select size="lg" label="Select By: Supplier Id" className="z-10">
                <Option>Supplier Id</Option>
                <Option>Date</Option>
                <Option>Supplier Name</Option>
                <Option>Item Id</Option>
                <Option>Item Name</Option>
              </Select>

              <Input
                size="lg"
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </Card>
        </div>
        <CardBody className="flex flex-col gap-4 bg-white rounded-md">
            <Typography variant="h4" color="blue-gray">
              Supplier List
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
                      <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Supplier ID</th>
                      <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Supplier Name</th>
                      <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Item Id</th>
                      <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Telephone</th>
                      <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Email</th>
                      <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Address</th>
                      <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Delete</th>
                      <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {suppliers.map((suppliers) => (
                      <tr key={suppliers.supplierId}>
                        <td className="p-4">{suppliers.supplierId}</td>
                        <td className="p-4">{suppliers.supplierName}</td>
                        <td className="p-4">{suppliers.itemId}</td>
                        <td className="p-4">{suppliers.contactNo}</td>
                        <td className="p-4">{suppliers.email}</td>
                        <td className="p-4">{suppliers.address}</td>
                        
                        <td className="p-4">
                          <Button color="red" onClick={() => handleDelete(suppliers.supplierId)}>
                            Delete
                          </Button>
                        </td>
                        <td>
                          <Button color="blue" onClick={() => handleEdit(suppliers.supplierId)}>
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
        {/* <Table title="Supplier" headerList={supplierTH} rowList={supplierTR} /> */}
      </div>
    );
}

export default Suppliers

