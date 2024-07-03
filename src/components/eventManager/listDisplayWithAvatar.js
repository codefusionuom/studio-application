import { Avatar, Button, Card, CardBody, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, List, ListItem, ListItemPrefix, ListItemSuffix, Typography } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect } from 'react';

const DisplayListWithAvatar = ({ itemList, setAsignedEmployeesList, displayField1, displayField2 }) => {
  const [existError, setExistError] = React.useState(null);
  const [openViewTasks, setOpenViewTasks] = React.useState(false);
  const [assignTasks, setAssignTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleOpenViewTasks = () => setOpenViewTasks(!openViewTasks);

  const handleRemoveItem = (id) => {
    const updatedEmployeeList = itemList.filter(item => item.id !== id);
    setAsignedEmployeesList(updatedEmployeeList);
  }

  useEffect(() => {
    console.log("assignTasks state has been updated:", assignTasks);
  }, [assignTasks]);

  const getAssignTasks = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/eventManager/employee-asignedTasks", { params: { emplyId: id } });
      setAssignTasks(res.data.assignedTasks);
    } catch (error) {
      setExistError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full overflow-y-auto mx-2 mt-8 max-h-80">
      {itemList.map(employee => (
        <ListItem key={employee.id} ripple={false} className="w-11/12 flex justify-between items-center py-1 pr-1 pl-4 bg-gray-200 my-2.5">
          <div className="flex items-center">
            <ListItemPrefix>
              <Avatar variant="circular" alt="employee" src="https://docs.material-tailwind.com/img/face-1.jpg" />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                {employee[displayField1]}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                @ {employee[displayField2]} Department
              </Typography>
            </div>
          </div>
          <ListItemSuffix className="flex items-center">
            <IconButton variant="text" color="blue-gray" onClick={() => handleRemoveItem(employee.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                  clipRule="evenodd"
                />
              </svg>
            </IconButton>
            <IconButton
              variant="text"
              color="blue-gray"
              className="ml-2"
              onClick={() => {
                handleOpenViewTasks();
                getAssignTasks(employee.id);
              }}
            >
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd"/>
              </svg>
            </IconButton>

            <Dialog open={openViewTasks} handler={handleOpenViewTasks}>
              <DialogHeader className="flex justify-center">Assigned Tasks</DialogHeader>
              <DialogBody>
                <Card className="w-full max-w-4xl mx-auto mt-1 h-1/3 overflow-y-auto">
                  <CardBody>
                    <List>
                      {loading ? (
                        <div className="flex justify-center items-center h-full p-10">
                          <div className="max-w-full animate-pulse">
                            <Typography as="div" variant="h1" className="mb-4 h-3 w-56 rounded-full bg-gray-300">&nbsp;</Typography>
                            <Typography as="div" variant="paragraph" className="mb-2 h-2 w-72 rounded-full bg-gray-300">&nbsp;</Typography>
                            <Typography as="div" variant="paragraph" className="mb-2 h-2 w-72 rounded-full bg-gray-300">&nbsp;</Typography>
                            <Typography as="div" variant="paragraph" className="mb-2 h-2 w-72 rounded-full bg-gray-300">&nbsp;</Typography>
                            <Typography as="div" variant="paragraph" className="mb-2 h-2 w-72 rounded-full bg-gray-300">&nbsp;</Typography>
                          </div>
                        </div>
                      ) : assignTasks.length === 0 ? (
                        <Typography variant="paragraph" className="text-center">
                          No assigned tasks found.
                        </Typography>
                      ) : (
                        assignTasks.map(task => (
                          <ListItem key={task.id} className="flex justify-between items-center py-2 px-4 bg-gray-100 my-2 rounded-md">
                            <div className="flex items-center">
                              <ListItemPrefix>
                                <Avatar variant="circular" alt="task" src="https://docs.material-tailwind.com/img/face-1.jpg" />
                              </ListItemPrefix>
                              <div className="ml-4">
                                <Typography variant="h6" color="blue-gray">
                                  {task.taskName}
                                </Typography>
                                <Typography variant="small" color="gray" className="font-normal">
                                  Service Type: {task.serviceType}
                                </Typography>
                                <Typography variant="small" color="gray" className="font-normal">
                                  Assigned Date: {new Date(task.createdAt).toLocaleDateString()}
                                </Typography>
                              </div>
                            </div>
                            <ListItemSuffix>
                              <IconButton variant="text" color="blue-gray">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                  <path
                                    fillRule="evenodd"
                                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </IconButton>
                            </ListItemSuffix>
                          </ListItem>
                        ))
                      )}
                    </List>
                  </CardBody>
                </Card>
              </DialogBody>
              <DialogFooter>
                <Button variant="gradient" color="green" onClick={handleOpenViewTasks}>
                  <span>Go Back</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </ListItemSuffix>
        </ListItem>
      ))}
    </div>
  );
}

export default DisplayListWithAvatar;
