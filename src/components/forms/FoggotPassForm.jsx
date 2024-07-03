import React, { useState } from 'react';
import { Typography, Input, Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axios.config';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid';

export function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');

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

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axiosInstance.post('/foggotPassword/reset', {
        password,
        otp,
      });

      // Handle successful response
      console.log('Password reset successfully:', response.data);
      alert('Password reset successfully!');
      setOtp('');
      setConfirmPassword('');
      setPassword('');
      setError('');
      setSuccess(false);
      navigate('/login');
    } catch (err) {
      // Handle error response
      console.error('Error resetting password:', err);
      setError(
        err.response?.data?.message ||
          'Failed to reset password. Please try again.'
      );
    }
  };

  return success ? (
    <div>
      {/* {' '} */}
      {/* ( */}
      <section className='grid text-center items-center p-8'>
        <div>
          <Typography variant='h3' color='blue-gray' className='mb-2'>
            Reset Your Password
          </Typography>
          <Typography className='mb-16 text-gray-600 font-normal text-[18px]'>
            Enter your new password
          </Typography>
          <form
            onSubmit={handleReset}
            className='mx-auto max-w-[24rem] text-left'
            // onSubmit={submit}
          >
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <div className='mb-11'>
              <label htmlFor='password'>
                <Typography
                  variant='small'
                  className='mb-2 block font-medium text-gray-900'
                >
                  Confirm Password
                </Typography>
              </label>
              <Input
                size='lg'
                placeholder='********'
                id='ConPassword'
                name='ConPassword'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            <div className='mb-9'>
              <label htmlFor='email'>
                <Typography
                  variant='small'
                  className='mb-2 block font-medium text-gray-900'
                >
                  OTP
                </Typography>
              </label>
              <Input
                id='otp'
                color='gray'
                size='lg'
                name='otp'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder='0000'
                className='w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200'
                labelProps={{
                  className: 'hidden',
                }}
              />
            </div>
            {error && (
              <Typography className='text-red-500 mb-4'>{error}</Typography>
            )}
            <Button
              size='lg'
              className='mt-6 text-base font-semibold border-primary uppercase lowercase-mixed text-primary bg-white hover:bg-primary hover:border-white hover:text-white'
              fullWidth
              type='submit'
            >
              Reset
            </Button>
            <div className='!mt-4 flex justify-center'>
              <Typography
                as='a'
                color='blue-gray'
                variant='small'
                className='font-medium'
                onClick={(e) => {
                  setSuccess(false);
                }}
              >
                Back
              </Typography>
            </div>
          </form>
        </div>
      </section>
      {/* ); */}
    </div>
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
