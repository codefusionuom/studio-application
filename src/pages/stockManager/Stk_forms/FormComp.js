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
 
function FormComp({title}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur); 
 
  return (
    <>
      <SmallCard className=" w-full" title={title} onClick={handleOpen} />

      <Dialog
        // size=""
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none w-fit"
      >
        <Card className="mx-auto w-full ">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Add Supplier
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter supplier Details Here
            </Typography>

            
            <div className=" flex flex-row justify-evenly ">
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Name:
                </Typography>

                <Input label="Name" size="lg" />
              </div>

              <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Email:
                </Typography>
                <Input label="Email" size="lg" />
              </div>
            </div>


            <div className=" flex flex-row justify-evenly">
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Address:
                </Typography>

                <Input label="Address" size="lg" />
              </div>

              <div className="flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                  Telephone:
                </Typography>
                <Input label="Telephone" size="lg" />
              </div>
            </div>

            <div className=" flex flex-row justify-evenly ">
              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                Stock Item:
                </Typography>

                <Input label=" Stock Item" size="lg" />
              </div>

              <div className=" flex flex-col justify-between">
                <Typography className="mb-2" variant="h6">
                Cost:
                </Typography>

                <Input label=" Cost" size="lg" />
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
export default FormComp