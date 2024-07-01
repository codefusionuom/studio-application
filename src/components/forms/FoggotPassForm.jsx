import React, { useState } from 'react';
import { Typography, Input, Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axios.config';

export function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('false');

  const backToLogin = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axiosInstance.post('/foggotPassword', { email });
      console.log('OTP sent successfully:', response.data);
      alert('OTP sent successfully!');
      setEmail('');
      setSuccess(true);
    } catch (err) {
      console.error('Error sending OTP:', err);
      setError('Failed to send OTP. Please try again.');
    }
  };

  return success ? (
    <div>sucess</div>
  ) : (
    <section className='grid text-center items-center p-8'>
      <div>
        <Typography variant='h3' color='blue-gray' className='mb-2'>
          Forgot Password?
        </Typography>
        <Typography className='mb-16 text-gray-600 font-normal text-[18px]'>
          Enter your email address to get the OTP code.
        </Typography>
        <form
          onSubmit={handleSubmit}
          className='mx-auto max-w-[24rem] text-left'
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='name@mail.com'
              className='w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200'
              labelProps={{
                className: 'hidden',
              }}
              required
            />
          </div>
          {error && (
            <Typography className='text-red-500 mb-4'>{error}</Typography>
          )}
          <Button
            size='lg'
            type='submit'
            className='mt-6 text-base font-semibold border-primary uppercase lowercase-mixed text-primary bg-white hover:bg-primary hover:border-white hover:text-white'
            fullWidth
          >
            send OTP
          </Button>
          <div className='!mt-4 flex justify-center'>
            <Typography
              as='a'
              color='blue-gray'
              variant='small'
              className='font-medium'
              onClick={backToLogin}
            >
              Back to login
            </Typography>
          </div>
        </form>
      </div>
    </section>
  );
}

export default LoginForm;
