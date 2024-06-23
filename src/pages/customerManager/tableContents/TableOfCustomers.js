import React from 'react'
import {Card,Input,Typography,Button,Dialog,CardBody,CardFooter} from "@material-tailwind/react";
import EditRecordButton from '../../../components/buttons/EditRecordButton';
import DeleteRecordButton from '../../../components/buttons/DeleteRecordButton';
import { Pagination } from '../../../components/pagination/pagination';
import { TABLE_HEAD } from '../initialValues/customer';

export default function TableOfCustomers({customerList,handleEdit,setSelectedCustomer,active,setActive,results}) {
    return (
      <div>  
        <Card className=" w-full border-2 rounded p-4">
          <CardBody className="overflow-scroll px-0 z-10">
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
              <tbody>
                {customerList &&
                  customerList.map(
                    (
                      {
                        id,
                        firstname,
                        status,
                        email,
                        lastname,
                        mobilePhone,
                        address,
                      },
                      index
                    ) => {
                      const classes = "p-4 ";

                      return (
                        <tr key={id} onClick={() => {}}>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {(firstname ? firstname : "") +
                                    " " +
                                    (lastname ? lastname : "")}
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
                                {email && email}
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
                                {mobilePhone && mobilePhone}
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
                                {address}
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
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                                onClick={() => {
                                  handleEdit();
                                  setSelectedCustomer({
                                    id,
                                    firstname,
                                    status,
                                    email,
                                    lastname,
                                    mobilePhone,
                                    address,
                                  });
                                }}
                              >
                                <EditRecordButton />
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                                onClick={() => {
                                  handleEdit();
                                  setSelectedCustomer({
                                    id,
                                    firstname,
                                    status,
                                    email,
                                    lastname,
                                    mobilePhone,
                                    address,
                                  });
                                }}
                              >
                                <DeleteRecordButton />
                              </Typography>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography>{results} results</Typography>
            <div className="flex gap-2">
              <Pagination active={active} setActive={setActive} />
            </div>
          </CardFooter>
        </Card>
      </div>
    )
  }
  

