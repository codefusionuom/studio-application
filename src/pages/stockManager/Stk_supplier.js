import React from 'react'
import { MagnifyingGlassIcon, ChevronUpDownIcon, } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Input, Typography, Button, CardBody, Chip, CardFooter, Tabs, TabsHeader, Tab, Avatar, IconButton, Tooltip, Select, Option, } from "@material-tailwind/react";
import Datepicker from "../../components/datePicker/Datepicker";
import { Pagination } from "../../components/pagination/pagination";
import SmallCard from '../../components/cards/card';

import { useState } from 'react';
import Modal from './Stk_components/Modal';
import Table from './Stk_components/Table';
import { supplierTH,supplierTR } from './Stk_components/data';
import FormComp from './Stk_components/FormComp';

function Suppliers() {
    const [isFormVisible, setFormVisible] = useState(false);

    const openForm = () => {
      setFormVisible(true);

    };
  
    const closeForm = () => {
      setFormVisible(false);
    };

    return (
      <div className="flex flex-col gap-10">
        <div className="flex gap-10">
          <div>
            
            {isFormVisible && (
              <Modal onClose={closeForm}>
                <FormComp onClose={closeForm} />
              </Modal>
             
            )}
          </div>
          <FormComp title={'+ Add supplier'} onClose={closeForm} />

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
        <Table title="Supplier" headerList={supplierTH} rowList={supplierTR} />
      </div>
    );
}

export default Suppliers

