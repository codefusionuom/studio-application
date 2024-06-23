import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import AddDepartmentForm from "./form/AddDepartmentForm";
import axios from "axios";
import DepartmentEdit from "./form/DepartmentEdit";
import DepartmentAccordion from "./component/DepartmentAccordion";
import DeleteButton from "../../components/cards/buttons/DeleteButton";

function CustomerRequests() {
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setIsLoading(true); 
    axios
      .get("http://localhost:5000/superAdmin/departmrnt/:page")
      .then((res) => {

        setRecords(res.data.rows);
        console.log(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col gap-10">
      {/* ************************************************card ************************************/}

      <AddDepartmentForm />

      {/* t***********************************************table*************************************** */}
      <div>
        <Card className=" w-full border-2 rounded">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="flex flex-col items-center justify-between gap-4  md:flex-row ">
              <Typography className="text-2xl">Department List</Typography>
            </div>
          </CardHeader>
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

              <tbody>
                {records.length > 0 &&
                  records.map((records, index) => {
                    const isLast = index === records.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={records.id}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {records.departmentId}
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
                              {records.departmentName}
                            </Typography>
                          </div>
                        </td>

                        <td className={classes}>
                          <div className="w-max">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {records.departmentHead}
                            </Typography>
                          </div>
                        </td>

                        <td className={classes}>
                          <DepartmentEdit id={records.id} />
                        </td>

                        <td className={classes}>
                          <DeleteButton
                            onClick={(e) => handleSubmit(records.id)}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
      {/* *********************************************Accordion ***********************************************/}
      {/* <div>
        <DepartmentAccordion />
      </div> */}
    </div>
  );
  function handleSubmit(id) {
    const conf = window.confirm("do you wnat to delete");
    if (conf) {
      console.log(conf);
      console.log(id);
      axios
        .delete("http://localhost:5000/superAdmin/departmentd/" + id)
        .then((res) => {
          alert("record deleted");
          window.location.replace("/superAdmin/Department");
        })
        .catch((err) => console.log(err));
    }
  }
}

export default CustomerRequests;

const TABLE_HEAD = ["Department ID", "Name", "Head of Department", "", ""];
