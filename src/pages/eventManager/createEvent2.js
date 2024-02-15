import React from "react";
import CardEvent from "./cardEvent"; 
import {
  Card,
  CardBody,
  Typography,
  Select,
  Option,
  Input,
  Button,
  DialogFooter,
  DialogBody,
  DialogHeader,
  Dialog,
} from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { DayPicker } from "react-day-picker";

const CreateEvent2 = () => {
  //for modal handling
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const [date, setDate] = React.useState();
  return (
    <div>
      <CardEvent
      onTap={handleOpen}
        title={
        
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 inline-block mr-2  font-bold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add Task
          </>
        }
        onClick={() => console.log("ffff")}
      />
      <Dialog open={open} handler={handleOpen} maxWidth="2xl" width="full">
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody>

        <table className="w-full min-w-max table-auto text-left">
            <tr>
            <td>
            <div className="flex w-full shrink-0 gap-2 md:w-max h-11">
                <div className="w-full md:w-72 ">
                  <Input
                    label="Search"
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  />
                </div>
              </div>
            </td>
            <td>
            <div className="  w-full min-w-[200px]">
                <Select label="Select Version" className=" h-11">
                  <Option>Material Tailwind HTML</Option>
                  <Option>Material Tailwind React</Option>
                  <Option>Material Tailwind Vue</Option>
                  <Option>Material Tailwind Angular</Option>
                  <Option>Material Tailwind Svelte</Option>
                </Select>
              </div>
            </td>
            </tr>
            <tr>
            <td>
            <Card className=" w-4/5 bg-gray-400 flex align-top "  >
                <CardBody>
                  <Typography variant="lead" color="blue-gray" className=" ">
                  Emp-101
                  </Typography>
                </CardBody>
              </Card>
            <Card className="mt-5 w-4/5 bg-gray-400 flex align-top"  >
                <CardBody>
                  <Typography variant="paragraph" color="blue-gray" className="mb-2 ">
                  Emp-101
                  </Typography>
                </CardBody>
              </Card>
            </td>
            <td>
            <DayPicker
                mode="single"
                selected={date}
                onSelect={setDate}
                showOutsideDays
                className="border-0  mt-8"
                classNames={{
                  caption:
                    "flex justify-center py-2 mb-4 relative items-center",
                  caption_label: "text-sm font-medium text-gray-900",
                  nav: "flex items-center",
                  nav_button:
                    "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                  nav_button_previous: "absolute left-1.5",
                  nav_button_next: "absolute right-1.5",
                  table: "w-full border-collapse",
                  head_row: "flex font-medium text-gray-900",
                  head_cell: "m-0.5 w-9 font-normal text-sm",
                  row: "flex w-full mt-2",
                  cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal",
                  day_range_end: "day-range-end",
                  day_selected:
                    "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                  day_today: "rounded-md bg-gray-200 text-gray-900",
                  day_outside:
                    "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                  day_disabled: "text-gray-500 opacity-50",
                  day_hidden: "invisible",
                }}
                components={{
                  IconLeft: ({ ...props }) => (
                    <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                  ),
                  IconRight: ({ ...props }) => (
                    <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                  ),
                }}
              />
            </td>
            </tr>
        </table>


          {/* <div className="flex space-x-4">
            <div>
              
             
            </div>
            <div>
             
              
            </div>
          </div> */}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <div>
        <div className="bg-cl-4 mt-8 ">
          <div class="  text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border p-4 pl-10 ">
            <Card className="mt-6 w-full bg-gray-400 bold">
              <CardBody>
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="mb-2 text-2xl font-normal "
                >
                  Task - Editing
                </Typography>
              </CardBody>
            </Card>
            <form class="">
              <div className="flex space-x-2 justify-between w-11/12">
                <div class="flex flex-col gap-6 mb-1 p-4 w-2/6">
                  <h6 class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    Event ID
                  </h6>
                  <div className="relative h-11 w-full min-w-[200px]">
                    <Select
                      label="Select Version"
                      className="relative h-11 w-full min-w-[200px]"
                    >
                      <Option>Material Tailwind HTML</Option>
                      <Option>Material Tailwind React</Option>
                      <Option>Material Tailwind Vue</Option>
                      <Option>Material Tailwind Angular</Option>
                      <Option>Material Tailwind Svelte</Option>
                    </Select>
                  </div>

                  <h6 class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    Employee
                  </h6>
                  <div className="  w-full min-w-[200px]">
                    <Select label="Select Version" className=" h-11">
                      <Option>Material Tailwind HTML</Option>
                      <Option>Material Tailwind React</Option>
                      <Option>Material Tailwind Vue</Option>
                      <Option>Material Tailwind Angular</Option>
                      <Option>Material Tailwind Svelte</Option>
                    </Select>
                  </div>
                  <h6 class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    Status
                  </h6>
                  <div className="  w-full min-w-[200px]">
                    <Select label="Select Version" className=" h-11">
                      <Option>Material Tailwind HTML</Option>
                      <Option>Material Tailwind React</Option>
                      <Option>Material Tailwind Vue</Option>
                      <Option>Material Tailwind Angular</Option>
                      <Option>Material Tailwind Svelte</Option>
                    </Select>
                  </div>
                </div>

                <div class=" flex relative w-2/6 h-2/3 mt-8">
                  <textarea
                    class="peer h-full min-h-[200px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                  >
                    {" "}
                  </textarea>
                  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Description
                  </label>
                </div>
              </div>

              <Card className="mt-6 w-full bg-gray-400 bold">
                <CardBody>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-2 text-2xl font-normal "
                  >
                    Task - Photography
                  </Typography>
                </CardBody>
              </Card>

              <Card color="transparent" shadow={false} className="w-full">
                <div className="flex     space-x-2 w-11/12">
                  {/* <form className="mt-8 mb-2  w-full  flex space-x-2 justify-between"> */}

                  <div className="mt-8 mb-2  w-full  flex space-x-2 justify-between">
                  <div class="flex flex-col gap-6 mb-1 p-4 w-2/6">
                  <h6 class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    Event ID
                  </h6>
                  <div className="relative h-11 w-full min-w-[200px]">
                    <Select
                      label="Select Version"
                      className="relative h-11 w-full min-w-[200px]"
                    >
                      <Option>Material Tailwind HTML</Option>
                      <Option>Material Tailwind React</Option>
                      <Option>Material Tailwind Vue</Option>
                      <Option>Material Tailwind Angular</Option>
                      <Option>Material Tailwind Svelte</Option>
                    </Select>
                  </div>

                  <h6 class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    Employee
                  </h6>
                  <div className="  w-full min-w-[200px]">
                    <Select label="Emp-101" className=" h-11">
                      <Option>Material Tailwind HTML</Option>
                      <Option>Material Tailwind React</Option>
                      <Option>Material Tailwind Vue</Option>
                      <Option>Material Tailwind Angular</Option>
                      <Option>Material Tailwind Svelte</Option>
                    </Select>

                    <Card className="mt-5   bg-gray-400 flex align-top"  >
                <CardBody>
                  <Typography variant="paragraph" color="blue-gray" className="mb-2 ">
                  Emp-101
                  </Typography>
                </CardBody>
              </Card>

                    <Card className="mt-5   bg-gray-400 flex align-top"  >
                <CardBody>
                  <Typography variant="paragraph" color="blue-gray" className="mb-2 ">
                  Emp-101
                  </Typography>
                </CardBody>
              </Card>
                  </div>


                  <Typography
                        variant="h6"
                        color="blue-gray"
                        className="-mb-3"
                      >
                        Name
                      </Typography>
                      <Input
                        size="lg"
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                </div>

                    <div className="mb-1 flex flex-col gap-6 p-4 w-2/6  ">
                    <div className=" flex relative  h-2/3 mt-8">
                  <textarea
                    class="peer h-full min-h-[200px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                  >
                    {" "}
                  </textarea>
                  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Description
                  </label>
                </div>
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="-mb-3"
                      >
                        Contact No
                      </Typography>
                      <Input
                        size="lg"
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none" 
                        }}
                      />
                    </div>
                  </div>

                  {/* </form> */}
                </div>
              </Card>
              <Card className="mt-6 w-full bg-gray-400 bold">
                <CardBody>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-2 text-2xl font-normal "
                  >
                    Service Information
                  </Typography>
                </CardBody>
              </Card>

              <Card color="transparent" shadow={false} className="w-full">
                <div className="flex     space-x-2 w-11/12">
                  {/* <form className="mt-8 mb-2  w-full  flex space-x-2 justify-between"> */}

                  <div className="mt-8 mb-2  w-full  flex space-x-2 justify-between">
                    <div className="mb-1 flex flex-col gap-6 p-4 w-2/6">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="-mb-3"
                      >
                        Name
                      </Typography>
                      <Input
                        size="lg"
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="-mb-3"
                      >
                        Address
                      </Typography>
                      <Input
                        size="lg"
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>

                    <div className="mb-1 flex flex-col gap-6 p-4 w-2/6  ">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="-mb-3"
                      >
                        Email
                      </Typography>
                      <Input
                        size="lg"
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="-mb-3"
                      >
                        Contact No
                      </Typography>
                      <Input
                        size="lg"
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                  </div>

                  {/* </form> */}
                </div>
              </Card>
              <Card className="mt-6 w-full bg-gray-400 bold">
                <CardBody>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-2 text-2xl font-normal "
                  >
                    Service Information
                  </Typography>
                </CardBody>
              </Card>

              <Card color="transparent" shadow={false} className="w-full">
                <div className="flex     space-x-2 w-11/12">
                  {/* <form className="mt-8 mb-2  w-full  flex space-x-2 justify-between"> */}

                  <div className="mt-8 mb-2  w-full  flex space-x-2 justify-between">
                    <div className="mb-1 flex flex-col gap-6 p-4 w-2/6">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="-mb-3"
                      >
                        Time
                      </Typography>
                      <Input
                        size="lg"
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="-mb-3"
                      >
                        Album
                      </Typography>
                      <Input
                        size="lg"
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="-mb-3"
                      >
                        Cost
                      </Typography>
                      <Input
                        size="lg"
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>

                    <div className="mb-1 flex flex-col gap-6 p-4 w-2/6  ">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="-mb-3"
                      >
                        Crowd
                      </Typography>
                      <Input
                        size="lg"
                        placeholder="200+"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="-mb-3"
                      >
                        Morning-shoot
                      </Typography>
                      <Input
                        size="lg"
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                  </div>

                  {/* </form> */}
                </div>
              </Card>

              <Button color="blue" className="mt-auto">
                Next
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent2;
