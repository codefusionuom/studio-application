import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from '@material-tailwind/react';
import axios from 'axios';
import EditButton from '../../../components/cards/buttons/EditButton';
import axiosInstance from '../../../config/axios.config';

function AddAdminEdit({passId,setRefresh,setEditOpen, refresh}) {

  const [formData, setFormData] = useState({
    privileges: '',
    employee: {
      empName: '',
      empNumber: '',
      empAdd: '',
      empType: '',
      empDepartment: '',
      empEmail: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormError] = useState({});
  // const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("superAdmin/admin/" + passId)
      .then((res) => {
        // console.log('response data', res.data);
        // console.log('passId to put',passId);
        const {
          privilege,
            empAdd,
            empType,
            empDepartment,
            empEmail,
            empName,
            empNumber,
        } = res.data;
        // console.log(passId);
        
        setFormData(res.data);
        // console.log('form data', formData);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
      });
  }, []);

  // useEffect(()=>{
  //   console.log('formdata',formData);
  // },[formData])

  function handleSubmit(event) {
    event.preventDefault();
    // let error = validate(data);
    // setFormError(error);
    // console.log(validate(data).iserror, "is error");
    // if (!error.iserror) {
      axiosInstance
        .put("superAdmin/admin/" + passId, formData)
        .then((res) => {
          console.log('res in put',res);
          console.log('form in put',formData);
          alert("data update successfully");
          setEditOpen(false)
          setRefresh(!refresh)
          
          // window.location.replace("/superAdmin/admin");
        })
        .catch((err) => {
          console.log(err);
        console.log(err.response.data.message);});
    }
  // }

  // const validate = (values) => {
  //   const errors = {};
  //   errors.iserror = false;
  //   console.log(values);
  //   if (!values.employeeId) {
  //     errors.employeeId = "employeeId is required!";
  //     errors.iserror = true;
  //   } else if (!/^e-\d{3}$/.test(values.employeeId)) {
  //     errors.employeeId =
  //       "Employee ID should start with 'e-' followed by exactly three digits.";
  //     errors.iserror = true;
  //   }
  //   if (!values.employeeName) {
  //     errors.employeeName = "employee Name is required!";
  //     errors.iserror = true;
  //   }
  //   if (!values.privileges[0]) {
  //     errors.privileges = "privileges is required!";
  //     errors.iserror = true;
  //   }
  //   if (!values.telephone) {
  //     errors.telephone = "telephone is required!";
  //     errors.iserror = true;
  //   } else if (!/^\d{10}$/.test(values.telephone)) {
  //     errors.telephone = "Telephone should be a 10-digit number.";
  //     errors.iserror = true;
  //   }
  //   if (!values.address) {
  //     errors.address = "address is required!";
  //     errors.iserror = true;
  //   }

  //   return errors;
  // };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        privileges: checked
          ? [...prevData.privileges, value]
          : prevData.privileges.filter((privilege) => privilege !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        employee: {
          ...prevData.employee,
          [name]: value,
        },
      }));
    }
  };

  // useEffect(() => {
  //   axiosInstance
  //     .get('employeeManager/getEmployeeByid/' + 3)
  //     .then((res) => {
  //       // console.log('data', res.data);
  //       const { empAdd, empType, empDepartment, empEmail, empName, empNumber } =
  //         res.data;
  //       setFormData((prevData) => ({
  //         ...prevData,
  //         employee: {
  //           ...prevData.employee,
  //           empName: empName,
  //           empNumber: empNumber,
  //           empAdd: empAdd,
  //           empType: empType,
  //           empDepartment: empDepartment,
  //           empEmail: empEmail,
  //         },
  //       }));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const err = 'text-red-500 w-60';
  return (
    <>
      <Card className='mx-auto w-full '>
        <CardBody className='flex flex-col gap-4 pb-20'>
          <Typography variant='h4' color='blue-gray' className='text-center'>
            Make New Admin Account
          </Typography>

          <div className=' flex flex-row justify-between pt-20'>
            <div className='flex flex-col justify-between pl-20 '>
              <Typography className='mb-2' variant='h6'>
                Employee Name :
              </Typography>
              <Input
                label='employee name'
                size='lg'
                name='empName'
                readOnly
                value={formData.empName}
                onChange={onChange}
              />
              <p className={err}>{formErrors.employeeId}</p>
            </div>

            <div className='flex flex-col justify-between pr-20'>
              <Typography className='mb-2' variant='h6'>
                Employee Email :
              </Typography>
              <Input
                label='employee email'
                size='lg'
                name='empEmail'
                readOnly
                value={formData.empEmail}
                onChange={onChange}
              />
              <p className={err}>{formErrors.employeeName}</p>
            </div>
          </div>

          <div className=' flex flex-row justify-between'>
            <div className=' flex flex-col pl-20'>
              <Typography className='mb-2' variant='h6'>
                Privilage :
              </Typography>

              <div className='flex flex-col space-y-2'>
                <Checkbox
                  label='Employee Manager'
                  name='privileges'
                  value='employee_manager'
                  checked={formData.privileges.includes('employee_manager')}
                  onChange={onChange}
                />
                <Checkbox
                  label='Customer Manager'
                  name='privileges'
                  value='customer_manager'
                  checked={formData.privileges.includes('customer_manager')}
                  onChange={onChange}
                />
                <Checkbox
                  label='Event Manager'
                  name='privileges'
                  value='event_manager'
                  checked={formData.privileges.includes('event_manager')}
                  onChange={onChange}
                />
                <Checkbox
                  label='Stock Manager'
                  name='privileges'
                  value='stock_manager'
                  checked={formData.privileges.includes('stock_manager')}
                  onChange={onChange}
                />
                <p className={err}>{formErrors.privileges}</p>
              </div>
            </div>

            <div className=' flex flex-col justify-between pr-20'>
              <Typography className='mb-2' variant='h6'>
                Telephone :
              </Typography>

              <Input
                label='phone number'
                size='lg'
                name='empNumber'
                readOnly
                value={formData.empNumber}
                onChange={onChange}
              />
              <p className={err}>{formErrors.telephone}</p>

              <Typography className='mb-2' variant='h6'>
                Address :
              </Typography>

              <Input
                label='address'
                size='lg'
                name='empAdd'
                readOnly
                value={formData.empAdd}
                onChange={onChange}
              />
              <p className={err}>{formErrors.address}</p>
            </div>
          </div>
        </CardBody>
        <CardFooter className='pt-0'>
          <div className='flex flex-row justify-around'>
            <Button className=' bg-yellow-800'>Cancel</Button>
            <Button
              className=' bg-green-600'
              type='submit'
              onClick={handleSubmit}
            >
              Update
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
export default AddAdminEdit;
