import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  Input,
  IconButton,
  CardFooter,
  Option,
  Select,
} from "@material-tailwind/react";
import CardEvent from "../../components/eventManager/cardEvent";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import axiosInstance from "../../config/axios.config";
import { Pagination } from "../../components/pagination/pagination";
import EditButton from "../../components/cards/buttons/EditButton";




const Events = () => {
  const [eventRequestList, setEventRequestList] = useState([]);
  const [eventRequestCount, setEventRequestCount] = useState("");
  const [active, setActive] = useState(1);
  const [results, setResults] = useState(0);
  const [status, setStatus] = useState("Active");
  const navigate = useNavigate();

  useEffect(() => {
    getEventRequests();
  }, []);

  const handleOneRequest = async (id) => {
    // console.log(id, "req");
    navigate(`/eventManager/createEventRequest/${id}`);
  };

  const getEventRequests = async () => {
  
    
    await  axiosInstance.get(
      `/customerManager/eventRequest/?status=${status}&page=${active}&limit=8`
    )
      .then((response) => {
        console.log(response.data);
        setEventRequestList(response.data.rows);
        setEventRequestCount(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log("search when page change");
    getEventRequests();
    
  }, [active,status]);

  return (
    <>
      <div className="flex space-x-4 justify-between"  color="red">
        
        <CardEvent width="[324px]" height="[180px]"
          onTap={() => {
            navigate("/eventManager/createEvent");
          }}  
        >
              <Button className="font-medium hover:after:bg-none" 
         variant="text"
              >

          <div className="flex justify-center items-center font-black">
          
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
          <span className="font-black"> Create Event</span>
          </div>
              </Button>
        </CardEvent>

        <div className="flex justify-center items-center w-[628px] h-[140px] bg-cl-4 rounded font-lato text-xl text-cl-1 ml-8 p-4">
          <div className="w-[261px] h-[46px]">
            <Input
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              }
              label="Search"
            />
          </div>
          {/* <div className="relativew-[207.42px] h-[46px] ml-5">
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
          </div> */}
          <div className=" flex p-4 gap-6">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                class=" p-2 h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              >
                <option value="" disabled selected>
                  Select Status
                </option>
                <option value="pending">pending</option>
                <option value="Active">active</option>
              </select>
            </div>
        </div>
      </div>

      <div className="h-8"></div>
      <Card className="h-2/3 w-full p-4 pt-0.5 ">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none pt-4"
        >
          <div className="mb-1 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray" className="text-3xl">
                Events
              </Typography>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {eventRequestList.map((request, index) => {
                const isLast = index === eventRequestList.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={request.id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="black"
                            className="font-normal"
                          >
                            {request.customer?.firstname + " " + request.customer?.lastname}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {request.service?.serviceName}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {request.customer?.mobilePhone}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {formatDate(request.serviceDate)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {request.status}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <EditButton onClick={()=>handleOneRequest(request.id)} />
                    </td>

                   
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 pt-0">
        <Typography>{results} results</Typography>
            <div className="flex gap-2">
              <Pagination active={active} setActive={setActive} />
            </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default Events;



const TABLE_HEAD = [
  "Customer Name",
  "Service Type",
  "Phone Number",
  "Date",
  "Status",
  "Edit"
];
const formatDate = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};