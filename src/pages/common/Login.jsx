import React from 'react'
import login from '../../assests/login.png'
import LoginForm from '../../components/forms/LoginForm'
// import Basic, { LoginForm } from '../../components/forms/Loginform'
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../components/Loading';
import { useNavigate } from 'react-router-dom';

function Login() {  

  const navigate = useNavigate();

  const { loading, admin } = useSelector((state) => state.auth);

  
if (admin) {
  // console.log(admin);
  if (admin.privilege === 'super_admin') {
    navigate('/superAdmin');
  } else if (admin.privilege === 'customer_manager') {
    navigate('/customerManager');
  } else if (admin.privilege === 'event_manager') {
    navigate('/eventManager');
  } else if (admin.privilege === 'stock_manager') {
    navigate('/stockManager');
  } else if (admin.privilege === 'employee_manager') {
    navigate('/employeeManager');
  } else {
    console.log('user not have privilage');
  }
}

const css = 'm-10 p-50 grid justify-center ';

  return loading && admin == null ? (
    <Loading prop={css}/>
  ) : (
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