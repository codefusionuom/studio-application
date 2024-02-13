import { MagnifyingGlassIcon, ChevronUpDownIcon, } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Input, Typography, Button, CardBody, Chip, CardFooter, Tabs, TabsHeader, Tab, Avatar, IconButton, Tooltip, Select, Option, } from "@material-tailwind/react";
import Datepicker from "../../components/datePicker/Datepicker";
import { Pagination } from "../../components/pagination/pagination";
import SmallCard from "../../components/cards/card";
import Table from "./Stk_components/Table";
import { paymentList, paymentTHead } from "./Stk_components/data";

function SMpayment() {
    return (
        <div className='flex flex-col gap-10'>
        

        <div>
                          
            <Table title="Payment" headerList={paymentTHead} rowList={paymentList}/>
               
          </div>

       

   </div>
    )
}
export default SMpayment

