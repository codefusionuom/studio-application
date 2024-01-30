import Dashboard from './pages/customerManager/Dashboard';
import Payment from './pages/customerManager/PaymentsList';
import Layout from './global/Layout';
import { Button } from '@material-tailwind/react';
import PaymentDetails from './pages/customerManager/paymentDetails';
import CustomerManager from './pages/customerManager';

function App() {
  return (
    <div className="bg-bg">

      <Layout>
        {/* welcome bro
        <h1 className="text-3xl font-bold underline bg-red-500 text-cl-2">
        Hello world
        </h1>
        <Button variant='contained' className="bg-bg">hello</Button> */}
        {/* <Dashboard /> */}
        {/* <Payment /> */}
        {/* <PaymentDetails/> */}
        <CustomerManager />
      </Layout>

    </div>


  );
}

export default App;
