import React, { useEffect, useState } from 'react';
import { Input, Typography, Select, Option } from '@material-tailwind/react';
import { Card } from '@material-tailwind/react';
import { Button } from '@material-tailwind/react';

import { useDispatch, useSelector } from 'react-redux';
import { login, loadUser, clearAuthState } from '../../app/authSlice';
import axiosInstance from '../../config/axios.config';

function Profile({ setProfile }) {
  const [data, setData] = useState({});

  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  const { loading, admin } = authState;

    useEffect(() => {
      setData({
        id: admin.id,
        empName: admin.empName,
        empEmail: admin.empEmail,
        empAdd: admin.empAdd,
        empNumber: admin.empNumber,
      });
    }, [admin]);

  const onChange = (e) => {
     const { name, value } = e.target;
     setData((prevData) => ({
       ...prevData,
       [name]: value,
     }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(data);
    axiosInstance
      .put('employeeManager/updateEmployee/' + data.id, data)
      .then((res) => {
        alert('data update successfully');
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
      });
  };

  return (
    <Card className='mb-5'>
      <section className='px-8 py-20 container mx-auto'>
        <Typography variant='h5' color='blue-gray'>
          Profile Information
        </Typography>
        <Typography variant='small' className='text-gray-600 font-normal mt-1'>
          Update your profile information below.
        </Typography>
        <div className='flex flex-col mt-8'>
          <div className='mb-6 flex flex-col items-end gap-4 md:flex-row'>
            <div className='w-full'>
              <Typography
                variant='small'
                color='blue-gray'
                className='mb-2 font-medium'
              >
                Name
              </Typography>
              <Input
                size='lg'
                placeholder='Emma'
                value={data.empName}
                name='empName'
                onChange={onChange}
                labelProps={{
                  className: 'hidden',
                }}
                className='w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200'
              />
            </div>
            <div className='w-full'>
              <Typography
                variant='small'
                color='blue-gray'
                className='mb-2 font-medium'
              >
                Email
              </Typography>
              <Input
                size='lg'
                placeholder='emma@mail.com'
                value={data.empEmail}
                onChange={onChange}
                name='empEmail'
                labelProps={{
                  className: 'hidden',
                }}
                className='w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200'
              />
            </div>
          </div>
          <div className='mb-6 flex flex-col items-end gap-4 md:flex-row'>
            <div className='w-full'>
              <Typography
                variant='small'
                color='blue-gray'
                className='mb-2 font-medium'
              >
                Address
              </Typography>
              <Input
                size='lg'
                placeholder='Florida, USA'
                value={data.empAdd}
                onChange={onChange}
                name='empAdd'
                labelProps={{
                  className: 'hidden',
                }}
                className='w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200'
              />
            </div>
            <div className='w-full'>
              <Typography
                variant='small'
                color='blue-gray'
                className='mb-2 font-medium'
              >
                Phone Number
              </Typography>
              <Input
                size='lg'
                placeholder='+123 0123 456 789'
                value={data.empNumber}
                name='empNumber'
                onChange={onChange}
                labelProps={{
                  className: 'hidden',
                }}
                className='w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200'
              />
            </div>
          </div>
          <div className='flex flex-col items-end gap-4 md:flex-row'>
            <div className='w-full'>
              <Typography
                variant='small'
                color='blue-gray'
                className='mb-2 font-medium'
              >
                Department
              </Typography>
              <Input
                size='lg'
                placeholder='Language'
                value={admin.empDepartment}
                readOnly
                labelProps={{
                  className: 'hidden',
                }}
                className='w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200'
              />
            </div>
            <div className='w-full'>
              <Typography
                variant='small'
                color='blue-gray'
                className='mb-2 font-medium'
              >
                Type
              </Typography>
              <Select
                label='Select Type'
                size='lg'
                disabled
                value={admin.empType}
              >
                <Option value='Part-Time'>Part-Time</Option>
                <Option value='Full-Time'>Full-Time</Option>
              </Select>
            </div>
          </div>
          <div className='flex justify-around mt-10'>
            <div color='gray'>
              <Button
                className='bg-gray-500 text-white hover:bg-gray-700'
                onClick={() => {
                  setProfile(false);
                }}
              >
                Back
              </Button>
            </div>
            <Button
              className=' bg-green-600'
              type='submit'
              onClick={handleSubmit}
            >
              Update
            </Button>
          </div>
        </div>
      </section>
    </Card>
  );
}

export default Profile;
