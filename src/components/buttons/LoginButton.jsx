import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

export function LoginButton() {
        const navigate = useNavigate();

        const login = () => {
          navigate('/login');
        };
  return (
    <div className='flex w-max gap-4'>
      <Button
        size='lg'
        className='mt-6 text-base font-semibold border-primary uppercase lowercase-mixed text-primary bg-white hover:bg-primary hover:border-white hover:text-white w-96'
        onClick={login}
      >
        sign in
      </Button>
    </div>
  );
}
