import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Drawer,
  Avatar,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { customerList, userRoles } from './data';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { logout } from '../../app/authSlice';

export function DefaultSidebar({ sections }) {
  const list = sections;
  const [open, setOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [displayroleList, setDisplayroleList] = useState(false);
  // const [role, setRole] = useState('');
  const roles = userRoles;
  const [role, setRole] = useState(roles[0].name);
  //  const [userPrivileges, setUserPrivileges] = useState(['read', 'write']);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { admin, privileges } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className=' h-full'>
      <Card
        color='transparent'
        shadow={false}
        className=' h-full  w-[375px]  rounded-none   p-4  '
      >
        {/* <div className='mb-2 flex items-center justify-between gap-4 p-4'>
          <Typography fontSize={'24px'} color={'white'} align='center'>
            Admin Panel
          </Typography>
          <svg
            onClick={() => setOpen(!open)}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            className='w-8 h-8 text-cl-4'
          >
            <path
              fillRule='evenodd'
              d='M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z'
              clipRule='evenodd'
            />
          </svg>
        </div> */}
        <div>
          <div className='flex justify-center align-center flex-col my-10'>
            <div className='flex justify-center   '>
              <Avatar
                src='https://docs.material-tailwind.com/img/face-2.jpg'
                alt='avatar'
                className='w-24 h-24 my-10'
              />
            </div>

            <Typography fontSize={'24px'} color={'white'} align='center'>
              {admin.empName}
            </Typography>
            <div className='flex justify-center gap-2 relative'>
              <Typography
                fontFamily={'16px'}
                style={{ color: 'rgba(255, 255, 255, 0.40)' }}
                align='center'
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  gap: '5px',
                }}
              >
                {role}
              </Typography>
              <svg
                onClick={() => setDisplayroleList(!displayroleList)}
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-6 h-6 text-cl-4'
              >
                <path
                  fillRule='evenodd'
                  d='M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z'
                  clipRule='evenodd'
                />
              </svg>
              {displayroleList == true && (
                <div className='absolute top-10'>
                  <Card className=''>
                    <List className='bg-opacity-15 z-10'>
                      {roles.map((userrole, index) => (
                        <ListItem
                          key={userrole.id}
                          className='bg-opacity-15'
                          onClick={() => {
                            setRole(userrole.name);
                            setDisplayroleList(!displayroleList);
                            navigate(userrole.path);
                          }}
                        >
                          {userrole.name}
                        </ListItem>
                      ))}
                    </List>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='w-[full '>
          {list.map((item, index) => {
            return (
              <ListItem
                key={index}
                className={` w-[full] focus:text-white  text-white focus:bg-white focus:bg-opacity-15 mt-8 ${
                  index == selectedIndex && 'bg-white bg-opacity-15'
                }`}
                onClick={() => {
                  setSelectedIndex(index);
                  navigate(item.path);
                }}
              >
                <ListItemPrefix className='w-[full] flex-1 flex justify-start '>
                  <div className='mr-10'>{item.icon}</div>{' '}
                  <div className='text-xl'>{item.name}</div>
                </ListItemPrefix>
              </ListItem>
            );
          })}
        </div>

        <div className='flex justify-center mt-20 mb-20 rounded-lg'>
          <button
            className='bg-white text-primary  text-xl flex items-center px-4 py-2 gap-2  rounded-lg'
            onClick={handleLogout}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15'
              />
            </svg>

            <span className='text-primary'>Log out</span>
          </button>
        </div>
      </Card>
    </div>
  );
}
