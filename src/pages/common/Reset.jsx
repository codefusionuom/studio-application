import React from 'react';
import FoggotPasswordForm from '../../components/forms/FoggotPassForm';
import { Card } from '@material-tailwind/react';

function Reset() {
  return (
    <Card className='m-4 min-h-[650px] flex justify-center items-center'>
        <FoggotPasswordForm />
    </Card>
  );
}

export default Reset;
