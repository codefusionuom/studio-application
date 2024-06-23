import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import AddAdminForm from "./form/AddAdminForm";
import AddAdminEdit from "./form/AddAdminEdit";
import axios from "axios";
import DeleteButton from "../../components/cards/buttons/DeleteButton";

function Admin() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); 
    axios
      .get("http://localhost:5000/superAdmin/admin/:page")
      .then((res) => {
        setRecords(res.data.rows); //set data
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err); 
      });
  }, []);

  return (
    <div className="flex flex-col gap-10">
      {/* ****************************form card************************************* */}
      <AddAdminForm /> 

      {/* *********************************table*********************************** */}
      <div>
        <Card className=" w-full border-2 rounded">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="flex flex-col items-center justify-between gap-4  md:flex-row ">
              <Typography className="text-2xl">Admin List</Typography>
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
                      <tr key={records.telephone}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                        {/* employee name and privilage */}
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {records.employeeName}
                              </Typography>

                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                {records.privileges}
                              </Typography>
                            </div>
                          </div>
                        </td>

{/* employee id */}
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {records.employeeId}
                            </Typography>
                          </div>
                        </td>

{/* telephone */}
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {records.telephone}
                          </Typography>
                        </td>

{/* edit button */}
                        <td className={classes}>
                          <AddAdminEdit passId={records.id} /> 
                        </td>

{/* delete button  */}
                        <td className={classes}>
                          <DeleteButton
                            onClick={() => handleSubmit(records.id)}
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
    </div>
  );

  // delete
  function handleSubmit(id) {
    const conf = window.confirm("do you wnat to delete");
    if (conf) {
      axios
        .delete("http://localhost:5000/superAdmin/admin/" + id)
        .then((res) => {
          alert("record deleted");
          window.location.replace("/superAdmin/admin");
        })
        .catch((err) => console.log(err));
    }
  }
}

export default Admin;

const TABLE_HEAD = ["Name", "Employee ID", "Phone Number", "", ""];
