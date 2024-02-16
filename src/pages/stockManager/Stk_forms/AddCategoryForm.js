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
  Textarea,
} from "@material-tailwind/react";
import SmallCard from "../../../components/cards/card";
 
function AddCategoryForm({title}) {

    
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur); 
 
  return (
    <>
      <SmallCard className=" w-full cursor-pointer" title={title} onClick={handleOpen} />

      <Dialog
       
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none w-fit"
      >
        <Card className="mx-auto w-full ">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
             Add New Category
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter Category details Here
            </Typography>

            
            <div className=" flex flex-row justify-evenly ">
              

              <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Category ID:
                </Typography>
                <Input label="Category ID" size="lg" placeholder="C-001"/>
              </div>
              <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Category Name:
                </Typography>
                <Input label="Category Name" size="lg" placeholder="" />
              </div>
              

            </div>


             
            

            

            <div className=" flex flex-row justify-evenly ">
              <div className=" flex flex-col w-full">
                <Typography className="mb-2" variant="h6">
                Description:
                </Typography>
                <Textarea label="Enter Description here" size="lg" />

              </div>
              
             
            </div>


            {/* <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div> */}
          </CardBody>
          <CardFooter className="pt-0">
            <div className=" flex flex-row justify-between">
              <Button className=" bg-yellow-800" onClick={handleOpen}>
                Clear
              </Button>
              <Button className=" bg-green-600" onClick={handleOpen}>
                Create
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
export default AddCategoryForm