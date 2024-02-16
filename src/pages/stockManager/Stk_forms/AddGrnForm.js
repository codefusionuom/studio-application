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
 
function AddGrnForm({title}) {
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
             Create GRN
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter Good Recieve Note Details Here
            </Typography>

            
            <div className=" flex flex-row justify-evenly ">
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Supplier ID:
                </Typography>

                <Input label="Supplier ID" size="lg" placeholder="S-001" />
              </div>

              <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Full Amount:
                </Typography>
                <Input label=" Full Amount" size="lg" placeholder="100,000.00"/>
              </div>
            </div>


            <div className=" flex flex-row justify-evenly ">
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Date:
                </Typography>

                <Input label="Date" size="lg" type="date" placeholder="DD/MM/YYYY" />
              </div>

              <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Telephone:
                </Typography>
                <Input label="Telephone" size="lg" placeholder="077-111 1111" />
              </div>
            </div>

            <div className=" flex flex-row justify-between ">
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                Stock Items:
                </Typography>

                <Input label=" Stock Items" size="lg" placeholder="I-001" />
              </div>
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                Quantity:
                </Typography>

                <Input label="Quantity" size="lg" />
              </div>
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                Price:
                </Typography>

                <Input label="Price" size="lg" placeholder="100,000.00"/>
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
export default AddGrnForm