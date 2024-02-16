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

 
function CategoryList({title}) {

    
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur); 
 
  return (
    <>
      <SmallCard className=" w-full cursor-pointer bg-yellow-700" title={title} onClick={handleOpen} />
     

      <Dialog
       
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none w-fit"
      >
        <Card className="mx-auto w-full ">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
                Category List
            </Typography>
          <div
  class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
  <table class="w-full text-left table-auto min-w-max">
    <thead>
      <tr>
        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            Category ID
          </p>
        </th>
        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            Category Name
          </p>
        </th>
        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            No. Of Items
          </p>
        </th>
        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            Included Items
          </p>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="even:bg-blue-gray-50/50">
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            C-001
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Frames
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            23
          </p>
        </td>
        <td class="p-4">
        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            16:9 Frames<br></br>
            4:3 Frames<br></br>
            8:5 Frames
          </p>
        </td>
      </tr>

      <tr class="even:bg-blue-gray-50/50">
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            C-002
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Cards
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            100
          </p>
        </td>
        <td class="p-4">
        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            A4 Size<br></br>
            A3 Size<br></br>
          
          </p>
        </td>
      </tr>

      <tr class="even:bg-blue-gray-50/50">
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            C-003
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Ink
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            16
          </p>
        </td>
        <td class="p-4">
        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Black<br></br>
            Red<br></br>
          
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
export default CategoryList