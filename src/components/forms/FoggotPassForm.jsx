import { Typography, Input, Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

export function LoginForm() {
  const navigate = useNavigate();

  const backToLogin = () => {
    navigate('/login');
  };

  return (
    <section className='grid text-center items-center p-8'>
      <div>
        <Typography variant='h3' color='blue-gray' className='mb-2'>
          Forgot Password?
        </Typography>
        <Typography className='mb-16 text-gray-600 font-normal text-[18px]'>
          Enter your email address to get the OTP code.
        </Typography>
        <form action='#' className='mx-auto max-w-[24rem] text-left'>
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
              placeholder='name@mail.com'
              className='w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200'
              labelProps={{
                className: 'hidden',
              }}
            />
          </div>
          <Button
            size='lg'
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
