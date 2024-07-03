import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Dialog,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import AddDepartmentForm from "./form/AddDepartmentForm";
import axios from "axios";
import DepartmentEdit from "./form/DepartmentEdit";
import DepartmentAccordion from "./component/DepartmentAccordion";
import DeleteButton from "../../components/cards/buttons/DeleteButton";
import EditButton from "../../components/cards/buttons/EditButton";
import Card2 from "../../components/cards/Card2";
import axiosInstance from "../../config/axios.config";
import { ToastError, ToastSuccess } from "../customerManager/ToastAlert";

function CustomerRequests() {
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId,setDeleteId]=useState(null)

  const handleDelete = (id) => {
    setOpenDelete(true);
    setDeleteId(id)
  };

  function handleDeleteconfirmed() {
    if(deleteId){
    axiosInstance
      .delete("http://localhost:5000/superAdmin/departmentd/" + deleteId)
      .then((res) => {
        ToastSuccess("successfully created depatment");
        setDeleteId(null)
        handleDeleteOpen()
      })
      .catch((err) => {
        console.log(err);
        ToastError(err || "error on created depatment");
        setDeleteId(null)
        handleDeleteOpen()
      });
    }
  }
  const handleEdit = (id) => {
    console.log(id);
    setSelectedDepartment(id);
    setOpen(true);
  };

  const handleOpen = () => setOpen(!open);
  const handleAddOpen = () => setOpenAdd(!openAdd);
  const handleDeleteOpen = () => setOpenDelete(!openDelete);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:5000/superAdmin/department/")
      .then((res) => {
        setRecords(res.data.rows);
        console.log(res.data.rows);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [openAdd, open,openDelete]);

  return (
    <div className="flex flex-col gap-10">
      <Card2
        title1="CREATE DEPARTMENT"
        title2={"Structure Teams & Assets"}
        onClick={handleAddOpen}
      />
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
                              {records.departmentHeadName}
                            </Typography>
                          </div>
                        </td>

                        <td className={classes}>
                          <EditButton onClick={() => handleEdit(records.id)} />
                        </td>

                        <td className={classes}>
                          <DeleteButton
                            onClick={(e) => handleDelete(records.id)}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </CardBody>
          <Dialog
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none w-fit "
          >
            <DepartmentEdit
              id={selectedDepartment}
              handleOpen={handleOpen}
              setOpen={setOpen}
              open={open}
            />
          </Dialog>

          <Dialog
            open={openAdd}
            handler={handleAddOpen}
            className="bg-transparent shadow-none w-fit "
          >
            <AddDepartmentForm
              handleOpen={handleAddOpen}
              setOpenAdd={setOpenAdd}
            />
          </Dialog>

          <Dialog
            open={openDelete}
            handler={handleDeleteOpen}
            className="bg-transparent shadow-none w-fit "
          >
            <Card className="mx-auto w-full ">
              <CardBody className="flex flex-col gap-4 pb-20">
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="text-center"
                >
                  Delete Department
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <div className=" flex flex-row justify-around">
                  <Button
                    className=" bg-yellow-800"
                    onClick={() => setOpenDelete(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    className=" bg-green-600"
                    onClick={handleDeleteconfirmed}
                  >
                    Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Dialog>
        </Card>
      </div>
    </div>
  );
}

export default CustomerRequests;

const TABLE_HEAD = ["Department Name", "Head of Department", "Edit", "Delete"];
