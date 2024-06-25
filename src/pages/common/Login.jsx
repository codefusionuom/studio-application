import React from 'react'
import login from '../../assests/login.png'
import LoginForm from '../../components/forms/LoginForm'
// import Basic, { LoginForm } from '../../components/forms/Loginform'

function Login() {
  return (
    <div className='flex items-center justify-center p-32 h-screen'>
      <div className=''>
        <img src={login} alt='login' />
      </div>
      <div className=' pl-32'>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login