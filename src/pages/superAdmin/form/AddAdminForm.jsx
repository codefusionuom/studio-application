import React, { useState,useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
// import Card2 from "../../../components/cards/Card2";
import axiosInstance from "../../../config/axios.config";

function AddAdminForm({ prop }) {
  // const [open, setOpen] = useState(prop);
  const [formErrors, setFormError] = useState({});
  const [formData, setFormData] = useState({
    privileges: [],
    employee:{
      empName: "",
      empNumber: "",
      empAdd: "",
      empType: "",
      empDepartment: "",
      empEmail: "",
    }
  });
  const [empData, setEmpData] = useState({});



  function handleSubmit(event) {
    event.preventDefault();
    // let error = validate(formData);
    // setFormError(error);
    // console.log(validate(formData).iserror, "is error");
    // if (!error.iserror) {
    //   axiosInstance
    //     .post("http://localhost:5000/superAdmin/admin", formData)
    //     .then((res) => {
    //       alert("data added successfully");
    //       window.location.replace("/superAdmin/admin");
    //     })
    //     .catch((err) => {
    //       console.log(err.response.data.message);
    //       console.log("data enter error");
    //     });
    // }
    console.log(formData);
  }

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

  const handleClear = () => {
    console.log('Handling clear');
    setFormData({
      privileges: [],
      employee: {
        empName: '',
        empNumber: '',
        empAdd: '',
        empType: '',
        empDepartment: '',
        empEmail: '',
      },
    });
  };

  const err = "text-red-500 w-60";

  useEffect(() => {
    axiosInstance
      .get('employeeManager/getEmployeeByid/' + 6)
      .then((res) => {
        console.log('data',res.data);
        setEmpData(res.data);
        console.log('empdata',empData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
                value={formData.employee.empName}
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
                value={formData.employee.empEmail}
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
                value={formData.employee.empNumber}
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
                value={formData.employee.empAdd}
                onChange={onChange}
              />
              <p className={err}>{formErrors.address}</p>
            </div>
          </div>
        </CardBody>
        <CardFooter className='pt-0'>
          <div className='flex flex-row justify-around'>
            <Button className=' bg-yellow-800' onClick={handleClear}>
              Clear
            </Button>
            <Button
              className=' bg-green-600'
              type='submit'
              onClick={handleSubmit}
            >
              Create
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
export default AddAdminForm;
