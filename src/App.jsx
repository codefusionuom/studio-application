import React, { useEffect } from 'react';
import PaymentDetails from './pages/customerManager/paymentDetails';
import CustomerManager from './pages/customerManager';
import { Route, Routes } from 'react-router-dom';
import PaymentList from './pages/customerManager/PaymentsList';
import CustomerRequests from './pages/customerManager/CustomerRequests';
import CustomerManagerDashboard from './pages/customerManager/Dashboard';
import CreateCustomerRequest from './pages/customerManager/CreateCustomerRequest';
import EventCalandar from './pages/customerManager/EventCalandar';
import Customers from './pages/customerManager/Customers';
import EventManager from './pages/eventManager';
import StockManager from './pages/stockManager';
import EmployeeManager from './pages/employeeManager';
import SuperAdmin from './pages/superAdmin';
import DashboardSmgr from './pages/stockManager/Stk_dashboard';
import Category from './pages/stockManager/Stk_category';
import SMpayment from './pages/stockManager/Stk_payment';
import SMpaymentDetails from './pages/stockManager/Stk_paymentDetail';
import GrnStock from './pages/stockManager/Stk_grn';
import StockItem from './pages/stockManager/Stk_StockItem';
import Suppliers from './pages/stockManager/Stk_supplier';
import ReturnedStock from './pages/stockManager/Stk_returnedStock';
import FormComp from './pages/stockManager/Stk_components/FormComp';

import { Provider, useDispatch } from 'react-redux';
import { loadUser } from './app/authSlice';

import Welcome from './pages/common/Welcome';
import Login from './pages/common/Login';
import FoggotPassword from './pages/common/FoggotPassword';

import EmployeeManagerDashboard from './pages/employeeManager/dashboard';
import EmployeePayment from './pages/employeeManager/payment';
import Attendance from './pages/employeeManager/attendance/attendance';
import SuperAdminDashboard from './pages/superAdmin/Dashboard';
import SuperAdminAdmins from './pages/superAdmin/admin';
import SuperAdminEventCalandar from './pages/superAdmin/EventCalander';
import SuperAdminDepartment from './pages/superAdmin/Department';

import EventManagerDashboard from './pages/eventManager/EventManagerdashboard';
import EventRequests from './pages/eventManager/eventRequests';
import EventManagerEventCalendar from './pages/eventManager/eventManagerEventCalendar';
import EventManagerEvents from './pages/eventManager/eventManagerEvents';
import PrivateRoute from './components/routing/PrivateRoute';
import { store } from './app/store';
import Setting from './pages/common/Setting';
import Reset from './pages/common/Reset';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Welcome />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/foggotPassword' element={<FoggotPassword />}></Route>

      {/* cusomer managerr */}
      <Route
        path='/customerManager'
        element={
          <PrivateRoute requiredPrivilege='customer_manager'>
            <CustomerManager />
          </PrivateRoute>
        }
      >
        <Route
          path='/customerManager'
          element={<CustomerManagerDashboard />}
        ></Route>
        <Route path='/customerManager/customers' element={<Customers />} />
        <Route
          path='/customerManager/paymentDetails/:id'
          element={<PaymentDetails />}
        />
        <Route
          path='/customerManager/eventCalandar'
          element={<EventCalandar />}
        />
        <Route
          path='/customerManager/createCustomerRequest'
          element={<CreateCustomerRequest />}
        />
        <Route path='/customerManager/paymentList' element={<PaymentList />} />
        <Route
          path='/customerManager/customerRequest'
          element={<CustomerRequests />}
        />
      </Route>

      {/* event managerr */}
      <Route
        path='/eventManager'
        element={
          <PrivateRoute requiredPrivilege='event_manager'>
            <EventManager />
          </PrivateRoute>
        }
      >
        <Route path='/eventManager' element={<EventManagerDashboard />} />
        <Route path='/eventManager/eventRequests' element={<EventRequests />} />
        <Route
          path='/eventManager/eventCalandar'
          element={<EventManagerEventCalendar />}
        />
        <Route path='/eventManager/Events' element={<EventManagerEvents />} />
        <Route path='/eventManager/setting' element={<Setting />} />
      </Route>

      {/* stock manager */}
      <Route
        path='/stockManager'
        element={
          <PrivateRoute requiredPrivilege='stock_manager'>
            <StockManager />
          </PrivateRoute>
        }
      >
        <Route index={true} path='/stockManager/' element={<DashboardSmgr />} />
        <Route
          index={false}
          path='/stockManager/category'
          element={<Category />}
        />
        <Route
          index={false}
          path='/stockManager/paymentDetails'
          element={<SMpaymentDetails />}
        />
        <Route
          index={false}
          path='/stockManager/payment'
          element={<SMpayment />}
        />
        <Route index={false} path='/stockManager/grn' element={<GrnStock />} />
        <Route
          index={false}
          path='/stockManager/returnedStock'
          element={<ReturnedStock />}
        />
        <Route
          index={false}
          path='/stockManager/stockItem'
          element={<StockItem />}
        />
        <Route
          index={false}
          path='/stockManager/supplier'
          element={<Suppliers />}
        />

        <Route path='/stockManager/setting' element={<Setting />} />
      </Route>

      {/* employee manager */}
      <Route
        path='/employeeManager'
        element={
          <PrivateRoute requiredPrivilege='employee_manager'>
            <EmployeeManager />
          </PrivateRoute>
        }
      >
        <Route
          path='/employeeManager/'
          element={<EmployeeManagerDashboard />}
        />
        <Route path='/employeeManager/payment' element={<EmployeePayment />} />
        <Route path='/employeeManager/attendance' element={<Attendance />} />
        <Route path='/employeeManager/setting' element={<Setting />} />
      </Route>

      {/* super admin */}
      <Route
        path='/superAdmin'
        element={
          <PrivateRoute requiredPrivilege='super_admin'>
            <SuperAdmin />
          </PrivateRoute>
        }
      >
        <Route path='/superAdmin' element={<SuperAdminDashboard />} />
        <Route path='/superAdmin/admin' element={<SuperAdminAdmins />} />
        <Route
          path='/superAdmin/EventCalander'
          element={<SuperAdminEventCalandar />}
        />
        <Route
          path='/superAdmin/Department'
          element={<SuperAdminDepartment />}
        />
        <Route path='/superAdmin/setting' element={<Setting />} />
        <Route path='/superAdmin/reset' element={<Reset />} />
      </Route>
    </Routes>
  );
}

export default App;
