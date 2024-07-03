import { Spinner } from '@material-tailwind/react';

export function Loading({prop}) {
  return (
    <div className={prop}>
      <Spinner className='h-16 w-16' />
    </div>
  );
}
