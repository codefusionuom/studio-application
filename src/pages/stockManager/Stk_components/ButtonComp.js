import React from 'react';
import { Button } from '@material-tailwind/react';

function ButtonComp({ color, text }) {
  return (
    <Button color={color} className=' ' type='submit'>{text}</Button>
  );
}

export default ButtonComp;
