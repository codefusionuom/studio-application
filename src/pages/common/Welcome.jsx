import React from 'react'
import 'typeface-lato';
import welcome from '../../assests/welcome_page.png'
import { LoginButton } from '../../components/buttons/LoginButton';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  return (
    <div className='flex items-center justify-center p-32 h-screen'>
      <div>
        <img src={welcome} alt='welcome' />
      </div>
      <div>
        <div className='flex flex-col items-center justify-center  pl-32 font-lato'>
          <div className='flex flex-col items-center justify-center font-lato mb-60'>
            <p className='text-8xl font-semibold text-primary mb-7'>Welcome!</p>
            <p className='text-3xl font-normal'>Studio Management System</p>
          </div>
          <LoginButton />
        </div>
      </div>
    </div>
  );
}

export default Welcome
