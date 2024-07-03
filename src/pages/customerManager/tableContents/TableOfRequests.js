import React from 'react'
import {
    Card,
    Typography,
    CardBody,
    CardFooter,
  } from "@material-tailwind/react";
import { TABLE_HEAD } from '../initialValues/customerRequest';
import { Pagination } from '../../../components/pagination/pagination';
function TableOfRequests({handleOneRequest,requests,active,setActive,results}) {
  return (
    <div> <Card>
        <CardBody className="overflow-scroll px-0">
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
            { id,firstname,lastname,email,address, status,note, createdAt,mobilePhone,serviceType,serviceDate },
            index
          ) => {
            const isLast = index === requests.length - 1;
            const classes = isLast
              ? "p-4"
              : "p-4 border-b border-blue-gray-50";

            return (
              <tbody>
                <tr key={id} onClick={()=>handleOneRequest({ id,firstname,lastname,email,address, status,note, createdAt,mobilePhone,serviceType,serviceDate })}>
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
                      >{serviceDate ? (new Date(serviceDate).getFullYear() +
                        "-" +
                        (new Date(serviceDate).getMonth() + 1) +
                        "-" +
                        new Date(serviceDate).getDate()):"now"}
                        
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
  </CardFooter>
</Card></div>
  )
}

export default TableOfRequests