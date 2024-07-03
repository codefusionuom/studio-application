import React, {useState} from 'react'
import { Card } from '@material-tailwind/react';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';



function Setting() {

  const [profile,setProfile] = useState(false)

    const navigate = useNavigate();
    const reset = () => {navigate('/foggotPassword');};
    
  return profile ? (
    <div>
      <Profile setProfile={setProfile} />
    </div>
  ) : (
    <Card className='mb-5 min-h-96'>
      <div className='w-3/4 ml-20 mt-10'>
        <Accordion>
          <AccordionHeader onClick={reset}>Reset password</AccordionHeader>
        </Accordion>
      </div>
      <div className='w-3/4 ml-20 mt-10'>
        <Accordion>
          <AccordionHeader onClick={() => setProfile(!profile)}>
            Profile
          </AccordionHeader>
        </Accordion>
      </div>
    </Card>
  );
}

export default Setting
