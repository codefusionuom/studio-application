import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, loadUser, clearAuthState } from '../../app/authSlice';
import { Typography, Input, Button } from '@material-tailwind/react';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import {Loading} from '../Loading';

export function LoginForm() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [log, setLog] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });
    const [error, setError] = useState('');

  const { email, password } = data;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authState = useSelector((state) => state.auth);
  const { loading, admin } = authState;

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      await dispatch(loadUser());
      setLog(true);

    } catch (err) {
      console.error('Error resetting password:', err);
      setError(
        err.response?.data?.message ||
          'Failed to login password. Please try again.'
      );
    }
  };

    // useEffect(() => {
    //   if (admin) {
    //     if (admin.privileges[0] === 'super_admin') {
    //       navigate('/superAdmin');
    //     } else if (admin.privileges[0] === 'customer_manager') {
    //       navigate('/customerManager');
    //     } else if (admin.privileges[0] === 'event_manager') {
    //       navigate('/eventManager');
    //     } else if (admin.privileges[0] === 'stock_manager') {
    //       navigate('/stockManager');
    //     } else if (admin.privileges[0] === 'employee_manager') {
    //       navigate('/employeeManager');
    //     } else {
    //       console.log('user not have privilage');
    //     }
    //   }
    // }, [log]);

  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const FoggotPasswordPage = () => {
    navigate('/foggotPassword');
  };

  return (
    <section className='grid text-center items-center p-8'>
      <div>
        <Typography variant='h3' color='blue-gray' className='mb-2'>
          Studio Management System
        </Typography>
        <Typography className='mb-16 text-gray-600 font-normal text-[18px]'>
          Enter your email and password to sign in
        </Typography>
        {error && (
          <Typography className='text-red-500 mb-4'>{error}</Typography>
        )}
        <form
          action='#'
          className='mx-auto max-w-[24rem] text-left'
          onSubmit={submit}
        >
          <div className='mb-9'>
            <label htmlFor='email'>
              <Typography
                variant='small'
                className='mb-2 block font-medium text-gray-900'
              >
                Your Email
              </Typography>
            </label>
            <Input
              id='email'
              color='gray'
              size='lg'
              type='email'
              name='email'
              onChange={onChange}
              placeholder='name@mail.com'
              className='w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200'
              labelProps={{
                className: 'hidden',
              }}
            />
          </div>
          <div className='mb-11'>
            <label htmlFor='password'>
              <Typography
                variant='small'
                className='mb-2 block font-medium text-gray-900'
              >
                Password
              </Typography>
            </label>
            <Input
              size='lg'
              placeholder='********'
              id='password'
              name='password'
              onChange={onChange}
              labelProps={{
                className: 'hidden',
              }}
              className='w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200'
              type={passwordShown ? 'text' : 'password'}
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <EyeIcon className='h-5 w-5' />
                  ) : (
                    <EyeSlashIcon className='h-5 w-5' />
                  )}
                </i>
              }
            />
          </div>
          <Button
            size='lg'
            className='mt-6 text-base font-semibold border-primary uppercase lowercase-mixed text-primary bg-white hover:bg-primary hover:border-white hover:text-white'
            fullWidth
            type='submit'
            // onClick={submit}
          >
            sign in
          </Button>
          <div className='!mt-4 flex justify-end'>
            <Typography
              as='a'
              color='blue-gray'
              variant='small'
              className='font-medium'
              onClick={FoggotPasswordPage}
            >
              Forgot password
            </Typography>
          </div>
        </form>
      </div>
    </section>
  );
}

export default LoginForm;
