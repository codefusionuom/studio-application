import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import SmallCard from "../../components/cards/card";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axios.config";
import socketIOClient from "socket.io-client";
import { useDispatch } from "react-redux";
import {
  addCustomerRequest,
  selectCustomerRequest,
  resetCustomerRequest,
} from "../../features/customerManager/customerRequest";
import TableOfRequests from "./tableContents/TableOfRequests";

function CustomerRequests() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = socketIOClient("http://localhost:5000");
  const [status, setStatus] = useState("inprogress");
  const [active, setActive] = useState(1);
  const [results, setResults] = useState(0);
  const [requestList, setRequestList] = useState([]);

  const handleStatus = async (query) => {
    dispatch(resetCustomerRequest());
    console.log("date", query);
    try {
      // console.log("try",status);
      const { data } = await axiosInstance.post(
        `/customerManager/customerRequest`,
        { status, active, limit: 8 }
      );
      console.log(data);
      setResults(data.count);
      setRequestList(data.rows);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOneRequest = async (request) => {
    console.log(request, "req");
    dispatch(selectCustomerRequest(request));
    navigate("/customerManager/createCustomerRequest");
  };


  useEffect(() => {
    handleStatus();
    return () => {
      dispatch(resetCustomerRequest());
    };
  }, [active, status]);

  useEffect(() => {
    socket.on("customerRequest", (newRequest) => {
      dispatch(addCustomerRequest());
      console.log("socket request came",newRequest)
      setRequestList([newRequest, ...requestList]);
    });
  }, [socket]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-10">
        <SmallCard
          onClick={() => {
            navigate("/customerManager/createCustomerRequest");
          }}
          className=" w-full"
          title="Create Customer Request"
        />
        <Card className="w-full rounded flex justify-center ">
          <div className="flex flex-col items-center justify-between gap-4  md:flex-row p-4">
            <Typography className="text-2xl">Customer Requests</Typography>
            <div className=" flex p-4 gap-6">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                class=" p-2 h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              >
                <option value="" disabled selected>
                  Select Status
                </option>
                <option value="inprogress">Inprogress</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </Card>
      </div>
      <div>
        <TableOfRequests
          setActive={setActive}
          active={active}
          results={results}
          handleOneRequest={handleOneRequest}
          requests={requestList}
        />
        {/* below one for request table */}
      </div>
    </div>
  );
}

export default CustomerRequests;

{
  /* <CardBody className="overflow-scroll px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>

              {requests && requests.length > 0 ? (
                requests.map(
                  (
                    { id,firstname,lastname,email,address, status, createdAt,mobilePhone,serviceType,serviceDate },
                    index
                  ) => {
                    const isLast = index === requests.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tbody>
                        <tr key={id} onClick={()=>handleOneRequest({ id,firstname,lastname,email,address, status, createdAt,mobilePhone,serviceType,serviceDate })}>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {(firstname
                                    ? firstname
                                    : "") +
                                    " " +
                                    (lastname
                                      ? lastname
                                      : "")}
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
                                {mobilePhone}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {serviceType}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {serviceDate}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {createdAt ? (new Date(createdAt).getFullYear() +
                                  "-" +
                                  (new Date(createdAt).getMonth() + 1) +
                                  "-" +
                                  new Date(createdAt).getDate()):"now"}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {status}
                              </Typography>
                            </div>
                          </td>
                    
                        </tr>
                      </tbody>
                    );
                  }
                )
              ) : (
                <tr className=" flex flex-col w-full h-32 animate-pulse justify-center items-center "></tr>
              )}
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography>{results} results</Typography>
            <div className="flex gap-2">
              <Pagination active={active} setActive={setActive} />
            </div>
          </CardFooter> */
}
