import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import SmallCard from "../../../components/cards/card";
 
function ReturnItemList({title}) {

    
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur); 
 
  return (
    <>
      <Button className="  cursor-pointer bg-blue-700 text-white text-lg text " onClick={handleOpen}>{title}</Button>
      <Dialog
       
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none w-fit"
      >
        <Card className="mx-auto w-full ">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
            Return Stock Item List
            </Typography>
          <div
  class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
  <table class="w-full text-left table-auto min-w-max">
    <thead>
      <tr>
        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            Return Item ID
          </p>
        </th>
        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            Item Name
          </p>
        </th>
        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            No. Of Items
          </p>
        </th>
       
      </tr>
    </thead>
    <tbody>
      <tr class="even:bg-blue-gray-50/50">
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            R-001
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
          Black color Ink Bottle
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            23
          </p>
        </td>
       
      </tr>

      <tr class="even:bg-blue-gray-50/50">
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            R-002
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
          16:9 Frames
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            100
          </p>
        </td>
       
      </tr>

      <tr class="even:bg-blue-gray-50/50">
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            R-003
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
          A4 Size Card
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            16
          </p>
        </td>
      
      </tr>
     
    </tbody>
  </table>
</div>
            </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
export default ReturnItemList