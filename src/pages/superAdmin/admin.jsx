import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Dialog,
} from '@material-tailwind/react';
import AddAdminForm from './form/AddAdminForm';
import AddAdminEdit from './form/AddAdminEdit';
import axios from 'axios';
import DeleteButton from '../../components/cards/buttons/DeleteButton';
import axiosInstance from '../../config/axios.config';
import Card2 from '../../components/cards/Card2';
import EditButton from '../../components/cards/buttons/EditButton';
// import {handleOpen} from './form/AddAdminForm'
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleEditOpen = (record) => {
    setSelectedRecord(record);
    // console.log('edit open clicked',editOpen);
    // console.log('select record', selectedRecord);
    // console.log('record',record);
    setEditOpen(!editOpen);
  };

  useEffect(() => {
    console.log('select record', selectedRecord);
  }, [selectedRecord]);

  useEffect(() => {
    console.log('record', records);
  }, [records]);

  useEffect(() => {
    axiosInstance
      .get('superAdmin/admin')
      .then((res) => {
        console.log('response data', res.data);
        // for (let data of res.data) {
        //   console.log(data);
        //   setRecords((prevData) => [...prevData, data]);
        //   console.log(records);
        // }
        // addRecordsIncrementally(res.data);
        // res.data.forEach((item, index) => {
        //   // Update the state incrementally
        //   setTimeout(() => {
        //     setRecords(prevRecords => [...prevRecords, item]);
        //   }, index * 100); // Slight delay to simulate incremental update
        // });
        setRecords(res.data);
        // console.log();
        // console.log('records', records);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addRecordsIncrementally = (data) => {
    data.forEach((item, index) => {
      setTimeout(() => {
        setRecords((prevRecords) => {
          const newRecords = [...prevRecords, item];
          console.log('adding record', item);
          console.log('new records state', newRecords);
          //  return newRecords;
        });
      }, index * 100); // Adding slight delay for each item
    });
  };

  return (
    <div className='flex flex-col gap-10'>
      {/* ****************************form card************************************* */}
      <Card2
        title1='CREATE ADMIN'
        title2={'Make new admin account'}
        onClick={handleOpen}
      />
      <Dialog
        open={open}
        handler={handleOpen}
        className='bg-transparent shadow-none w-fit '
        setOpen={setOpen}
      >
        <AddAdminForm setOpen={setOpen} />
      </Dialog>

      {/* *********************************table*********************************** */}
      <div>
        <Card className=' w-full border-2 rounded'>
          <CardHeader floated={false} shadow={false} className='rounded-none'>
            <div className='flex flex-col items-center justify-between gap-4  md:flex-row '>
              <Typography className='text-2xl'>Admin List</Typography>
            </div>
          </CardHeader>
          <CardBody className='overflow-scroll px-0'>
            <table className='mt-4 w-full min-w-max table-auto text-left'>
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={index}
                      className='cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50'
                    >
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='flex items-center justify-between gap-2 font-normal leading-none opacity-70'
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {records?.length > 0 &&
                  records.map((records, index) => {
                    const isLast = index === records.length - 1;
                    const classes = isLast
                      ? 'p-4'
                      : 'p-4 border-b border-blue-gray-50';

                    return (
                      <tr key={records.empId}>
                        <td className={classes}>
                          <div className='flex items-center gap-3'>
                            <div className='flex flex-col'>
                              {/* employee name and privilage */}
                              <Typography
                                variant='small'
                                color='blue-gray'
                                className='font-normal'
                              >
                                {records.empName}
                              </Typography>

                              <Typography
                                variant='small'
                                color='blue-gray'
                                className='font-normal opacity-70'
                              >
                                {records.privilege}
                              </Typography>
                            </div>
                          </div>
                        </td>

                        {/* employee id */}
                        <td className={classes}>
                          <div className='flex flex-col'>
                            <Typography
                              variant='small'
                              color='blue-gray'
                              className='font-normal'
                            >
                              {records.empEmail}
                            </Typography>
                          </div>
                        </td>

                        {/* telephone */}
                        <td className={classes}>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'
                          >
                            {records.empNumber}
                          </Typography>
                        </td>

                        {/* department */}
                        {/* <td className={classes}>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'
                          >
                            {records.employee.empDepartment}
                          </Typography>
                        </td> */}

                        {/* edit button */}
                        <td className={classes}>
                          <EditButton onClick={() => handleEditOpen(records)} />

                          {/* <AddAdminEdit passId={records.id} />  */}
                        </td>

                        {/* delete button  */}
                        <td className={classes}>
                          <DeleteButton
                            onClick={() => handleSubmit(records.empId)}
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

      {/* Edit Dialog */}
      <Dialog
        open={editOpen}
        handler={handleEditOpen}
        className='bg-transparent shadow-none w-fit '
      >
        {selectedRecord && <AddAdminEdit passId={selectedRecord.empId} />}
      </Dialog>
    </div>
  );

  // delete
  function handleSubmit(id) {
    const conf = window.confirm('do you wnat to delete');
    if (conf) {
      console.log(id);
      axiosInstance
        .delete('superAdmin/admin/' + id)
        .then((res) => {
          alert('record deleted');
          window.location.replace('/superAdmin/admin');
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response.data.message);
        });
    }
  }
}

export default Admin;

const TABLE_HEAD = [
  'Name',
  'Employee ID',
  'Phone Number',
  // 'Department',
  '',
  '',
];
