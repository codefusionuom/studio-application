import React from 'react';
// @material-tailwind/react
import {
  Input,
  Typography,
  Select,
  Option,
  Popover,
  PopoverHandler,
  PopoverContent,
} from '@material-tailwind/react';
import { Card } from '@material-tailwind/react';
import { Button } from '@material-tailwind/react';

// day picker
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';

// @heroicons/react
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

function Profile({ setProfile }) {
  return (
    <Card className='mb-5'>
      <section className='px-8 py-20 container mx-auto'>
        <Typography variant='h5' color='blue-gray'>
          Profile Information
        </Typography>
        {/* <Typography variant='small' className='text-gray-600 font-normal mt-1'>
          Update your profile information below.
        </Typography> */}
        <div className='flex flex-col mt-8'>
          <div className='mb-6 flex flex-col items-end gap-4 md:flex-row'>
            <div className='w-full'>
              <Typography
                variant='small'
                color='blue-gray'
                className='mb-2 font-medium'
              >
                Name
              </Typography>
              <Input
                size='lg'
                placeholder='Emma'
                labelProps={{
                  className: 'hidden',
                }}
                className='w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200'
              />
            </div>
            <div className='w-full'>
              <Typography
                variant='small'
                color='blue-gray'
                className='mb-2 font-medium'
              >
                Email
              </Typography>
              <Input
                size='lg'
                placeholder='emma@mail.com'
                labelProps={{
                  className: 'hidden',
                }}
                className='w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200'
              />
            </div>
          </div>
          <div className='mb-6 flex flex-col items-end gap-4 md:flex-row'>
            <div className='w-full'>
              <Typography
                variant='small'
                color='blue-gray'
                className='mb-2 font-medium'
              >
                Address
              </Typography>
              <Input
                size='lg'
                placeholder='Florida, USA'
                labelProps={{
                  className: 'hidden',
                }}
                className='w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200'
              />
            </div>
            <div className='w-full'>
              <Typography
                variant='small'
                color='blue-gray'
                className='mb-2 font-medium'
              >
                Phone Number
              </Typography>
              <Input
                size='lg'
                placeholder='+123 0123 456 789'
                labelProps={{
                  className: 'hidden',
                }}
                className='w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200'
              />
            </div>
          </div>
          <div className='flex flex-col items-end gap-4 md:flex-row'>
            <div className='w-full'>
              <Typography
                variant='small'
                color='blue-gray'
                className='mb-2 font-medium'
              >
                Department
              </Typography>
              <Input
                size='lg'
                placeholder='Language'
                labelProps={{
                  className: 'hidden',
                }}
                className='w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200'
              />
            </div>
            <div className='w-full'>
              <Typography
                variant='small'
                color='blue-gray'
                className='mb-2 font-medium'
              >
                Type
              </Typography>
              <Select
                label='Select Type'
                size='lg'
                // onChange={(e) => setEmpType(e)}
                // error={errorType ? 'true' : null}
              >
                <Option value='Part-Time'>Part-Time</Option>
                <Option value='Full-Time'>Full-Time</Option>
              </Select>
            </div>
          </div>
          <div className='mt-10' color='gray'>
            <Button
              onClick={() => {
                setProfile(false);
              }}
            >
              Button
            </Button>
            ;
          </div>
        </div>
      </section>
    </Card>
  );
}

export default Profile;
