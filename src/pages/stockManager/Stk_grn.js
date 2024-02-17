import React ,{useState}from 'react'
import { MagnifyingGlassIcon, ChevronUpDownIcon, } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Input, Typography, Button, CardBody, Chip, CardFooter, Tabs, TabsHeader, Tab, Avatar, IconButton, Tooltip, Select, Option, } from "@material-tailwind/react";
import Datepicker from "../../components/datePicker/Datepicker";
import { Pagination } from "../../components/pagination/pagination";
import SmallCard from '../../components/cards/card';
import Table from './Stk_components/Table';
import { TABLE_HEAD,TABLE_ROWS } from './Stk_components/data';
import Modal from './Stk_components/Modal';
import AddGrnForm from './Stk_forms/AddGrnForm';

function GrnStock() {
    const [isFormVisible, setFormVisible] = useState(false);

    const openForm = () => {
      setFormVisible(true);

    };
  
    const closeForm = () => {
      setFormVisible(false);
    };

    return (
        
        <div className='flex flex-col gap-10'>
            <div className="flex gap-10">
          <div>
            
            {isFormVisible && (
              <Modal onClose={closeForm}>
                <AddGrnForm onClose={closeForm} />
              </Modal>
             
            )}
          </div>
          <AddGrnForm title={' Create GRN'} onClose={closeForm} />
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
                              
                <Table title="GRN" headerList={TABLE_HEAD} rowList={TABLE_ROWS}/>
                   
              </div>

           

       </div>
    )
}

export default GrnStock
