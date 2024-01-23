import Layout from './global/Layout';
import { Button } from '@material-tailwind/react';

function App() {
  return (
    <div className="bg-bg">

      <Layout>
        welcome bro
        <h1 className="text-3xl font-bold underline bg-red-500 text-cl-2">
        Hello world
        </h1>
        <Button variant='contained' className="bg-bg">hello</Button>
      </Layout>

    </div>


  );
}

export default App;
