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
import DashboardSmgr from './pages/stockManager/Stk_dashboard';
import Category from './pages/stockManager/Stk_category';
import SMpayment from './pages/stockManager/Stk_payment';
import SMpaymentDetails from './pages/stockManager/Stk_paymentDetail';
import GrnStock from './pages/stockManager/Stk_grn';
import StockItem from './pages/stockManager/Stk_StockItem';
import Suppliers from './pages/stockManager/Stk_supplier';
import ReturnedStock from './pages/stockManager/Stk_returnedStock';
import FormComp from './pages/stockManager/Stk_components/FormComp';




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
      <Route path="/eventManager" element={<EventManager />}>
        
      </Route>
      
      <Route path="/stockManager" element={<StockManager />}>
        <Route index={true} path="/stockManager/" element={<DashboardSmgr />} />
        <Route index={false}  path="/stockManager/category" element={<Category />} />
        <Route index={false}  path="/stockManager/paymentDetails" element={<SMpaymentDetails />} />
        <Route index={false}  path="/stockManager/payment" element={<SMpayment />} />
        <Route index={false}  path="/stockManager/grn" element={<GrnStock />} />
        <Route index={false}  path="/stockManager/returnedStock" element={<ReturnedStock />} />
        <Route index={false}  path="/stockManager/stockItem" element={<StockItem />} />
        <Route index={false}  path="/stockManager/supplier" element={<Suppliers />} />
        <Route index={false}  path="/stockManager/form" element={<FormComp />} />
      </Route>
    
      <Route path="/employeeManager" element={<EmployeeManager />}>
        
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
