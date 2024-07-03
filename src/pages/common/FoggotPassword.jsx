import React from 'react'
import foggotPass from '../../assests/fogot password.png'
import FoggotPassForm from '../../components/forms/FoggotPassForm'

function FoggotPassword() {

  return (
    <div className='flex items-center justify-center p-32 h-screen'>
      <div className='m-4'>
        <img src={foggotPass} alt='' />
      </div>
      <div className='m-4'>
        <FoggotPassForm />
      </div>
    </div>
  );
}

export default FoggotPassword
