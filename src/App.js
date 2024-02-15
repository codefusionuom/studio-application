import Dashboard from './pages/customerManager/Dashboard';
import Payment from './pages/customerManager/PaymentsList';
import Layout from './global/Layout';
import { Button } from '@material-tailwind/react';
import PaymentDetails from './pages/customerManager/paymentDetails';
import CustomerManager from './pages/customerManager';
import { Route, Routes } from 'react-router-dom';
import { customerList, superAdminList } from './global/Layout/data';
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

import EmployeeManagerDashboard from './pages/employeeManager/dashboard';
import EmployeePayment from './pages/employeeManager/payment';
import Attendance from './pages/employeeManager/attendance';

import EventManagerDashboard from './pages/eventManager/EventManagerdashboard';
import EventRequests from './pages/eventManager/eventRequests';
import EventManagerEventCalendar from './pages/eventManager/eventManagerEventCalendar';
import EventManagerEvents from './pages/eventManager/eventManagerEvents';
import CreateEvent from './pages/eventManager/createEvent';
import CreateEvent2 from './pages/eventManager/createEvent2';


function App() {
  return (
<>
    <Routes>
    <Route path="/" element={<div>login</div>}>
        
        </Route>
      <Route path="/customerManager" element={<CustomerManager />}>
        <Route  path="/customerManager/" element={<CustomerManagerDashboard />} />
        <Route  path="/customerManager/customers" element={<Customers />} />
        <Route   path="/customerManager/paymentDetails/:id" element={<PaymentDetails />} />
        <Route  path="/customerManager/eventCalandar" element={<EventCalandar />} />
        <Route   path="/customerManager/createCustomerRequest" element={<CreateCustomerRequest />} />
        <Route   path="/customerManager/paymentList" element={<PaymentList />} />
        <Route  path="/customerManager/customerRequest" element={<CustomerRequests />} />
      </Route>

      <Route path="/eventManager" element={<EventManager/>}>
        <Route path="/eventManager" element={<EventManagerDashboard/>}/>
        <Route path="/eventManager/eventRequests" element={<EventRequests />}/>
        <Route path="/eventManager/eventCalandar" element={<EventManagerEventCalendar/>} />
        <Route path="/eventManager/Events" element={<EventManagerEvents/>} />
        <Route  path='/eventManager/createEvent' element={<CreateEvent />} />
        <Route  path='/eventManager/createEvent2' element={<CreateEvent2/>} />
      </Route>
      
      <Route path="/stockManager" element={<StockManager />}>
        
      </Route>
      <Route path="/employeeManager" element={<EmployeeManager />}>
        <Route  path="/employeeManager/" element={<EmployeeManagerDashboard />} />
        <Route  path="/employeeManager/payment" element={<EmployeePayment />} />
        <Route  path='/employeeManager/attendance' element={<Attendance />} />
        
        
      </Route>
      <Route path="/superAdmin" element={<SuperAdmin />}>
        
      </Route>
    </Routes>
    
      
 
  
  
    </>
    // another way
    // <Routes>
    //   <Route exact path="cm" >
    //     <Route exact path="/cm/pl" element={<PaymentList/>} />
    //     <Route  path="/cm/ch" element={<CustomerRequests/>} />
    //   </Route>
    // </Routes>
    
  );
}
{/* <Layout sections={customerList}/>  */ }
export default App;
