import React from 'react'
import { MagnifyingGlassIcon, ChevronUpDownIcon, } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Input, Typography, Button, CardBody, Chip, CardFooter, Tabs, TabsHeader, Tab, Avatar, IconButton, Tooltip, Select, Option, } from "@material-tailwind/react";
import Datepicker from "../../components/datePicker/Datepicker";
import { Pagination } from "../../components/pagination/pagination";
import SmallCard from '../../components/cards/card';
import Table from './Stk_components/Table';
import { stkItemList,stkItemTHead } from './Stk_components/data';

function StockItem() {
    return (
        <div className='flex flex-col gap-10'>
            <div className='flex gap-10'>
                <SmallCard className=" w-full" title="+ Create Stock Item" />
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
            <Table title="Stock Item" headerList={stkItemTHead} rowList={stkItemList}/>
        </div>
        </div>
    )
}

export default StockItem
