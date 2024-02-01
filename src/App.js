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

function App() {
  return (

    <Routes>
      <Route path="/customerManager" element={<CustomerManager />}>
        <Route index={true} path="/customerManager/" element={<CustomerManagerDashboard />} />
        <Route index={false}  path="/customerManager/customers" element={<Customers />} />
        <Route index={false}  path="/customerManager/paymentDetails" element={<PaymentDetails />} />
        <Route index={false}  path="/customerManager/eventCalandar" element={<EventCalandar />} />
        <Route index={false}  path="/customerManager/createCustomerRequest" element={<CreateCustomerRequest />} />
        <Route index={false}  path="/customerManager/paymentList" element={<PaymentList />} />
        <Route index={false}  path="/customerManager/customerRequest" element={<CustomerRequests />} />
      </Route>
    </Routes>


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
